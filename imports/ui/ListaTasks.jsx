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


export const ListaTasks = ({tasks, erroLogout, setErroLogout, logout, goToStart, alteracaoSucesso, setAlteracaoSucesso}) => {
    
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
            <TaskForm />
            <List>
                {tasks.map((task) => (
                    <Task
                    key={task._id}
                    identificadorTask={task._id} 
                    nomeDaTarefa={task.nomeTask}
                    nomeDoUsuario={task.userName}
                    onDelete={handleDelete}
                    erroLogout={erroLogout}
                    setErroLogout={setErroLogout}
                    alteracaoSucesso={alteracaoSucesso}
                    setAlteracaoSucesso={setAlteracaoSucesso}/>
                ))}
            </List>
            <Button variant="contained" onClick={logout}>Log Out</Button>
            <Button variant="contained" onClick={goToStart}>Voltar para a página inicial</Button>
        </>
    )
}