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

export const VisualizacaoTask = ({ chipsVariants, alteracaoSucesso, setAlteracaoSucesso }) => {
    const camposVisiveis = {
            nomeTask: "nome",
            descricao: "Descrição",
            situacao: "Situação",
            createdAt: "Data",
            userName: "Usuário Criador",
        };
    
    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const { taskId } = useParams();

    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });
    
    const chavesVisiveis = Object.keys(camposVisiveis);
    
    const checagemTransicao = (novaSituacao) => {
            const velhaSituacao = task.situacao;
            if (velhaSituacao == "Cadastrada" && novaSituacao == "Concluída"){
                throw new Error("Transição Inválida!");
            }
    
            else if (velhaSituacao == novaSituacao) {
                throw new Error("Situação igual à de antes!");
            }
        };
    
    const novoArrayVariants = (arrayAtual, posicaoAlterada) => {
        const tamanho = arrayAtual.length;
        const novoArray = [];
        for (let j = 0; j < tamanho; j++){
            if (j == posicaoAlterada) {
                novoArray.push("filled");
            }
            else {
                let elemento = arrayAtual[j];
                novoArray.push("outlined");
            }
        }
        return novoArray;
    }

    const alterarSituacao = async (novaSituacao, indiceVariant) => {
        const novoObjetoSituacao = {situacao: novaSituacao};
        const novoArray = novoArrayVariants(chipsVariants, indiceVariant);
        try {
            checagemTransicao(novaSituacao);
            await Meteor.callAsync("tasks.update", taskId, novoObjetoSituacao);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            setAlteracaoSucesso("Erro em alterar Situação");
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
                        <Chip label="Cadastrada" variant={chipsVariants[0]} onClick={() => alterarSituacao("Cadastrada", 0)} />
                        <Chip label="Em Andamento" variant={chipsVariants[1]} onClick={() => alterarSituacao("Em Andamento", 1)} />
                        <Chip label="Concluída" variant={chipsVariants[2]} onClick={() => alterarSituacao("Concluída", 2)} />
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