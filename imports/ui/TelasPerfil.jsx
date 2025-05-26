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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
    const [openLoading, setOpenLoading] = useState(false);

    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());

    useEffect(() => {
        if (saindo){
            setValue(0);
            setAlteracaoPerfil("");
            setOpenLoading(false);
            setSaindo(false);
        }
    }, [saindo])

    if (!user) {
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    console.log(user.username);

    const handleChange = (e, newValue) => {
        setValue(newValue);
        setAlteracaoPerfil("");
    }

    const customTextColor = '#4A148C'; 
    const customIndicatorColor = "#00f285";

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
                    <Typography variant="h4" color="white">
                        Informações Usuário: {user.username}
                    </Typography>
                </Box>
                <Tabs value={value} onChange={handleChange} sx={{
          '& .MuiTabs-indicator': {
            backgroundColor: customIndicatorColor,
          },
          '& .MuiTab-root': {
            color: customTextColor,
            '&.Mui-selected': {
              color: customIndicatorColor,
            },
            '&:hover': {
              color: customIndicatorColor,
              opacity: 0.8,
            },
          },
        }}>
                    <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                    <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
                </Tabs> 
                
                {value == 0? (
                    <VisualizacaoInfoPerfil saindo={saindo} setSaindo={setSaindo} camposVisiveis={camposVisiveis} />
                ): (
                    <EdicaoInfoPerfil saindo={saindo} setSaindo={setSaindo} alteracaoPerfil={alteracaoPerfil} setAlteracaoPerfil={setAlteracaoPerfil} chavesVisiveis={chavesVisiveis} camposVisiveis={camposVisiveis} />
                )}
            </Stack>
        </>
    )
}