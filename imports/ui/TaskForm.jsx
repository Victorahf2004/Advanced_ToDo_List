import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Meteor } from "meteor/meteor";
import List from "@mui/material/List";
import { Routes, Route, useNavigate } from "react-router-dom";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Divider from "@mui/material/Divider";

export const TaskForm = ({ saindo, setSaindo }) => {
    const camposInserir = {
            nomeTask: "nome",
            descricao: "Descrição",
            tipo: "Tipo",
        };
    
    const valoresIniciais = {
        nomeTask: "",
        descricao: "",
        tipo: "Pública",
    };
    let navigate = useNavigate();
    const arrayVariants = ["outlined", "outlined"];

    const [chipsVariants, setChipsVariants] = useState(arrayVariants);
    const [alerta, setAlerta] = useState(0);
    const [inputs, setInputs] = useState(valoresIniciais);

    const reset = () => {
        const valoresResetados = {};
        for (const chave of Object.keys(valoresIniciais)) {
            valoresResetados[chave] = "";
        }
        setInputs(valoresResetados);
    }

    useEffect(() => {
        if(saindo) {
            reset();
            setChipsVariants(arrayVariants);
            setAlerta(0);
            setSaindo(false);
        }
    }, [saindo])
    
    const handleChange = (e, chave) => {
        const novoValor = e.target.value;
        setInputs((prev) => ({
            ...prev,
            [chave]: novoValor,
        }))
    }

    const setandoTipoTask = (tipoTask) => {
        let template = [...arrayVariants];

        if (tipoTask == "Pública") {
            template[0] = "filled";
        }
        else if (tipoTask == "Pessoal") {
            template[1] = "filled";
        }
        setInputs((prev) => ({
            ...prev,
            "tipo": tipoTask,
        }))
        setChipsVariants(template);
    }
    
    const checandoSeHouveAlteracoes = ({nomeTask, descricao, tipo}) => {
        if (!nomeTask){
            return false;
        }
        return true;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!checandoSeHouveAlteracoes(inputs)) {
            setAlerta(1);
        }

        else {
            await Meteor.callAsync("tasks.insert", inputs);
            navigate("/Logado/ListaTasks");
            reset();
            setChipsVariants(arrayVariants);
            setAlerta(0);
        }
    };

    return (
        <>
        {alerta == 1 && (
            <Alert severity="error" onClose={() => setAlerta(0)}>Para criar uma task, é obrigatório preencher, pelo menos, o nome dela</Alert>
        )}
        <form onSubmit={handleSubmit}>
            <List>
                {Object.entries(camposInserir).map(([key, label]) => (
                    <React.Fragment key={key}>
                    <ListItem>
                        <ListItemText primary={label} />
                        {key == "tipo"? (
                            <>
                                <Chip label="Pública" variant={chipsVariants[0]} onClick={() => setandoTipoTask("Pública")} />
                                <Chip label="Pessoal" variant={chipsVariants[1]} onClick={() => setandoTipoTask("Pessoal")} />
                            </>
                        ) : (
                            <>
                                <TextField variant="filled" multiline maxRows={6} type="text" placeholder={"Novo(a) " + label}
                                value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                            </>
                        )}
                    </ListItem>
                    <Divider />
                    </React.Fragment>
                ))}
            </List>
            <Button type="submit" variant="contained">Add Task</Button>
        </form>
        </>
    );
};