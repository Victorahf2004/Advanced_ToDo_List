import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LogoutIcon from '@mui/icons-material/Logout';
import Fab from "@mui/material/Fab";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const MenuDrawer = ({setandoSairFalseCallback, openPerfil, openTasks, openHome, logout, saindo, setSaindo, erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    let navigate = useNavigate();
    const [openDrawer, setOpenDrawer] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);

    useEffect(() => {
        if(saindo) {
            setErroLogout(false);
            setOpenDrawer(false);
            setandoSairFalseCallback();
        }
    }, [saindo]);

    if (!user) {
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    const atributosUsuario = [user.profile["nome"], user.profile["email"]];

    const toggleDrawer = (newState) => {
        setOpenDrawer(newState);
    }


    const listaDrawer = (
            <Box onClick={() => toggleDrawer(false)}>
            <List sx={{backgroundColor: "white"}}>
                <Stack direction="column" spacing={1}>
                    <ListItem>
                            <Avatar alt="Foto de perfil" src={user.profile["foto"]} />
                    </ListItem>
                    {atributosUsuario.map((atributo, i) => (
                        <React.Fragment key={i}>
                            {atributo? (
                                <ListItem>
                                        <ListItemText primary={atributo} sx={{color: "#0078D7"}} />
                                </ListItem>
                            ): (
                                <>
                                </>
                            )
                            }
                        </React.Fragment>
                    ))}
                </Stack>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={openHome}>
                        <ListItemIcon>
                            <HomeIcon sx={{color: "#00e4d0"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" sx={{color: "#0078D7"}} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={openPerfil}>
                        <ListItemIcon>
                            <PersonIcon sx={{color: "#00e4d0"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Perfil" sx={{color: "#0078D7"}} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={openTasks}>
                        <ListItemIcon>
                            <AssignmentIcon sx={{color: "#00e4d0"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Tasks" sx={{color: "#0078D7"}} />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={logout}>
                        <ListItemIcon>
                            <LogoutIcon sx={{color: "red"}}/>
                        </ListItemIcon>
                        <ListItemText primary="Log Out" sx={{color: "#0078D7"}} />
                    </ListItemButton>
                </ListItem>
            </List>
            </Box>
        )

    return (
        <>
        <Box justifyContent={"flex-start"}>
        <Tooltip title="Menu">
            <Fab sx={{backgroundColor: '#00e4d0'}} onClick={() => toggleDrawer(true)}>
                <MenuIcon fontSize="large" sx={{ color: " #6f6dfb" }}/>
            </Fab>
        </Tooltip>
        <Drawer sx={{'& .MuiDrawer-paper': {
                            background: "linear-gradient(135deg, #6f6dfb, #00e4d0)",
                        },
            }} open={openDrawer} onClose={() => toggleDrawer(false)}>
            {listaDrawer}
        </Drawer>
        </Box>
        </>
    )
}