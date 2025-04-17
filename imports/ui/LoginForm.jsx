import { Meteor } from "meteor/meteor";
import React, { useState} from "react";

export const LoginForm = ({username, setUsername, password, setPassword, setTelaAtual, reset}) => {
    const loginAsync = (username, password) =>
        new Promise((resolve, reject) => {
          Meteor.loginWithPassword(username, password, (err) => {
            if (err) reject(err);
            else resolve();
          });
        });

    const submit = async (e) => {
        e.preventDefault();
        try {
            await loginAsync(username, password);
        } catch (error) {
            alert("Erro no login: Por favor, cheque suas credenciais!");
            reset();
        }
    };

    const handleChange = (e, parametro) => {
        if (parametro == "username"){
            setUsername(e.target.value);
        }
        else if (parametro == "password"){
        setPassword(e.target.value);
        }
    };
    return (
        <>
        <form onSubmit={submit}>
            <>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" placeholder="Username" required
                 value={username} onChange={(e) => handleChange(e, "username")} />
            </>
            <>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" placeholder="Password" required
                value={password} onChange={(e) => handleChange(e, "password")} />
            </>
            <button type="submit">Log in</button>
        </form>
        <button onClick={() => { setTelaAtual(false);
            reset();}}>Criar Usuário</button>
        </>
        
    );
};


