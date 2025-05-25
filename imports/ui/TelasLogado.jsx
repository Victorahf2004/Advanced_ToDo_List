import React, { useState } from "react";
import { TelaBoasVindas } from "./TelaBoasVindas";
import { TelaTasks } from "./TelaTasks";
import { TelasPerfil } from "./TelasPerfil";
import { MenuDrawer } from "./MenuDrawer";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { TelasLogadoLayout } from "./TelasLogadoLayout";

export const TelasLogado = () => {
    const [erroLogout, setErroLogout] = useState(false);
    const [saindo, setSaindo] = useState(false);
    let navigate = useNavigate();

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
            <Route element={<TelasLogadoLayout openPerfil={openPerfil} openTasks={openTasks} openHome={openHome} logout={logout} saindo={saindo} setSaindo={setSaindo} erroLogout={erroLogout} setErroLogout={setErroLogout} />}>
                <Route path="/" element={<Navigate to="Start" />} />
                <Route path="Start" element={<TelaBoasVindas openTasks={openTasks} erroLogout={erroLogout} setErroLogout={setErroLogout} />} />
                <Route path="ListaTasks/*" element={<TelaTasks saindo={saindo} setSaindo={setSaindo} erroLogout={erroLogout} setErroLogout={setErroLogout} logout={logout} />} />
                <Route path="Perfil" element={<TelasPerfil saindo={saindo} setSaindo={setSaindo}/>} />
            </Route>
        </Routes>
        </>
    )
}