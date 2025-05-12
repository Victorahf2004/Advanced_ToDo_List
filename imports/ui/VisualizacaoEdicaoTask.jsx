import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from '/imports/api/TasksCollection';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import { EdicaoTask } from "./EdicaoTask";
import { VisualizacaoTask } from "./VisualizacaoTask";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";
import { Task } from "./Task";
import Typography from "@mui/material/Typography";

export const VisualizacaoEdicaoTask = ( { alteracaoSucesso, setAlteracaoSucesso }) => {
    const camposVisiveis = {
            nomeTask: "nome",
            descricao: "Descrição",
            situacao: "Situação",
            createdAt: "Data",
            userName: "Usuário Criador",
        };
    
    const chavesVisiveis = Object.keys(camposVisiveis);

    const [value, setValue] = useState(0);
    
    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const { taskId } = useParams();
    const task = useTracker(() => {
            return TasksCollection.findOne(taskId)
    });

    const handleChange = (e, newValue) => {
        setValue(newValue);
        setAlteracaoSucesso("");
    }

    const getSituacaoTasks = (situacaoTask) => {
        let arrayChips = ["outlined", "outlined", "outlined"]; // array padrão de chips
        
        if (situacaoTask == "Cadastrada") {
            arrayChips[0] = "filled";
        }
        else if (situacaoTask == "Em Andamento") {
            arrayChips[1] = "filled";
        }
        else {
            arrayChips[2] = "filled";
        }
        return arrayChips;
    }

    const chipsVariants = getSituacaoTasks(task.situacao);
    
    const checagemTransicao = (velhaSituacao, novaSituacao) => {
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

    const alterarSituacao = async (velhaSituacao, novaSituacao, indiceVariant) => {
        const novoObjetoSituacao = {situacao: novaSituacao};
        const novoArray = novoArrayVariants(chipsVariants, indiceVariant);
        try {
            checagemTransicao(velhaSituacao, novaSituacao);
            await Meteor.callAsync("tasks.update", taskId, novoObjetoSituacao);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            setAlteracaoSucesso("Erro em alterar Situação");
        }
    }
    return (
        <>
            <Box>
                <Typography variant="h4">
                    Informações tarefa: {task.nomeTask}
                </Typography>
            </Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
            </Tabs> 
            
            <Box hidden={value !== 0} >
                <VisualizacaoTask chipsVariants={chipsVariants} checagemTrasicao={checagemTransicao} novoArrayVariants={novoArrayVariants} alterarSituacao={alterarSituacao} taskId={taskId} camposVisiveis={camposVisiveis} chavesVisiveis={chavesVisiveis} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>
            </Box>

            <Box hidden={value !== 1} >
                <EdicaoTask chipsVariants={chipsVariants} checagemTrasicao={checagemTransicao} novoArrayVariants={novoArrayVariants} alterarSituacao={alterarSituacao} taskId={taskId} camposVisiveis={camposVisiveis} chavesVisiveis={chavesVisiveis} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>
            </Box>
        </>
    )
}