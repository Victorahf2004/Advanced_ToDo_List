import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task";
import { EdicaoTask } from "./EdicaoTask";
import { VisualizacaoEdicaoTask } from "./VisualizacaoEdicaoTask";
import { ListaTasks } from "./ListaTasks";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export const TelaTasks = ({saindo, setSaindo, erroLogout, setErroLogout, logout}) => {
    const user = useTracker(() => Meteor.user());
    const [alteracaoSucesso, setAlteracaoSucesso] = useState("");
    const isLoading = useSubscribe("tasks");
    let navigate = useNavigate();
    useEffect(() => {
        if (saindo) {
            setErroLogout(false);
            setAlteracaoSucesso("");
            setSaindo(false);
        }
    }, [saindo])

    const tasks = useTracker(() => {
        if (!user) {
            return [];
        }
        else {
            return TasksCollection.find({}, { sort: {createdAt: -1} }).fetch();
        }
      });
    
    if (isLoading()){
        return <Typography variant="h4">
            Loading...
            </Typography>
    }

    const goToAddTask = () => {
        navigate("/Logado/ListaTasks/AddTask");
        setSaindo(true);
    }

    return (
        <>
        <Routes>
            <Route path="/" element={<ListaTasks saindo={saindo} setSaindo={setSaindo} tasks={tasks} erroLogout={erroLogout} setErroLogout={setErroLogout} logout={logout} goToAddTask={goToAddTask} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
            <Route path="/AddTask" element={<TaskForm saindo={saindo} setSaindo={setSaindo} />} />
            <Route path=":taskId" element={<VisualizacaoEdicaoTask saindo={saindo} setSaindo={setSaindo} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
        </Routes>
        </>
    )
}