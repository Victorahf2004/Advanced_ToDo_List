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
import Tooltip from "@mui/material/Tooltip"

export const Task = ({ identificadorTask, nomeDaTarefa, nomeDoUsuario, onDelete}) => {
    let navigate = useNavigate();
    
    const telaEditarTask = () => {
        let link = "/Logado/ListaTasks/" + identificadorTask;
        navigate(`${link}`);
    }

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
        <ListItem>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary={ajustarDisplay(nomeDaTarefa)}
            secondary={ajustarDisplay(nomeDoUsuario)}/>
            <Tooltip title="Delete Task">
                <ListItemButton onClick={() => onDelete(identificadorTask)}>
                    <ListItemIcon>
                        <DeleteIcon />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
            <Tooltip title="Editar Task">
                <ListItemButton onClick={telaEditarTask}>
                    <ListItemIcon>
                        <EditIcon />
                    </ListItemIcon>
                </ListItemButton>
            </Tooltip>
        </ListItem>
        <Divider />
        </>
    );
};