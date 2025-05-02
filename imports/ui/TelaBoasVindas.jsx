import React from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import Button from "@mui/material/Button"
import Alert from "@mui/material/Alert"

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

    return (
        <>
        {erroLogout && (
                    <Alert severity="error" onClose={() => {setErrorLogout(false);}} > Erro no Logout</Alert>
                )}
        <h1>Seja Bem-Vindo!!!</h1>
        <Button variant="contained" onClick={openTasks}>Abrir Tasks</Button>
        <Button variant="contained" onClick={logout}>Log Out</Button>
        <Button variant="contained">Abrir Perfil</Button>
        </>
    )
}