import React from "react";
import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";

export const TelasLoginLayout = () => {
    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100vh", width: "100vw", 
        justifyContent: "center", alignItems:"center"}}>
            <Outlet />
        </Box>
    )
}