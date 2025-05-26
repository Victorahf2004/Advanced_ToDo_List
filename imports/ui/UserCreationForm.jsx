import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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
        <Typography variant="h3" sx={{color: "white"}} gutterBottom>
            Criando Novo Usuário
        </Typography>
        <Card sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            <CardContent>
                <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", gap: "1rem"}} onSubmit={submit} className="login-form">

                    <TextField variant="filled" type="text" placeholder="Novo Username"
                    name="username" value={username} required onChange={(e) => setUsername(e.target.value)} />
                
                    <TextField variant="filled" type="password" placeholder="Nova Password" value={password} required
                    onChange={(e) => setPassword(e.target.value)} />

                    <Button variant="contained" type="submit">Create User</Button>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={voltarPraTelaInicial}>Voltar à Tela de Login</Button>
            </CardActions>
        </Card>
        </>
    );
}