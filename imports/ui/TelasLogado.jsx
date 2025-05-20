import React, { useState } from "react";
import { TelaBoasVindas } from "./TelaBoasVindas";
import { TelaTasks } from "./TelaTasks";
import { TelasPerfil } from "./TelasPerfil";
import { MenuDrawer } from "./MenuDrawer";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";


export const TelasLogado = () => {
    const [erroLogout, setErroLogout] = useState(false);

    return (
        <>
        <MenuDrawer erroLogout={erroLogout} setErroLogout={setErroLogout}/>
        <Routes>
            <Route path="/" element={<Navigate to="Start" />} />
            <Route path="Start" element={<TelaBoasVindas erroLogout={erroLogout} setErroLogout={setErroLogout} />} />
            <Route path="ListaTasks/*" element={<TelaTasks erroLogout={erroLogout} setErroLogout={setErroLogout}/>} />
            <Route path="Perfil" element={<TelasPerfil />} />
        </Routes>
        </>
    )
}