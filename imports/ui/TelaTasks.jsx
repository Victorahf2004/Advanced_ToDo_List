import { Meteor } from "meteor/meteor"
import React from "react"
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
        <div>Usuário Logado</div>
        <button onClick={logout}>Log Out</button>
        </>
    )
}