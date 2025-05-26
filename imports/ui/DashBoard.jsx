import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import { MenuDrawer } from "./MenuDrawer";
import { TasksCollection } from "/imports/api/TasksCollection";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";

export const DashBoard = ({openTasks}) => {
    
    const isLoading = useSubscribe("tasks");

    const tasksCadastradas = useTracker(() => {
        return TasksCollection.find({ situacao: "Cadastrada"}).count();
    })

    const tasksEmAndamento = useTracker(() => {
        return TasksCollection.find({ situacao: "Em Andamento"}).count();
    })

    const tasksConcluidas = useTracker(() => {
        return TasksCollection.find({ situacao: "Concluída"}).count();
    })

    if (isLoading()){
        return <Typography variant="h4">
            Loading...
            </Typography>
    }

    const nomes_numeros = {
        "Total de Tarefas Cadastradas": tasksCadastradas,
        "Total de Tarefas Em Andamento": tasksEmAndamento,
        "Total de Tarefas Concluídas": tasksConcluidas,
    };

    const cores = ["red", "yellow", "#00f285"];
    const cards = (
        <>
        <Grid container spacing={2} columns={12} sx={{maxWidth: "90vw"}}>
        {Object.entries(nomes_numeros).map(([nome, numero], i) => (
            <Grid item key={nome} size={6}>
                <Card variant="outlined" sx={{ backgroundColor: "white", height: "100%" }}>
                    <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent:"center", alignItems:"center"}}>
                        <Typography variant="h4" sx={{color: "#0078D7"}} gutterBottom>
                            {nome}
                        </Typography>
                        <Typography sx={{ color: cores[i]}} variant="h3">
                            {numero}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        ))}
            <Grid item size={6}>
                <Card variant="outlined" sx={{ backgroundColor: "white", height: "100%", display: "flex", justifyContent:"center"}}>
                    <CardActions>
                        <Button onClick={openTasks}>
                            <Typography variant="h6" sx={{color: "#0078D7"}}>
                                Ver Lista de Tarefas
                            </Typography>
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
        </>
    )
    
    return (
        <>
        {cards}
        </>
    )
}