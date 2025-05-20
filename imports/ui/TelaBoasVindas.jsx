import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import { MenuDrawer } from "./MenuDrawer";
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
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";

export const TelaBoasVindas = ({erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());

    if (!user) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    const listaDrawer = (
            <Box onClick={() => toggleDrawer(false)}>
            <List>
                <ListItem>
                    <ListItemButton onClick={openPerfil}>
                        <Avatar alt="Foto de perfil" src={user.profile["foto"]} />
                    </ListItemButton>
                </ListItem>
                {atributosUsuario.map((atributo, i) => (
                    <React.Fragment key={i}>
                        {atributo? (
                            <ListItem>
                                <ListItemButton onClick={openPerfil}>
                                    <ListItemText primary={atributo} />
                                </ListItemButton>
                            </ListItem>
                        ): (
                            <>
                            </>
                        )
                        }
                    </React.Fragment>
                ))}
                <Divider />
                <ListItem>
                    <ListItemButton onClick={openPerfil}>
                        <ListItemText primary="Abrir Perfil" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={openTasks}>
                        <ListItemText primary="Abrir Tasks" />
                    </ListItemButton>
                </ListItem>
                <Divider />
                <ListItem>
                    <ListItemButton onClick={logout}>
                        <ListItemText primary="Log Out" />
                    </ListItemButton>
                </ListItem>
            </List>
            </Box>
        )

    const ajustarDisplay = (parametro) => {
        let tamanho = parametro.length;
        if (tamanho >= 14) {
            return ((parametro.slice(0, 15)) + "... ");
        }
        else {
            return parametro;
        }
    }

    return (
        <>
        {erroLogout && (
                    <Alert severity="error" onClose={() => {setErroLogout(false);}} > Erro no Logout</Alert>
                )}
        <Tooltip title="Menu">
            <IconButton onClick={() => toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
        </Tooltip>
        <Typography variant="h3" gutterBottom>
            Seja Bem-Vindo, {ajustarDisplay(user.username)}!!!
        </Typography>
        </>
    )
}