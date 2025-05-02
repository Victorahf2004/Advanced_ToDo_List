import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { UserCreationForm } from "./UserCreationForm";
import { Routes, Route } from "react-router-dom";
import Alert from "@mui/material/Alert";

export const TelasLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [estado, setEstado] = useState("normal"); 

    const reset = () => {
        if ((username != "") || (password != "")){
        setUsername("");
        setPassword("")
        }
    };
    return (
        <>
        {estado == "sucesso" && (
            <Alert severity="success" onClose={() => {setEstado("normal");}} > Usuário Criado com Sucesso!</Alert>
        )}
        <Routes>
        <Route path="/" element={<LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} estado={estado} setEstado={setEstado} reset={reset}/>} />
        <Route path="/CriarUsuario" element={<UserCreationForm username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} estado={estado} setEstado={setEstado}
            reset={reset} />} />
        </Routes>
        </>
    )
}