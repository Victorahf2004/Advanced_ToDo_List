import React from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";

export const Task = ({ identificadorTask, nomeDaTarefa, nomeDoUsuario}) => {
    let navigate = useNavigate();
    
    const telaEditarTask = () => {
        let link = "/Logado/ListaTasks/" + identificadorTask;
        navigate(`${link}`);
    }
    return (
        <>
        <ListItem>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={nomeDaTarefa}
            secondary={nomeDoUsuario}/>
            <ListItemButton>
                <ListItemIcon>
                    <DeleteIcon />
                </ListItemIcon>
            </ListItemButton>
            <ListItemButton onClick={telaEditarTask}>
                <ListItemIcon>
                    <EditIcon />
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
        <Divider />
        </>
    );
};