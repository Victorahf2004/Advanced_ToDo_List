import React, { useState } from "react";
import { LoginForm } from "./LoginForm";
import { UserCreationForm } from "./UserCreationForm";


export const TelasLogin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [telaAtual, setTelaAtual] = useState(true);

    const reset = () => {
        if ((username != "") || (password != "")){
        setUsername("");
        setPassword("")
        }
    };
    return (
        <>
        {telaAtual ? (
            <>
            <LoginForm username={username} setUsername={setUsername}
            password={password} setPassword={setPassword} 
            setTelaAtual={setTelaAtual} reset={reset}/>
            </>
        ): (
            <UserCreationForm username={username} setUsername={setUsername}
            password={password} setPassword={setPassword}
            setTelaAtual={setTelaAtual} reset={reset}/>
        )}
        </>
    )
}