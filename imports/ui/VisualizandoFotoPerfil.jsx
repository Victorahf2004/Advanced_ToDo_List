import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from "@mui/material/Button";
import ButtonBase from '@mui/material/ButtonBase';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export const VisualizandoFotoPerfil = ({ caminhoFoto }) => {
    const [open, setOpen] = useState(false);
    
    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <>
            <ButtonBase>
            <Avatar alt="Foto de Perfil" src={caminhoFoto} onClick={handleOpen}/> 
            </ButtonBase>

            <Dialog open={open} onClose={handleClose} fullScreen>
                <DialogTitle>Foto de Perfil ampliada</DialogTitle>
                <DialogContent>
                    <img src={caminhoFoto} alt="Foto de Perfil Ampliada" style={{
                        width: '100%',
                        height: 'auto',
                        maxHeight: '70vh', // Limita a altura para não exceder a tela
                        objectFit: 'contain', // Mantém a proporção da imagem
                        }} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Fechar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}