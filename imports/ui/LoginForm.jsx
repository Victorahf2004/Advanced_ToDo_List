import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate} from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

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
        <Typography variant="h4" sx={{color: "white"}} gutterBottom>
                    Bem vindo ao todo list
        </Typography>
        <Card sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center"}}>
            <CardContent>
                {estado == "erro" && (
                    <Alert severity="error" onClose={() => {setEstado("normal");}}>Erro no Login!</Alert>
                )}
                <form style={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems:"center", gap: "1rem"}} onSubmit={submit}>
                    <>
                        <TextField variant="filled" type="text" id="username" placeholder="Username" required
                        value={username} onChange={(e) => handleChange(e, "username")} />
                    </>
                    <>
                        <TextField variant="filled" type="password" id="password" placeholder="Password" required
                        value={password} onChange={(e) => handleChange(e, "password")} />
                    </>
                    <Button variant="contained" type="submit">Log in</Button>
                </form>
            </CardContent>
            <CardActions>
                <Button variant="contained" onClick={irParaCriarUsuario}>Criar Usuário</Button>
            </CardActions>
        </Card>
    </>
    );
};


