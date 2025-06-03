import React from "react";
import { useNavigate} from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "/imports/api/TasksCollection";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton"
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AssignmentIcon from '@mui/icons-material/Assignment';
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";

export const Task = ({ identificadorTask, setSaindo, nomeDaTarefa, nomeDoUsuario, onDelete, dataEntrega}) => {
    let navigate = useNavigate();
    
    const task = useTracker(() => {
        return TasksCollection.findOne(identificadorTask);
    })

    const taskCreatorId = task.userId;

    const situacao = task.situacao

    const funcCor = () => {
        if (situacao == "Cadastrada") {
            return "red";
        }
        else if (situacao == "Em Andamento") {
            return "yellow";
        }
        else if (situacao == "Concluída") {
            return "#00f285";
        }
    }

    const cor = funcCor();
    const telaEditarTask = () => {
        let link = "/Logado/ListaTasks/" + identificadorTask;
        navigate(`${link}`);
        setSaindo(true);
    }

    const vendoSeDataEhHoje = (data) => {
        const hoje = new Date();
        const dataHoje = hoje.toLocaleDateString();
        const [anoHoje, mesHoje, diaHoje] = dataHoje.split("-");
        let [anoData, mesData, diaData] = data.split("-");
        
        condicao = (anoData == anoHoje && mesData == mesHoje && diaData == diaHoje);
        if (condicao) {
            return true;
        }

        else {
            return false;
        }
    }

    const ajustarDisplay = () => {
        let dataFormatada = dataEntrega.toLocaleString('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                    });
        
        let [dataString, horaString] = dataFormatada.split(", ");

        if (vendoSeDataEhHoje(dataString)) {
            return (("Hoje - ") + horaString + " - " + nomeDaTarefa);
        }

        else {
            if (dataString == ""){
                return (nomeDaTarefa);
            }
            return ((dataString) + " - " + horaString + " - " + nomeDaTarefa)
        }
    }
    return (
        <>
        <ListItem>
            <ListItemIcon>
                <AssignmentIcon sx={{color: "#0078D7"}}/>
            </ListItemIcon>
            <ListItemText sx={{overflow:"hidden", color: "#0078D7"}} primary={ajustarDisplay()}
            secondary={nomeDoUsuario}/>

            <Box display="flex" flexDirection="row" gap="3vw" justifyContent={"flex-end"}>
                <Chip label={situacao} variant="filled" sx={{backgroundColor: cor, color: "white"}} />
                <Tooltip title="Editar Task">
                    <ListItemButton onClick={telaEditarTask}>
                        <ListItemIcon>
                            <EditIcon />
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>

                <Tooltip title="Delete Task">
                    <ListItemButton onClick={() => onDelete(identificadorTask, taskCreatorId)}>
                        <ListItemIcon>
                            <DeleteIcon sx={{color: "red"}}/>
                        </ListItemIcon>
                    </ListItemButton>
                </Tooltip>
            </Box>
        </ListItem>
        <Divider />
        </>
    );
};