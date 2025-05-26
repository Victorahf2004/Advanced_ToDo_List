import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { DashBoard } from "./DashBoard";
import Button from "@mui/material/Button";
import { MenuDrawer } from "./MenuDrawer";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from "@mui/material/Avatar";
import ButtonBase from "@mui/material/ButtonBase";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const TelaBoasVindas = ({saindo, setSaindo, openTasks, erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    const [openLoading, setOpenLoading] = useState(false);

    useEffect(() => {
        if (saindo) {
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

    return (
        <>
        {erroLogout && (
                    <Alert severity="error" onClose={() => {setErroLogout(false);}} > Erro no Logout</Alert>
                )}
        <Stack direction={"column"} spacing={8} justifyContent={"center"} alignItems={"center"}>
            <Typography variant="h3" sx={{color: "white", display: "flex", justifyContent:"center", alignItems: "center", overflow: "hidden"}} gutterBottom>
                Seja Bem-Vindo, {user.username}!!!
            </Typography>
            <DashBoard saindo={saindo} setSaindo={setSaindo} openTasks={openTasks} />
        </Stack>
        </>
    )
}