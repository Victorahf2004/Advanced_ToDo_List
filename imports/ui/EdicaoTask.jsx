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
import Typography from "@mui/material/Typography";

export const EdicaoTask = ({ chipsVariants, checagemTransicao, novoArrayVariants, alterarSituacao, taskId, camposVisiveis, chavesVisiveis, alteracaoSucesso, setAlteracaoSucesso }) => {

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");

    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });
    const taskCreatorId = task.userId;
    const userId = user._id;
    const valoresIniciais = {
        nomeTask: "",
        descricao: "",
        situacao: "",
        createdAt: "",
        userName: "",
    };
    const [inputs, setInputs] = useState(valoresIniciais);
    
    const reset = (tipo, chave) => {
        if (tipo == "Parcial") {
            setInputs((prev) => ({
                ...prev,
                [chave]: "",
            }));
        }
        else {
            const valoresResetados = {};
            for (let j = 0; j < chavesVisiveis.length; j++) {
                chave = chavesVisiveis[j];
                valoresResetados[chave] = "";
            }
            setInputs(valoresResetados);
        }
        setAlteracaoSucesso("");
    }

    const voltarParaListaTasks = () => {
        reset("Completo", false);
        navigate("/Logado/ListaTasks");
    }

    const handleChange = (e, chave) => {
        const novoValor = e.target.value;
        setInputs((prev) => {
            const atualizado = {
                ...prev,
                [chave]: novoValor,
            };
            return atualizado;
        });
    };
    
    const submitParcial = async (e, chave) => {
        e.preventDefault();
        let novoValor = inputs[chave];

        if (chave == "createdAt"){
            const [ano, mes, dia] = novoValor.split("-");
            const data = new Date(ano, mes-1, dia);
            novoValor = data;
        }

        const atualizacaoParcial = { [chave]: novoValor}
        reset("Parcial", chave);

        try {
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, atualizacaoParcial);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão edit");
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const atualizacoes = {};
        
        for (let i = 0; i < chavesVisiveis.length; i++) {
            const chave = chavesVisiveis[i];
            const elemento = task[chave];
            
            if (inputs[chave] == '') { 
                atualizacoes[chave] = elemento;
            }
            
            else {
                if (chave == "createdAt"){
                    const [ano, mes, dia] = (inputs[chave]).split("-");
                    const data = new Date(ano, mes-1, dia);
                    atualizacoes[chave] = data;
                }
                else {
                    atualizacoes[chave] = (inputs[chave]).trim();
                }
            }
        }

        reset("Total", false);

        try {
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, atualizacoes);
            setAlteracaoSucesso("sucessoListaTasks");
            navigate("/Logado/ListaTasks");
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão edit");
        }
    }

    if (isLoading()){
        return <Typography variant="h4">
            Loading...
            </Typography>
    }

    if (!task) {
        return <Typography variant="h4">
            Task não encontrada
            </Typography>;
    }
    console.log(alteracaoSucesso);
    return (
        <>
        {alteracaoSucesso == "Erro de permissão edit" && (
            <Alert severity="error" onClose={() => setAlteracaoSucesso("")} > Só o criador da tarefa pode editá-la!</Alert>
        )}
        {alteracaoSucesso == "Erro em alterar Situação" && (
            <Alert severity="error" onClose={() => setAlteracaoSucesso("")} > Transição Inválida! Só é possível colocar uma situação como Concluída, se ela estiver Em Andamento antes! 
            E não é possível salvar uma situação igual à de antes!</Alert>
        )}
        {alteracaoSucesso == "sucessoEditandoTask" && (
            <Alert severity="success" onClose={() => setAlteracaoSucesso("")} > Os dados da Tarefa foram alterados com Sucesso!</Alert>
        )}
        <form onSubmit={submit}>
        <List>
        {Object.entries(camposVisiveis).map(([key, label]) => (
            <React.Fragment key={key}>
            <ListItem>
                <ListItemText primary={label} />
                {key == "situacao"? (
                    <>
                    <Chip label="Cadastrada" variant={chipsVariants[0]} onClick={() => alterarSituacao(taskCreatorId, userId, task.situacao, "Cadastrada", 0)} />
                    <Chip label="Em Andamento" variant={chipsVariants[1]} onClick={() => alterarSituacao(taskCreatorId, userId, task.situacao, "Em Andamento", 1)} />
                    <Chip label="Concluída" variant={chipsVariants[2]} onClick={() => alterarSituacao(taskCreatorId, userId, task.situacao, "Concluída", 2)} />
                    </>
                ) : key == "createdAt"? (
                    <>
                    <TextField variant="filled" type={task[key] instanceof Date ? "date" : "text"} placeholder={task[key] instanceof Date ? "dd/mm/aaaa" : ("Novo(a) " + label)}
                    value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                    <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                    </> )
                : (
                <>
                <TextField variant="filled" multiline maxRows={6} type={task[key] instanceof Date ? "date" : "text"} placeholder={task[key] instanceof Date ? "dd/mm/aaaa" : ("Novo(a) " + label)}
                 value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                </>
                )}
            </ListItem>
            <Divider />
            </React.Fragment>
        ))}
        </List>
        <Button variant="contained" onClick={voltarParaListaTasks}> Voltar para a Lista de Tasks</Button>
        <Button type="submit" variant="contained">Salvar Todas as Alterações</Button>
        </form>
        </>
    )
}