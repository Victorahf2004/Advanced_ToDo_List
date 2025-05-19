import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState } from "react";
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

export const VisualizacaoInfoPerfil = ({camposVisiveis}) => {
    
    const user = useTracker(() => Meteor.user());

    if (!user){
        return <Typography variant="h3">
            Loading...
            </Typography>
    }

    return (
            <>
            <List>
            {Object.entries(camposVisiveis).map(([key, label]) => (
                <React.Fragment key={key}>
                <ListItem>
                    {key == "foto"? (
                        <>
                           <ListItemText primary={label} />
                           <VisualizandoFotoPerfil caminhoFoto={user.profile[key]} />
                        </>
                    )
                    :(
                        <>
                            <ListItemText primary={label} />
                            <TextField variant="filled" multiline maxRows={6} value={user.profile[key] instanceof Date ? user.profile[key].toLocaleDateString() : String(user.profile[key])} />
                        </>
                    )
                }
                </ListItem>
                <Divider />
                </React.Fragment>
            ))}
            </List>
            </>
        )
}