import React from "react";
import { MenuDrawer } from "./MenuDrawer";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const TelasLogadoLayout = ({setandoSairFalseCallback, openPerfil, openTasks, openHome, logout, saindo, setSaindo, erroLogout, setErroLogout}) => {
    return (
        <Box sx={{background: "linear-gradient(135deg, #6f6dfb, #00e4d0)", display: "flex", flexDirection: "column", height: "100vh", width: "100vw", 
        }}>
            <MenuDrawer setandoSairFalseCallback={setandoSairFalseCallback} openPerfil={openPerfil} openTasks={openTasks} openHome={openHome} logout={logout} saindo={saindo} setSaindo={setSaindo} erroLogout={erroLogout} setErroLogout={setErroLogout}/>
            <Outlet />
        </Box>
    )
}