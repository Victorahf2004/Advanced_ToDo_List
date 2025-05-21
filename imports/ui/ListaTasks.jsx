import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { EdicaoTask } from "./EdicaoTask";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { CallToActionSharp } from "@mui/icons-material";


export const ListaTasks = ({saindo, setSaindo, tasks, erroLogout, setErroLogout, goToAddTask, alteracaoSucesso, setAlteracaoSucesso}) => {
    
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
            <Typography variant="h4" gutterBottom>
                Tarefas Cadastradas
            </Typography>
            <List>
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
            <Button variant="contained" onClick={goToAddTask}>Adicionar Task</Button>
        </>
    )
}