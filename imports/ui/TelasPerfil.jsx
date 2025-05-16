import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import { EdicaoTask } from "./EdicaoTask";
import { VisualizacaoInfoPerfil } from "./VisualizacaoInfoPerfil";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export const TelasPerfil = () => {
    const camposVisiveis = {
            nome: "Nome",
            email: "E-mail",
            data_nasc: "Data de nascimento",
            sexo: "Sexo",
            empresa_trab: "Empresa em que trabalha",
            foto: "Foto",
        };

    const [value, setValue] = useState(0);

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    if (!user) {
        return (
        <Typography variant="h4">
            Loading...
        </Typography>
        )
    }

    console.log(user.username);
    const voltarParaTelaBoasVindas = () => {
        navigate("/Logado/Start");
        setValue(0);
    }


    const handleChange = (e, newValue) => {
        setValue(newValue);
    }

    return (
        <>
            <Box>
                <Typography variant="h4">
                    Informações Usuário: {user.username}
                </Typography>
            </Box>
            <Tabs value={value} onChange={handleChange}>
                <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
            </Tabs> 
            
            <Box hidden={value !== 0} >
                <VisualizacaoInfoPerfil camposVisiveis={camposVisiveis} />
            </Box>

            <Box hidden={value !== 1} >
                <>
                Edição das Info Perfil
                </>
            </Box>
            <Button variant="contained" onClick={voltarParaTelaBoasVindas}>Voltar para Home</Button>
        </>
    )
}