import React from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const TelaBoasVindas = ({erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    let navigate = useNavigate();

    const logoutAsync = () => {
        new Promise((resolve, reject) => {
            Meteor.logout((err) => {
                if (err) reject(err);
                else resolve();
            });
        });
    };
    
    const logout = async () => {
        try{
            await logoutAsync();
            navigate("/");
        }
        catch (error) {
            setErroLogout(true);
        }
    }
    const openTasks = () => {
        navigate("/Logado/ListaTasks");
    };
    const ajustarDisplay = (parametro) => {
        let tamanho = parametro.length;
        if (tamanho >= 14) {
            return ((parametro.slice(0, 15)) + "... ");
        }
        else {
            return parametro;
        }
    }
    return (
        <>
        {erroLogout && (
                    <Alert severity="error" onClose={() => {setErrorLogout(false);}} > Erro no Logout</Alert>
                )}
        <Typography variant="h3" gutterBottom>
            Seja Bem-Vindo, {ajustarDisplay(user.username)}!!!
        </Typography>
        <Button variant="contained" onClick={openTasks}>Abrir Tasks</Button>
        <Button variant="contained" onClick={logout}>Log Out</Button>
        <Button variant="contained">Abrir Perfil</Button>
        </>
    )
}