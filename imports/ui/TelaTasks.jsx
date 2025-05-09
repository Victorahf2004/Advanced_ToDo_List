import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { EdicaoTask } from "./EdicaoTask";
import { VisualizacaoEdicaoTask } from "./VisualizacaoEdicaoTask";
import { ListaTasks } from "./ListaTasks";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"

export const TelaTasks = ({erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    const [alteracaoSucesso, setAlteracaoSucesso] = useState("");
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
        <Routes>
            <Route path="/" element={<ListaTasks tasks={tasks} erroLogout={erroLogout} setErroLogout={setErroLogout} logout={logout} goToStart={goToStart} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
            <Route path=":taskId" element={<VisualizacaoEdicaoTask alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
        </Routes>
        </>
    )
}