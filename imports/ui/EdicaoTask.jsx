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

export const EdicaoTask = ({ alteracaoSucesso, setAlteracaoSucesso }) => {
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

    const valoresIniciais = {
        nomeTask: "",
        descricao: "",
        situacao: "",
        createdAt: "",
        userName: "",
    };
    const arrayInicialChips = ["outlined", "outlined", "outlined"];
    const situacaoTask = task.situacao;
    if (situacaoTask == "Cadastrada") {
        arrayInicialChips[0] = "filled";
    }
    else if (situacaoTask == "Em Andamento") {
        arrayInicialChips[1] = "filled";
    }
    else {
        arrayInicialChips[2] = "filled";
    }
    const [chipsVariants, setChipsVariants] = useState(arrayInicialChips);
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
            console.log("Estado atualizado:", atualizado);
            return atualizado;
        });
    };
    
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
            setChipsVariants(novoArray);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            setAlteracaoSucesso("Erro em alterar Situação");
        }
    }
    
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
            await Meteor.callAsync("tasks.update", taskId, atualizacaoParcial);
            setAlteracaoSucesso("sucessoEditandoTask");
        }
        catch(error) {
            console.log("erro");
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
            await Meteor.callAsync("tasks.update", taskId, atualizacoes);
            setAlteracaoSucesso("sucessoListaTasks");
            navigate("/Logado/ListaTasks");
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
                <ListItemText primary={label} 
                secondary={task[key] instanceof Date ? task[key].toLocaleDateString() : String(task[key])}
                />
                {key == "situacao"? (
                    <>
                    <Chip label="Cadastrada" variant={chipsVariants[0]} onClick={() => alterarSituacao("Cadastrada", 0)} />
                    <Chip label="Em Andamento" variant={chipsVariants[1]} onClick={() => alterarSituacao("Em Andamento", 1)} />
                    <Chip label="Concluída" variant={chipsVariants[2]} onClick={() => alterarSituacao("Concluída", 2)} />
                    </>
                ) :( 
                <>
                <TextField variant="filled" type={task[key] instanceof Date ? "date" : "text"} placeholder={task[key] instanceof Date ? "dd/mm/aaaa" : ("Novo(a) " + label)}
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