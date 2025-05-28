import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { EdicaoTask } from "./EdicaoTask";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import List from "@mui/material/List";
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ListItem from "@mui/material/ListItem";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { filtroConcluidas } from "./TelaTasks";
import { filtroSearch } from "./TelaTasks";
import { filtroPaginaAtual } from "./TelaTasks";
import TextField from "@mui/material/TextField";
import SearchIcon from '@mui/icons-material/Search';
import Pagination from "@mui/material/Pagination";

export const ListaTasks = ({setandoSairFalseCallback, handleFiltroChange, saindo, setSaindo, tasks, erroLogout, setErroLogout, goToAddTask, alteracaoSucesso, setAlteracaoSucesso}) => {
    
    const [openLoading, setOpenLoading] = useState(false);
    const [inputPesquisa, setInputPesquisa] = useState("");

    useEffect(() => {
        if(saindo) {
            setErroLogout(false);
            setAlteracaoSucesso("");
            handleFiltroChange(true);
            setOpenLoading(false);
            setInputPesquisa("");
            setandoSairFalseCallback();
        }
    }, [saindo]);

    const handleDelete = async ( taskId, taskCreatorId ) => {
        try{
            await Meteor.callAsync("tasks.delete", taskId, taskCreatorId);
        }
        catch(error) {
            setAlteracaoSucesso("Erro de permissão delete");
        }
    }

    return (
        <>
            {alteracaoSucesso == "Erro de permissão delete" && (
                    <Alert severity="error" onClose={() => {setAlteracaoSucesso("");}} > Só o criador da tarefa pode deletá-la </Alert>
                )}
            {alteracaoSucesso == "sucessoListaTasks" && (
                    <Alert severity="success" onClose={() => {setAlteracaoSucesso("");}} > Os dados da Tarefa foram alterados com Sucesso!</Alert>
                )}
            {erroLogout && (
                    <Alert severity="error" onClose={() => {setErroLogout(false);}} > Erro no Logout</Alert>
                )}
            <Stack direction={"column"} spacing={8} justifyContent={"center"} alignItems={"center"}>
                <Typography variant="h4" sx={{color: "white"}} gutterBottom>
                    Tarefas Cadastradas
                </Typography>
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"} alignItems={"center"} gap={"2vw"}>
                    <TextField sx={{backgroundColor: "white"}} placeholder="Digite um nome de tarefa" variant="filled" type="text" value={inputPesquisa} onChange={(e) => setInputPesquisa(e.target.value)} />
                    <Fab size="small" onClick={() => filtroSearch.set(inputPesquisa)} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                        <SearchIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</SearchIcon>
                    </Fab>
                </Box>
                <FormControlLabel label="Ver tarefas Concluídas" control={<Checkbox checked={filtroConcluidas.get()} onChange={() => handleFiltroChange(false)} />} sx={{backgroundColor: "#00f285", color: "white"}} />
                <Stack direction={"column"} spacing={4} width={"80%"}>
                    {tasks.length > 0 ? (
                        <List sx={{backgroundColor: "white"}}>
                            {tasks.map((task) => (
                                <Task
                                key={task._id}
                                dataEntrega={task.dataEntrega}
                                setSaindo={setSaindo}
                                identificadorTask={task._id} 
                                nomeDaTarefa={task.nomeTask}
                                nomeDoUsuario={task.userName}
                                onDelete={handleDelete}
                                />
                            ))}
                        </List>
                    ): (
                        <Box display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{backgroundColor: "white", height: "20vh"}}>
                            <Typography variant="h5" sx={{ color: "#0078D7"}}>
                                Nenhuma tarefa Encontrada!
                            </Typography>
                        </Box>
                    )}
                    <Box display="flex" justifyContent="flex-end">
                        <Tooltip title="Adicionar Task">
                            <Fab color="primary" sx={{backgroundColor: "white", color:"#0078D7"}} size={"small"} onClick={goToAddTask}>
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                    <Pagination count={10} page={filtroPaginaAtual.get()} onChange={(event, value) => filtroPaginaAtual.set(value)} />
                </Stack>
            </Stack>
        </>
    )
}