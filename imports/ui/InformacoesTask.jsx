import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState } from "react";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";

export const InformacoesTask = () => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const { taskId } = useParams();
    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });
    const camposVisiveis = {
        nomeTask: "nome",
        descricao: "Descrição",
        situacao: "Situação",
        createdAt: "Data",
        userName: "Usuário Criador",
    }

    if (isLoading()){
        return <div>Loading...</div>
    }

    if (!task) {
        return <div>Task não encontrada</div>;
    }

    return (
        <>
        <List>
        {Object.entries(camposVisiveis).map(([key, label]) => (
            <>
            <ListItem key={key}>
                <ListItemText primary={label} 
                secondary={task[key] instanceof Date ? task[key].toLocaleString() : String(task[key])}
                />
            </ListItem>
            <Divider />
            </>
        ))}
        </List>
        </>
    )
}