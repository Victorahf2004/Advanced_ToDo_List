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

    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const { taskId } = useParams();
    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });
    
    const chavesVisiveis = Object.keys(camposVisiveis);

    const [inputs, setInputs] = useState({
        nomeTask: "",
        descricao: "",
        situacao: "",
        createdAt: "",
        userName: "",
    });

    const handleChange = (e, chave) => {
        const novoValor = e.target.value;
        setInputs((prev) => {
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
            const atualizacoes = {};
            for (let i = 0; i < chavesVisiveis.length; i++) {
                const chave = chavesVisiveis[i];
                const elemento = task[chave];
                if (inputs[chave] == '') { 
                    if (elemento instanceof Date) {
                        atualizacoes[chave] = elemento.toLocaleDateString();
                    }
                    else {
                        atualizacoes[chave] = elemento;
                    }
                }
                else {
                    atualizacoes[chave] = (inputs[chave]).trim();
                }
            }
            await Meteor.callAsync("tasks.update", taskId, atualizacoes);
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
        <form onSubmit={submit}>
        <List>
        {Object.entries(camposVisiveis).map(([key, label]) => (
            <React.Fragment key={key}>
            <ListItem>
                <ListItemText primary={label} 
                secondary={task[key] instanceof Date ? task[key].toLocaleDateString() : String(task[key])}
                />
                <TextField variant="filled" type={task[key] instanceof Date ? "date" : "text"} placeholder={task[key] instanceof Date ? "dd/mm/aaaa" : ("Novo(a) " + label)}
                onChange={(e) => handleChange(e, key)}/>
                <ListItemButton variant="contained" onClick={submit}>Salvar essa alteração</ListItemButton>
            </ListItem>
            <Divider />
            </React.Fragment>
        ))}
        </List>
        <Button type="submit" variant="contained">Salvar Todas as Alterações</Button>
        </form>
        </>
    )
}