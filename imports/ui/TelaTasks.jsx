import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"

export const TelaTasks = ({erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    let navigate = useNavigate();
    const tasks = useTracker(() => {
        if (!user) {
            return [];
        }
        else {
            return TasksCollection.find({}, { sort: {createdAt: -1} }).fetch();
        }
      });
    
    if (isLoading()){
        return <div>Loading...</div>
    }
    const logoutAsync = () => {
        new Promise((resolve, reject) => {
            Meteor.logout((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };
    
    
    const logout = async () => {
        try{
            await logoutAsync();
            navigate("/");
        }
        catch (error) {
            setErroLogout(true);
        }
      }

    const goToStart = () => {
        navigate("/Logado/Start");
    } 

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
                nomeDaTarefa={task.nomeTask}
                nomeDoUsuario={task.userName}/>
            ))}
        </List>
        <Button variant="contained" onClick={logout}>Log Out</Button>
        <Button variant="contained" onClick={goToStart}>Voltar para a página inicial</Button>
        </>
    )
}