import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { VisualizandoFotoPerfil } from "./VisualizandoFotoPerfil";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const VisualizacaoInfoPerfil = ({setandoSairFalseCallback, saindo, setSaindo, camposVisiveis}) => {
    
    const user = useTracker(() => Meteor.user());
    const [openLoading, setOpenLoading] = useState(false);

    useEffect(() => {
        if (saindo) {
            setOpenLoading(false);
            setandoSairFalseCallback();
        }
    }, [saindo])

    if (!user){
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
            <>
            <Stack direction={"column"} width={"80%"}>
                <List sx={{backgroundColor: "white"}}>
                {Object.entries(camposVisiveis).map(([key, label]) => (
                    <React.Fragment key={key}>
                    <ListItem>
                        <ListItemText primary={label} sx={{color: "#0078D7"}}/>
                        {key == "foto"? (
                            <>
                                <VisualizandoFotoPerfil caminhoFoto={user.profile[key]} />
                            </>
                        )
                        :(
                            <>
                                <TextField variant="filled" multiline maxRows={6} value={user.profile[key] instanceof Date ? user.profile[key].toLocaleDateString() : String(user.profile[key])} placeholder={"Esse dado ainda não foi fornecido"} />
                            </>
                        )
                    }
                    </ListItem>
                    <Divider />
                    </React.Fragment>
                ))}
                </List>
            </Stack>
            </>
        )
}