import React, { useState } from "react";
import { TelaBoasVindas } from "./TelaBoasVindas";
import { TelaTasks } from "./TelaTasks";
import { useNavigate } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router-dom";


export const TelasLogado = () => {
    const [erroLogout, setErroLogout] = useState(false);

    return (
        <>
        <Routes>
            <Route path="/" element={<Navigate to="Start" />} />
            <Route path="Start" element={<TelaBoasVindas erroLogout={erroLogout} setErroLogout={setErroLogout} />} />
            <Route path="ListaTasks/*" element={<TelaTasks erroLogout={erroLogout} setErroLogout={setErroLogout}/>} />
            {/* <Route path="/Logado/Perfil" element={<TelaPerfil />} />  Vou implementar depois*/}
        </Routes>
        </>
    )
}