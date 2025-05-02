import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";

export const LoginForm = ({username, setUsername, password, setPassword, estado, setEstado, reset}) => {

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
            reset(false);
        } catch (error) {
            setEstado("erro");
        }
    };

    const irParaCriarUsuario = () => {
        navigate("/CriarUsuario");
        reset(false);
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
        <h1>Por favor, faça seu login ou crie seu usuário</h1>
        {estado == "erro" && (
            <Alert severity="error" onClose={() => {setEstado("normal");}}>Erro no Login!</Alert>
        )}
        <form onSubmit={submit}>
            <>
                <TextField variant="filled" type="text" id="username" placeholder="Username" required
                 value={username} onChange={(e) => handleChange(e, "username")} />
            </>
            <>
                <br></br>
                <TextField variant="filled" type="password" id="password" placeholder="Password" required
                value={password} onChange={(e) => handleChange(e, "password")} />
            </>
            <br></br>
            <Button variant="contained" type="submit">Log in</Button>
        </form>
        <br></br>
        <Button variant="contained" onClick={irParaCriarUsuario}>Criar Usuário</Button>
        </>
        
    );
};


