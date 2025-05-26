import React, { useState, useEffect } from "react";
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
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const VisualizacaoEdicaoTask = ( { saindo, setSaindo, alteracaoSucesso, setAlteracaoSucesso }) => {
    const camposVisiveis = {
            nomeTask: "nome",
            descricao: "Descrição",
            situacao: "Situação",
            tipo: "Tipo",
            dataEntrega: "Data de Entrega",
            createdAt: "Data de Criação",
            userName: "Usuário Criador",
        };
    
    const chavesVisiveis = Object.keys(camposVisiveis);
    
    const camposAlteraveis = {
        nomeTask: "nome",
        descricao: "Descrição",
        situacao: "Situação",
        tipo: "Tipo",
        dataEntrega: "Data de Entrega",
    };

    const chavesAlteraveis = Object.keys(camposAlteraveis);

    const [value, setValue] = useState(0);
    const [podeEditar, setPodeEditar] = useState(true);

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const { taskId } = useParams();
    const task = useTracker(() => {
            return TasksCollection.findOne(taskId)
    });

    const taskUserId = task.userId;
    const userIdAtual = user._id;

    const voltarParaListaTasks = () => {
        navigate("/Logado/ListaTasks");
        setValue(0);
        setPodeEditar(true);
    }
    
    useEffect(() => {
        if(saindo) {
            setValue(0);
            setPodeEditar(true);
            setSaindo(false);
        }
    }, [saindo])
    
    if (!task) {
        return (
            <>
                <Alert severity="error" onClose={voltarParaListaTasks}>Task não encontrada!</Alert>
                <Button variant="contained" onClick={voltarParaListaTasks}>Voltar para a Lista de Tasks</Button>
            </>
            )
        }

    const handleChange = (e, newValue) => {
        if (taskUserId !== userIdAtual){
            setAlteracaoSucesso("");
            setPodeEditar(false);
        }
        else {
            setValue(newValue);
            setAlteracaoSucesso("");
        }
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

    const getTipoTask = (tipoTask) => {
        let arrayChipsTipo = ["outlined", "outlined"];

        if (tipoTask == "Pública") {
            arrayChipsTipo[0] = "filled";
        }

        else if (tipoTask == "Pessoal") {
            arrayChipsTipo[1] = "filled";
        }
        return arrayChipsTipo;
    }

    const chipsVariants = getSituacaoTasks(task.situacao);

    const checagemTransicao = (taskCreatorId, userId, velhaSituacao, novaSituacao) => {
        if (taskCreatorId != userId) {
            throw new Error("not-authorized");
        }
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

    const alterarSituacao = async (taskCreatorId, userId, velhaSituacao, novaSituacao, indiceVariant) => {
        const novoObjetoSituacao = {situacao: novaSituacao};
        const novoArray = novoArrayVariants(chipsVariants, indiceVariant);
        console.log(velhaSituacao, novaSituacao);
        try {
            checagemTransicao(taskCreatorId, userId, velhaSituacao, novaSituacao);
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, novoObjetoSituacao);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            console.log("Erro capturado:", error);
            if (error.message == "not-authorized") {
                console.log("Erro de permissão");
                setAlteracaoSucesso("Erro de permissão edit");
            }
            else if ((error.message == "Transição Inválida!") || (error.message == "Situação igual à de antes!")){
                console.log("Erro próprio da função");
                setAlteracaoSucesso("Erro em alterar Situação");
            }
            else {
                console.log("Erro");
            }
        }
    }

    const chipsVariantsTipoTask = getTipoTask(task.tipo);
    
    const checagemPermissao = (taskCreatorId, userId, velhoTipo, novoTipo) => {
        if (taskCreatorId != userId) {
            throw new Error("not-authorized");
        }
        
        else if (velhoTipo == novoTipo) {
            throw new Error("Situação igual à de antes!");
        }
    };

    const alterarTipo = async (taskCreatorId, userId, velhoTipo, novoTipo) => {
        const novoObjetoTipo = {tipo: novoTipo};
        try {
            checagemPermissao(taskCreatorId, userId, velhoTipo, novoTipo);
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, novoObjetoTipo);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            console.log("Erro capturado:", error);
            if (error.message == "not-authorized") {
                console.log("Erro de permissão");
                setAlteracaoSucesso("Erro de permissão edit");
            }
            else if ((error.message == "Transição Inválida!") || (error.message == "Situação igual à de antes!")){
                console.log("Erro próprio da função");
                setAlteracaoSucesso("Erro em alterar Situação");
            }
            else {
                console.log("Erro");
            }
        }
    }

    const customTextColor = '#4A148C'; 
    const customIndicatorColor = "#00f285";

    return (
        <>
            {!podeEditar && (
                <Alert severity="error" onClose={() => setPodeEditar(true)}>Você não pode editar essa task, por que não é o criador dela!</Alert>
            )}
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                <Box>
                    <Typography variant="h4" color="white">
                        Informações tarefa: {task.nomeTask}
                    </Typography>
                </Box>
                <Tabs value={value} onChange={handleChange} sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: customIndicatorColor,
          },
          '& .MuiTab-root': {
            color: customTextColor, 
            '&.Mui-selected': {
              color: customIndicatorColor, 
            },
            '&:hover': {
              color: customIndicatorColor,
              opacity: 0.8,
            },
          },
        }}>
                    <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                    <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
                </Tabs> 
                
                {value == 0? (
                    <VisualizacaoTask taskId={taskId} camposVisiveis={camposVisiveis} />
                ): (
                    <EdicaoTask saindo={saindo} setSaindo={setSaindo} chipsVariantsTipoTask={chipsVariantsTipoTask} alterarTipo={alterarTipo} chipsVariants={chipsVariants} checagemTrasicao={checagemTransicao} novoArrayVariants={novoArrayVariants} alterarSituacao={alterarSituacao} taskId={taskId} camposAlteraveis={camposAlteraveis} chavesAlteraveis={chavesAlteraveis} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>
                )}
            </Stack>
        </>
    )
}