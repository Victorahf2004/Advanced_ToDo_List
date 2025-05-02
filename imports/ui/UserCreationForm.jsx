import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"

export const UserCreationForm = ({username, setUsername, password, setPassword, estado, setEstado, reset}) => {
    let navigate = useNavigate();

    const voltarPraTelaInicial = () => {
        navigate("/");
        reset(false);
    }
    const submit = async (e) => {
        e.preventDefault();
        try{
        await Meteor.callAsync("users.create", username, password);
        setEstado("sucesso");
        navigate("/");
        reset(true);
        }
        catch(error){
            setEstado("erro");
        }
    };

    return (
        <>
        {estado == "erro" && (
            <Alert severity="error" onClose={() => {setEstado("normal");}} > Erro ao criar usuário!</Alert>
        )}
        <form onSubmit={submit} className="login-form">
            <h1>Criando Novo Usuário</h1>
            <div>
            Digite o username que deseja: <br></br>

            <TextField variant="filled" type="text" placeholder="Username"
            name="username" value={username} required onChange={(e) => setUsername(e.target.value)} />

            </div>

            <div>
            Digite a senha que deseja: <br></br>
        
            <TextField variant="filled" type="password" placeholder="Password" value={password} required
            onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
            <Button variant="contained" type="submit">Create User</Button>
            </div>
            <Button variant="contained" onClick={voltarPraTelaInicial}>Voltar à Tela de Login</Button>
        </form>
        </>
    );
}