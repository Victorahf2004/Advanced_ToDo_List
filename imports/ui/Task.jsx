import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";

export const Task = ({ nomeDaTarefa, nomeDoUsuario}) => {
    return (
        <>
        <ListItem>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={nomeDaTarefa}
            secondary={nomeDoUsuario}/>
        </ListItem>
        <Divider />
        </>
    );
};