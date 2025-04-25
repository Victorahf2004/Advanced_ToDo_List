import { Meteor } from "meteor/meteor";
import { List } from "./List";
import React from "react";
import { useNavigate} from "react-router-dom";

export const TelaTasks = () => {
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
            alert("Erro na operação de logout");
        }
      }
    return (
        <>
        <h1>Tela de Tarefas</h1>
        <div>Usuário Logado</div>
        <List />
        <button onClick={logout}>Log Out</button>
        </>
    )
}