import React, { useState, useEffect } from "react";
import { Meteor } from "meteor/meteor";
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import { EdicaoInfoPerfil } from "./EdicaoInfoPerfil";
import { VisualizacaoInfoPerfil } from "./VisualizacaoInfoPerfil";
import { useTracker } from "meteor/react-meteor-data";
import { useNavigate} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export const TelasPerfil = ({saindo, setSaindo}) => {
    const camposVisiveis = {
            nome: "Nome",
            email: "E-mail",
            data_nasc: "Data de nascimento",
            sexo: "Sexo",
            empresa_trab: "Empresa em que trabalha",
            foto: "Foto",
        };
    
    const chavesVisiveis = Object.keys(camposVisiveis);
    const [alteracaoPerfil, setAlteracaoPerfil] = useState("");
    const [value, setValue] = useState(0);

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    useEffect(() => {
        if (saindo){
            setValue(0);
            setAlteracaoPerfil("");
            setSaindo(false);
        }
    }, [saindo])

    if (!user) {
        return (
        <Typography variant="h4">
            Loading...
        </Typography>
        )
    }

    console.log(user.username);

    const handleChange = (e, newValue) => {
        setValue(newValue);
        setAlteracaoPerfil("");
    }

    return (
        <>
            {alteracaoPerfil == "Erro em salvar alterações" && (
            <Alert severity="error" onClose={() => setAlteracaoPerfil("")} > Não foi possível salvar as alterações do perfil!</Alert>
            )}
            {alteracaoPerfil == "sucessoEditandoPerfil" && (
                <Alert severity="success" onClose={() => setAlteracaoPerfil("")} > As informações do seu perfil foram alteradas com sucesso!</Alert>
            )}
            <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}>
                <Box>
                    <Typography variant="h4">
                        Informações Usuário: {user.username}
                    </Typography>
                </Box>
                <Tabs value={value} onChange={handleChange}>
                    <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                    <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
                </Tabs> 
                
                {value == 0? (
                    <VisualizacaoInfoPerfil camposVisiveis={camposVisiveis} />
                ): (
                    <EdicaoInfoPerfil saindo={saindo} setSaindo={setSaindo} alteracaoPerfil={alteracaoPerfil} setAlteracaoPerfil={setAlteracaoPerfil} chavesVisiveis={chavesVisiveis} camposVisiveis={camposVisiveis} />
                )}
            </Stack>
        </>
    )
}