import React, { useState, useEffect } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Meteor } from "meteor/meteor";
import { DashBoard } from "./DashBoard";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const TelaBoasVindas = ({setandoSairFalseCallback, saindo, setSaindo, openTasks, erroLogout, setErroLogout}) => {
    const user = useTracker(() => Meteor.user());
    const [openLoading, setOpenLoading] = useState(false);

    useEffect(() => {
        if (saindo) {
            setOpenLoading(false);
            setandoSairFalseCallback();
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
            <DashBoard setandoSairFalseCallback={setandoSairFalseCallback} saindo={saindo} setSaindo={setSaindo} openTasks={openTasks} />
        </Stack>
        </>
    )
}