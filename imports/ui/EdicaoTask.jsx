import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState, useEffect } from "react";
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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const EdicaoTask = ({ setandoSairFalseCallback, saindo, setSaindo, chipsVariantsTipoTask, alterarTipo, chipsVariants, checagemTransicao, novoArrayVariants, alterarSituacao, taskId, camposAlteraveis, chavesAlteraveis, alteracaoSucesso, setAlteracaoSucesso }) => {

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasksSemRestricao");

    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });
    const taskCreatorId = task.userId;
    const userId = user._id;
    const valoresIniciais = {
        nomeTask: "",
        descricao: "",
        situacao: "",
        tipo: "",
        dataEntrega: "",
    };
    
    const [inputs, setInputs] = useState(valoresIniciais);
    const [chipsVariantsSemSalvar, setChipsVariantsSemSalvar] = useState(chipsVariants);
    const [chipsVariantsTipoTaskSemSalvar, setChipsVariantsTipoTaskSemSalvar] = useState(chipsVariantsTipoTask)
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [openLoading, setOpenLoading] = useState(false);

    const reset = (tipo, chave) => {
        if (tipo == "Parcial") {
            setInputs((prev) => ({
                ...prev,
                [chave]: "",
            }));
        }
        else {
            const valoresResetados = {};
            for (let j = 0; j < chavesAlteraveis.length; j++) {
                chave = chavesAlteraveis[j];
                valoresResetados[chave] = "";
            }
            setInputs(valoresResetados);
        }
        setAlteracaoSucesso("");
    }

    useEffect(() => {
        if (saindo) {
            reset("Completo", false)
            setAlteracaoSucesso("");
            setIsSubmitting(false);
            setOpenLoading(false);
            setandoSairFalseCallback();
        }
    }, [saindo])

    if ((!task) || (isLoading()) || (isSubmitting)){
        return ( 
        <Backdrop open={openLoading}>
            <CircularProgress color="inherit" />
        </Backdrop>);
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
    
    const setandoSituacaoTask = (situacaoTask) => {
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
        setInputs((prev) => {
            const atualizado = {
                ...prev,
                ["situacao"]: situacaoTask,
            };
            return atualizado;
        });
        setChipsVariantsSemSalvar(arrayChips);
    }

    const setandoTipoTask = (tipoTask) => {
        let arrayChips = ["outlined", "outlined"];

        if (tipoTask == "Pública") {
            arrayChips[0] = "filled";
        }
        else if (tipoTask == "Pessoal") {
            arrayChips[1] = "filled";
        }
        setInputs((prev) => {
            const atualizado = {
                ...prev,
                ["tipo"]: tipoTask,
            };
            return atualizado;
        });
        setChipsVariantsTipoTaskSemSalvar(arrayChips);
    }

    const submitParcial = async (e, chave, situacaoOuTipo) => {
        e.preventDefault();
        let novoValor = inputs[chave];

        if (chave == "situacao") {
            setIsSubmitting(true);
            await alterarSituacao(taskCreatorId, userId, task.situacao, situacaoOuTipo, 0);
            setIsSubmitting(false);
            return;
        }

        if (chave == "tipo") {
            setIsSubmitting(true);
            await alterarTipo(taskCreatorId, userId, task.tipo, situacaoOuTipo);
            setIsSubmitting(false);
            return;
        }

        if (chave == "dataEntrega"){
            const data = new Date(novoValor);
            novoValor = data;
        }

        const atualizacaoParcial = { [chave]: novoValor}
        reset("Parcial", chave);

        try {
            setIsSubmitting(true);
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, atualizacaoParcial);
            setAlteracaoSucesso("sucessoEditandoTask");
            setIsSubmitting(false);
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão edit");
            setIsSubmitting(false);
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const atualizacoes = {};
        
        for (let i = 0; i < chavesAlteraveis.length; i++) {
            const chave = chavesAlteraveis[i];
            const elemento = task[chave];
            
            if (inputs[chave] == '') { 
                atualizacoes[chave] = elemento;
            }
            
            else {
                if (chave == "dataEntrega"){
                    const data = new Date(inputs[chave]);
                    atualizacoes[chave] = data;
                }
                else {
                    atualizacoes[chave] = (inputs[chave]).trim();
                }
            }
        }

        reset("Completo", false);

        try {
            await Meteor.callAsync("tasks.update", taskCreatorId, taskId, atualizacoes);
            setAlteracaoSucesso("sucessoListaTasks");
            navigate("/Logado/ListaTasks");
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão edit");
        }
    }


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
        <form onSubmit={submit} style={{width: "80%"}}>
            <Stack direction={"column"} spacing={8}>
                <List sx={{backgroundColor: "white"}}>
                    {Object.entries(camposAlteraveis).map(([key, label]) => (
                        <React.Fragment key={key}>
                            <ListItem sx={{display: "flex", flexDirection: "row", gap: "6vw"}}>
                                <ListItemText primary={label} sx={{color: "#0078D7"}}/>
                                {key == "situacao"? (
                                    <>
                                        <Box display={"flex"} justifyContent="flex-end" gap="1vw" sx={{"&:hover": {backgroundColor: "inherit"}}}>
                                            <Chip label="Cadastrada" variant={chipsVariantsSemSalvar[0]} onClick={() => setandoSituacaoTask("Cadastrada")} />
                                            <Chip label="Em Andamento" variant={chipsVariantsSemSalvar[1]} onClick={() => setandoSituacaoTask("Em Andamento")} />
                                            <Chip label="Concluída" variant={chipsVariantsSemSalvar[2]} onClick={() => setandoSituacaoTask("Concluída")} />
                                            <Tooltip title="Salvar alteração da linha">
                                                <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                                    <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                    </>
                                ) : key == "tipo"? (
                                    <>
                                        <Box display={"flex"} justifyContent="flex-end" gap="1vw" sx={{"&:hover": {backgroundColor: "inherit"}}}>
                                            <Chip label="Pública" variant={chipsVariantsTipoTaskSemSalvar[0]} onClick={() => setandoTipoTask("Pública")} />
                                            <Chip label="Pessoal" variant={chipsVariantsTipoTaskSemSalvar[1]} onClick={() => setandoTipoTask("Pessoal")} />
                                            <Tooltip title="Salvar alteração da linha">
                                                <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                                    <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                    </>
                                )
                                : key == "dataEntrega"? (
                                    <>
                                        <Box display={"flex"} justifyContent={"flex-end"} gap={"3vw"}>
                                            <TextField variant="filled" type={"datetime-local"} placeholder={"dd/mm/aaaa"}
                                            value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                                            <Tooltip title="Salvar alteração da linha">
                                                <Fab size="small" onClick={(e) => submitParcial(e, key, false)} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                                    <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                                </Fab>
                                            </Tooltip>
                                        </Box>
                                    </> )
                                : (
                                <>
                                    <Box display={"flex"} justifyContent={"flex-end"} gap={"3vw"}>
                                        <TextField variant="filled" multiline maxRows={6} type={task[key] instanceof Date ? "date" : "text"} placeholder={task[key] instanceof Date ? "dd/mm/aaaa" : ("Novo(a) " + label)}
                                        value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                                        <Tooltip title="Salvar alteração da linha">
                                            <Fab size="small" onClick={(e) => submitParcial(e, key, false)} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                                <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                            </Fab>
                                        </Tooltip>
                                    </Box>
                                </>
                                )}
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}
                </List>
                <Box display={"flex"} justifyContent={"center"}>
                    <Button type="submit" sx={{backgroundColor: "#0078D7", color:"white"}} variant="contained">Salvar Todas as Alterações</Button>
                </Box>
            </Stack>
        </form>
        </>
    )
}