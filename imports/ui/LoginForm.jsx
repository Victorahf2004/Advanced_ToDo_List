import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate} from "react-router-dom";

export const LoginForm = ({username, setUsername, password, setPassword, reset}) => {
    let navigate = useNavigate();
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
            navigate("/Logado");
            reset();
        } catch (error) {
            alert("Erro no login: Por favor, cheque suas credenciais!");
            reset();
        }
    };

    const irParaCriarUsuario = () => {
        navigate("/CriarUsuario");
        reset();
    }
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
        <h1>Seja Bem-vindo!!</h1>
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
        <button onClick={irParaCriarUsuario}>Criar Usuário</button>
        </>
        
    );
};


