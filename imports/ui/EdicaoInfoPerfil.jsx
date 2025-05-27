import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState, useEffect } from "react";
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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import DoneIcon from '@mui/icons-material/Done';
import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const EdicaoInfoPerfil = ({ setandoSairFalseCallback, saindo, setSaindo, alteracaoPerfil, setAlteracaoPerfil, chavesVisiveis, camposVisiveis }) => {

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    const valoresIniciais = {
        nome: "",
        email: "",
        data_nasc: "",
        sexo: "",
        empresa_trab: "",
        foto: "",
    };
    
    const [inputs, setInputs] = useState(valoresIniciais);
    const [openLoading, setOpenLoading] = useState(false);

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

    useEffect(() => {
        if (saindo) {
            reset("Completo", false);
            setOpenLoading(false);
            setandoSairFalseCallback();
        }
    }, [saindo]);

    if (!user){
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    const userId = user._id;

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
        <Stack flexDirection={"column"} width={"80%"}>
        <form onSubmit={submit}>
            <Stack spacing={8}>
                <List sx={{backgroundColor: "white"}}>
                {Object.entries(camposVisiveis).map(([key, label]) => (
                    <React.Fragment key={key}>
                    <ListItem sx={{display: "flex", flexDirection: "row", gap: "6vw"}}>
                        <ListItemText primary={label} sx={{color: "#0078D7"}}/>
                        {key == "data_nasc"? (
                            <>
                            <Box display={"flex"} justifyContent={"flex-end"} gap={"1vw"}>
                                <TextField variant="filled" type={"date"} placeholder={"dd/mm/aaaa"}
                                value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                                <Tooltip title="Salvar alteração da linha">
                                    <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                        <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                    </Fab>
                                </Tooltip>
                            </Box>
                            </> )
                        : key == "email"? (
                            <>
                            <Box display={"flex"} justifyContent={"flex-end"} gap={"1vw"}>
                                <TextField variant="filled" multiline maxRows={6} type={"email"} placeholder={"Novo(a) " + label}
                                value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                                <Tooltip title="Salvar alteração da linha">
                                    <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                        <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                    </Fab>
                                </Tooltip>
                            </Box>
                            </>
                        )
                        : key == "sexo"? (
                            <>
                            <Box display={"flex"} justifyContent={"flex-end"} gap={"1vw"}>
                                <SelectSexo chave={key} inputs={inputs} handleChange={handleChange} submitParcial={submitParcial} />
                                <Tooltip title="Salvar alteração da linha">
                                    <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                        <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                    </Fab>
                                </Tooltip>
                            </Box>
                            </>
                        )
                        : key == "foto"? (
                            <>
                            <Box display={"flex"} justifyContent={"flex-end"} gap={"1vw"}>
                                <InputFotoPerfil chave={key} inputs={inputs} handleChange={handleChangeFoto} submitParcial={submitParcial} />
                                <Tooltip title="Salvar alteração da linha">
                                    <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                        <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                    </Fab>
                                </Tooltip>
                            </Box>
                            </>
                        )
                        : (
                        <>
                        <Box display={"flex"} justifyContent={"flex-end"} gap={"1vw"}>
                            <TextField variant="filled" multiline maxRows={6} type={"text"} placeholder={"Novo(a) " + label}
                            value={inputs[key]} onChange={(e) => handleChange(e, key)}/>
                            <Tooltip title="Salvar alteração da linha">
                                <Fab size="small" onClick={(e) => submitParcial(e, key, inputs[key])} sx={{backgroundColor: '#4A148C', alignSelf:"center"}}>
                                    <DoneIcon fontSize="small" sx={{color: '#00e4d0'}} variant="filled">Salvar essa alteração</DoneIcon>
                                </Fab>
                            </Tooltip>
                        </Box>
                        </>
                        )}
                    </ListItem>
                    <Divider />
                    </React.Fragment>
                ))}
                </List>
                <Box display={"flex"} justifyContent={"center"}>
                    <Button type="submit" variant="contained">Salvar Todas as Alterações</Button>
                </Box>
            </Stack>
        </form>
        </Stack>
        </>
    )
}