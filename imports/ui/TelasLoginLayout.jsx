import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const TelasLoginLayout = () => {
    return (
        <Box sx={{background: "linear-gradient(135deg, #6f6dfb, #00e4d0)",
 display: "flex", flexDirection: "column", height: "100vh", width: "100vw", 
        justifyContent: "center", alignItems:"center"}}>
            <Outlet />
        </Box>
    )
}