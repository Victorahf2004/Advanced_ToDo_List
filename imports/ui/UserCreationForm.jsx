import { Meteor } from "meteor/meteor";
import React from "react";
import { useNavigate} from "react-router-dom";

export const UserCreationForm = ({username, setUsername, password, setPassword, reset}) => {
    let navigate = useNavigate();

    const voltarPraTelaInicial = () => {
        navigate("/");
        reset();
    }
    const submit = async (e) => {
        e.preventDefault();
        try{
        await Meteor.callAsync("users.create", username, password);
        alert("Seu usuário foi criado com Sucesso, pode logar")
        navigate("/");
        reset();
        }
        catch(error){
            alert("Erro na criação do usuário, tente com outros username/password")
            reset();
        }
    };

    return (
        <>
        <form onSubmit={submit} className="login-form">
            <h1>Criando Novo Usuário</h1>
            <div>
            Digite o username que deseja: <br></br>
            <label htmlFor="username">Username</label>

            <input type="text" placeholder="Username"
            name="username" value={username} required onChange={(e) => setUsername(e.target.value)} />

            </div>

            <div>
            Digite a senha que deseja: <br></br>
            <label htmlFor="password">Password</label>

            <input type="password" placeholder="Password" value={password} required
            onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div>
            <button type="submit">Create User</button>
            </div>
            <button onClick={voltarPraTelaInicial}>Voltar à Tela de Login</button>
        </form>
        </>
    );
}