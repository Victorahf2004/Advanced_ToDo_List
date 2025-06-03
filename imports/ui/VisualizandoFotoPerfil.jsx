import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";


export const VisualizandoFotoPerfil = ({ caminhoFoto }) => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const DialogCustom = styled(Dialog) ({
        '& .MuiDialog-paper': {
            minHeight: '40vh',
            minWidth: '60vw',
        },
    })
    return (
        <>
            <ButtonBase>
            <Avatar alt="Foto de Perfil" src={caminhoFoto} onClick={handleOpen}/> 
            </ButtonBase>
            
            <DialogCustom open={open} onClose={handleClose}>
                <Box display={"flex"} justifyContent={"flex-end"}>
                    <IconButton onClick={handleClose}>
                        <CloseIcon fontSize="large"/>
                    </IconButton>
                </Box>
                <DialogContent>
                    <img src={caminhoFoto} alt="Foto de Perfil Ampliada" style={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        }} />
                </DialogContent>
            </DialogCustom>
        </>
    )
}