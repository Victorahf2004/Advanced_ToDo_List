import { Meteor } from "meteor/meteor";
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { ReactiveVar } from "meteor/reactive-var";
import { VisualizacaoEdicaoTask } from "./VisualizacaoEdicaoTask";
import { ListaTasks } from "./ListaTasks";
import { TasksCollection } from '/imports/api/TasksCollection';
import { TaskForm } from "./TaskForm";
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";

export const filtroConcluidas = new ReactiveVar(false);
export const filtroSearch = new ReactiveVar("");
export const filtroPaginaAtual = new ReactiveVar(1);
export const numeroPaginasVar = new ReactiveVar(1);

export const TelaTasks = ({setandoSairFalseCallback, saindo, setSaindo, erroLogout, setErroLogout, logout}) => {
    const user = useTracker(() => Meteor.user());
    
    const isLoading = useSubscribe("tasksLista", filtroConcluidas.get(), filtroSearch.get(), filtroPaginaAtual.get());
    const handleFiltroChange = (saindoDaTela) => {
        if (saindoDaTela == false){
            const situacao = filtroConcluidas.get();
            filtroConcluidas.set(!situacao);
        }
        else {
            filtroConcluidas.set(false);
            filtroSearch.set("");
            filtroPaginaAtual.set(1);
        }
    }

    const [alteracaoSucesso, setAlteracaoSucesso] = useState("");
    
    let navigate = useNavigate();

    const tasks = useTracker(() => {
        if (!user || isLoading()) {
            return [];
        }
        
        const mostrarConcluidas = filtroConcluidas.get();
        const mostrarTasksFiltradas = filtroSearch.get();
        const mostrarPagina = filtroPaginaAtual.get();

        return TasksCollection.find({}, { sort: {createdAt: -1} }).fetch();

      }, [user]);

    const goToAddTask = () => {
        navigate("/Logado/ListaTasks/AddTask");
        setSaindo(true);
    }

    return (
        <>
        <Routes>
            <Route path="/" element={<ListaTasks setandoSairFalseCallback={setandoSairFalseCallback} handleFiltroChange={handleFiltroChange} saindo={saindo} setSaindo={setSaindo} tasks={tasks} erroLogout={erroLogout} setErroLogout={setErroLogout} logout={logout} goToAddTask={goToAddTask} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
            <Route path="/AddTask" element={<TaskForm setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo} />} />
            <Route path=":taskId" element={<VisualizacaoEdicaoTask setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>} />
        </Routes>
        </>
    )
}