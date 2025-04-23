import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { UserCreationForm } from "./UserCreationForm";
import { Route } from "react-router-dom";

export const TelasLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const reset = () => {
        if ((username != "") || (password != "")){
        setUsername("");
        setPassword("")
        }
    };
    return (
        <>
        <Route path="/" element={<LoginForm username={username} setUsername={setUsername}
        password={password} setPassword={setPassword} reset={reset}/>} />
        <Route path="/CriarUsuario" element={<UserCreationForm username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            reset={reset} />} />
        </>
    )
}