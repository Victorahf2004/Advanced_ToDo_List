import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { InformacoesTask } from "./InformacoesTask";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"


export const ListaTasks = ({tasks, erroLogout, logout, goToStart}) => {
    return (
        <>
        {erroLogout && (
                    <Alert severity="error" onClose={() => {setErrorLogout(false);}} > Erro no Logout</Alert>
                )}
                <h1>Tela de Tarefas</h1>
                <div>Usuário Logado</div>
                <TaskForm />
                <List>
                    {tasks.map((task) => (
                        <Task
                        key={task._id}
                        identificadorTask={task._id} 
                        nomeDaTarefa={task.nomeTask}
                        nomeDoUsuario={task.userName}/>
                    ))}
                </List>
                <Button variant="contained" onClick={logout}>Log Out</Button>
                <Button variant="contained" onClick={goToStart}>Voltar para a página inicial</Button>
        </>
    )
}