import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { InformacoesTask } from "./InformacoesTask";
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
            <Route index element={<ListaTasks tasks={tasks} erroLogout={erroLogout} logout={logout} goToStart={goToStart} />} />
            <Route path=":taskId" element={<InformacoesTask />} />
        </Routes>
        </>
    )
}