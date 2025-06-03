import React, { useState } from "react";
import { TelaBoasVindas } from "./TelaBoasVindas";
import { TelaTasks } from "./TelaTasks";
import { TelasPerfil } from "./TelasPerfil";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { TelasLogadoLayout } from "./TelasLogadoLayout";

export const TelasLogado = () => {
    const [erroLogout, setErroLogout] = useState(false);
    const [saindo, setSaindo] = useState(false);
    let navigate = useNavigate();

    const setandoSairFalseCallback = () => {
        setSaindo(false);
    }

    const openPerfil = () => {
        navigate("/Logado/Perfil");
        setSaindo(true);
    }

    const openTasks = () => {
        navigate("/Logado/ListaTasks");
        setSaindo(true);
    }
    
    const openHome = () => {
        navigate("/Logado/Start");
        setSaindo(true);
    }

    const logoutAsync = () => {
        new Promise((resolve, reject) => {
            Meteor.logout((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };
    
    const logout = async () => {
        try{
            await logoutAsync();
            navigate("/");
            setSaindo(true);
        }
        catch (error) {
            setSaindo(true);
        }
    }

    return (
        <>
        <Routes>
            <Route element={<TelasLogadoLayout setandoSairFalseCallback={setandoSairFalseCallback} openPerfil={openPerfil} openTasks={openTasks} openHome={openHome} logout={logout} saindo={saindo} setSaindo={setSaindo} erroLogout={erroLogout} setErroLogout={setErroLogout} />}>
                <Route path="/" element={<Navigate to="Start" />} />
                <Route path="Start" element={<TelaBoasVindas setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo} openTasks={openTasks} erroLogout={erroLogout} setErroLogout={setErroLogout} />} />
                <Route path="ListaTasks/*" element={<TelaTasks setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo} erroLogout={erroLogout} setErroLogout={setErroLogout} logout={logout} />} />
                <Route path="Perfil" element={<TelasPerfil setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo}/>} />
            </Route>
        </Routes>
        </>
    )
}