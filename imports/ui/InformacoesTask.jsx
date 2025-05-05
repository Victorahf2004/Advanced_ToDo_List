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
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

export const InformacoesTask = () => {
    const camposVisiveis = {
        nomeTask: "nome",
        descricao: "Descrição",
        situacao: "Situação",
        createdAt: "Data",
        userName: "Usuário Criador",
    };

    const estadosAtributosTask = {
        nomeTask: "",
        descricao: "",
        situacao: "",
        createdAt: "",
        userName: "",
    };

    const [dados, setDados] = useState(estadosAtributosTask);

    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const { taskId } = useParams();
    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });

    const handleChange = (e, chave) => {
        const novoValor = e.target.value;
        setDados((prev) => {
            const atualizado = {
                ...prev,
                [chave]: novoValor,
            };
            console.log("Estado atualizado:", atualizado);
            return atualizado;
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            await Meteor.callAsync("tasks.update", taskId, dados);
        }
        catch(error) {
            console.log("erro");
        }
    }
    if (isLoading()){
        return <div>Loading...</div>
    }

    if (!task) {
        return <div>Task não encontrada</div>;
    }

    return (
        <>
        <form>
        <List>
        {Object.entries(camposVisiveis).map(([key, label]) => (
            <React.Fragment key={key}>
            <ListItem>
                <ListItemText primary={label} 
                secondary={task[key] instanceof Date ? task[key].toLocaleDateString() : String(task[key])}
                />
                <TextField variant="filled" type="text" placeholder={"Novo " + label} value={dados[key]}
                    onChange={(e) => handleChange(e, key)}/>
            </ListItem>
            <Divider />
            </React.Fragment>
        ))}
        </List>
        <Button variant="contained" onClick={submit}>Submit</Button>
        </form>
        </>
    )
}