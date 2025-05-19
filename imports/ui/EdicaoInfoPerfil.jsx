import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { SelectSexo } from "./SelectSexo";
import { InputFotoPerfil } from "./InputFotoPerfil";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";

export const EdicaoInfoPerfil = ({ alteracaoPerfil, setAlteracaoPerfil, chavesVisiveis, camposVisiveis }) => {

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    if (!user){
        return (
        <Typography variant="h4">
            Loading...
        </Typography>
        )
    }

    const userId = user._id;
    const valoresIniciais = {
        nome: "",
        email: "",
        data_nasc: "",
        sexo: "",
        empresa_trab: "",
        foto: "",
    };
    const [inputs, setInputs] = useState(valoresIniciais);
    
    const reset = (tipo, chave) => {
        if (tipo == "Parcial") {
            setInputs((prev) => ({
                ...prev,
                [chave]: "",
            }));
        }
        else {
            const valoresResetados = {};
            for (let j = 0; j < chavesVisiveis.length; j++) {
                chave = chavesVisiveis[j];
                valoresResetados[chave] = "";
            }
            setInputs(valoresResetados);
        }
        setAlteracaoPerfil("");
    }

    const handleChange = (e, chave) => {
        const novoValor = e.target.value;
        setInputs((prev) => {
            const atualizado = {
                ...prev,
                [chave]: novoValor,
            };
            return atualizado;
        });
    };

    const handleChangeFoto = (newFoto) => {
        setInputs((prev) => ({
            ...prev,
            ["foto"]: newFoto,
        }))
    };
    
    const submitParcial = async (e, chave) => {
        e.preventDefault();
        let novoValor = inputs[chave];

        if (chave == "data_nasc"){
            const [ano, mes, dia] = novoValor.split("-");
            const data = new Date(ano, mes-1, dia);
            novoValor = data;
        }

        const atualizacaoParcial = { [`profile.${chave}`]: novoValor}
        reset("Parcial", chave);

        try {
            await Meteor.callAsync("users.updateProfile", atualizacaoParcial);
            setAlteracaoPerfil("sucessoEditandoPerfil");
        }
        catch(error) {
            setAlteracaoSucesso("Erro em salvar alterações");
        }
    }

    const submit = async (e) => {
        e.preventDefault();
        const atualizacoes = {};
        
        for (let i = 0; i < chavesVisiveis.length; i++) {
            const chave = chavesVisiveis[i];
            const elemento = user.profile[chave];
            
            if (inputs[chave] == '') { 
                atualizacoes[`profile.${chave}`] = elemento;
            }
            
            else {
                if (chave == "data_nasc"){
                    const [ano, mes, dia] = (inputs[chave]).split("-");
                    const data = new Date(ano, mes-1, dia);
                    atualizacoes[`profile.${chave}`] = data;
                }
                else {
                    atualizacoes[`profile.${chave}`] = (inputs[chave]).trim();
                }
            }
        }

        reset("Completo", false);

        try {
            await Meteor.callAsync("users.updateProfile", atualizacoes);
            setAlteracaoPerfil("sucessoEditandoPerfil");
        }
        catch(error) {
            setAlteracaoPerfil("Erro em salvar alterações");
        }
    }


    return (
        <>
        <form onSubmit={submit}>
        <List>
        {Object.entries(camposVisiveis).map(([key, label]) => (
            <React.Fragment key={key}>
            <ListItem>
                <ListItemText primary={label} />
                {key == "data_nasc"? (
                    <>
                    <TextField variant="filled" type={"date"} placeholder={"dd/mm/aaaa"}
                    value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                    <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                    </> )
                : key == "email"? (
                    <>
                    <TextField variant="filled" multiline maxRows={6} type={"email"} placeholder={"Novo(a) " + label}
                    value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                    <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                    </>
                )
                : key == "sexo"? (
                    <>
                    <SelectSexo chave={key} inputs={inputs} handleChange={handleChange} submitParcial={submitParcial} />
                    <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                    </>
                )
                : key == "foto"? (
                    <>
                    <InputFotoPerfil chave={key} inputs={inputs} handleChange={handleChangeFoto} submitParcial={submitParcial} />
                    <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                    </>
                )
                : (
                <>
                <TextField variant="filled" multiline maxRows={6} type={"text"} placeholder={"Novo(a) " + label}
                 value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                <ListItemButton variant="contained" onClick={(e) => submitParcial(e, key)}>Salvar essa alteração</ListItemButton>
                </>
                )}
            </ListItem>
            <Divider />
            </React.Fragment>
        ))}
        </List>
        <Button type="submit" variant="contained">Salvar Todas as Alterações</Button>
        </form>
        </>
    )
}