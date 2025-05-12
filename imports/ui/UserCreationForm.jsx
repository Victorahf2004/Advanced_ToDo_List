import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
            <Typography variant="h3" gutterBottom>
                Criando Novo Usuário
            </Typography>
            <Box>
            Digite o username que deseja: <br></br>

            <TextField variant="filled" multiline type="text" placeholder="Username"
            name="username" value={username} required onChange={(e) => setUsername(e.target.value)} />

            </Box>

            <Box>
            Digite a senha que deseja: <br></br>
        
            <TextField variant="filled" multiline type="password" placeholder="Password" value={password} required
            onChange={(e) => setPassword(e.target.value)} />
            </Box>

            <Button variant="contained" type="submit">Create User</Button>
            <br></br>
            <Button variant="contained" onClick={voltarPraTelaInicial}>Voltar à Tela de Login</Button>
        </form>
        </>
    );
}