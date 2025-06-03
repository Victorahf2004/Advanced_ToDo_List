import React, { useState, useEffect } from "react";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data';
import Button from "@mui/material/Button";
import { TasksCollection } from "/imports/api/TasksCollection";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Grid from "@mui/material/Grid";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const DashBoard = ({setandoSairFalseCallback, saindo, setSaindo, openTasks}) => {
    
    const isLoading = useSubscribe("tasksSemRestricao");
    const [openLoading, setOpenLoading] = useState(false);

    const tasksCadastradas = useTracker(() => {
        return TasksCollection.find({ situacao: "Cadastrada"}).count();
    })

    const tasksEmAndamento = useTracker(() => {
        return TasksCollection.find({ situacao: "Em Andamento"}).count();
    })

    const tasksConcluidas = useTracker(() => {
        return TasksCollection.find({ situacao: "Concluída"}).count();
    })

    useEffect(() => {
        if (saindo) {
            setOpenLoading(false);
            setandoSairFalseCallback();
        }
    }, [saindo])

    if (isLoading()){
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
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