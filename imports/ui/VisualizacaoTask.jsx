import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const VisualizacaoTask = ({ chipsVariants, checagemTransicao, novoArrayVariants, alterarSituacao, taskId, camposVisiveis, chavesVisiveis, alteracaoSucesso, setAlteracaoSucesso }) => {
    
    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");

    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });

    if (isLoading()){
        return <Typography variant="h3">
            Loading...
            </Typography>
    }

    if (!task) {
        return <Typography variant="h3">
            Task não encontrada
            </Typography>;
    }

    return (
            <>
            {alteracaoSucesso == "Erro em alterar Situação" && (
                <Alert severity="error" onClose={() => setAlteracaoSucesso("")} > Transição Inválida! Só é possível colocar uma situação como Concluída, se ela estiver Em Andamento antes!
                                                                                    E não é possível salvar uma situação igual à de antes!</Alert>
            )}
            {alteracaoSucesso == "sucessoEditandoTask" && (
                <Alert severity="success" onClose={() => setAlteracaoSucesso("")} > Os dados da Tarefa foram alterados com Sucesso!</Alert>
            )}
            <List>
            {Object.entries(camposVisiveis).map(([key, label]) => (
                <React.Fragment key={key}>
                <ListItem>
                    <ListItemText primary={label} />
                    {key == "situacao"? (
                        <>
                        <Chip label="Cadastrada" variant={chipsVariants[0]} onClick={() => alterarSituacao(task.situacao, "Cadastrada", 0)} />
                        <Chip label="Em Andamento" variant={chipsVariants[1]} onClick={() => alterarSituacao(task.situacao, "Em Andamento", 1)} />
                        <Chip label="Concluída" variant={chipsVariants[2]} onClick={() => alterarSituacao(task.situacao, "Concluída", 2)} />
                        </>
                    ) :( 
                    <>
                        <ListItemText primary={task[key] instanceof Date ? task[key].toLocaleDateString() : String(task[key])} />
                    </>
                    )}
                </ListItem>
                <Divider />
                </React.Fragment>
            ))}
            </List>
            </>
        )
}