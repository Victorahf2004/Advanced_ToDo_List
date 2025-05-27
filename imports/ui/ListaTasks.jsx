import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { EdicaoTask } from "./EdicaoTask";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { filtroConcluidas } from "./TelaTasks";


export const ListaTasks = ({setandoSairFalseCallback, handleFiltroChange, saindo, setSaindo, tasks, erroLogout, setErroLogout, goToAddTask, alteracaoSucesso, setAlteracaoSucesso}) => {
    
    const [openLoading, setOpenLoading] = useState(false);
    
    useEffect(() => {
        if(saindo) {
            setErroLogout(false);
            setAlteracaoSucesso("");
            handleFiltroChange(true);
            setOpenLoading(false);
            setandoSairFalseCallback();
        }
    }, [saindo]);

    if (tasks.length == 0){
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        );
    }

    const handleDelete = async ( taskId, taskCreatorId ) => {
        try{
            await Meteor.callAsync("tasks.delete", taskId, taskCreatorId);
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão delete");
        }
    }

    return (
        <>
            {alteracaoSucesso == "Erro de permissão delete" && (
                    <Alert severity="error" onClose={() => {setAlteracaoSucesso("");}} > Só o criador da tarefa pode deletá-la </Alert>
                )}
            {alteracaoSucesso == "sucessoListaTasks" && (
                    <Alert severity="success" onClose={() => {setAlteracaoSucesso("");}} > Os dados da Tarefa foram alterados com Sucesso!</Alert>
                )}
            {erroLogout && (
                    <Alert severity="error" onClose={() => {setErroLogout(false);}} > Erro no Logout</Alert>
                )}
            <Stack direction={"column"} spacing={8} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h4" sx={{color: "white"}} gutterBottom>
                    Tarefas Cadastradas
                </Typography>
                <FormControlLabel label="Ver/Não ver Concluídas" control={<Checkbox checked={filtroConcluidas.get()} onChange={() => handleFiltroChange(false)} />} sx={{backgroundColor: "#00f285", color: "white"}} />
                <Stack direction={"column"} spacing={4} width={"80%"}>
                    <List sx={{backgroundColor: "white"}}>
                        {tasks.map((task) => (
                            <Task
                            key={task._id}
                            dataEntrega={task.dataEntrega}
                            setSaindo={setSaindo}
                            identificadorTask={task._id} 
                            nomeDaTarefa={task.nomeTask}
                            nomeDoUsuario={task.userName}
                            onDelete={handleDelete}
                            />
                        ))}
                    </List>
                    <Box display="flex" justifyContent="flex-end">
                        <Tooltip title="Adicionar Task">
                            <Fab color="primary" sx={{backgroundColor: "white", color:"#0078D7"}} size={"small"} onClick={goToAddTask}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Stack>
            </Stack>
        </>
    )
}