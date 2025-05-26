import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip"
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export const VisualizacaoTask = ({saindo, setSaindo, taskId, camposVisiveis}) => {

    let navigate = useNavigate();
    
    const user = useTracker(() => Meteor.user());
    const [openLoading, setOpenLoading] = useState(false);
    
    const isLoading = useSubscribe("tasks");
    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });

    useEffect(() => {
        if (saindo) {
            setOpenLoading(false);
            setSaindo(false);
        }
    }, [saindo]);

    if (isLoading()){
        return (
            <Backdrop open={openLoading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    return (
            <Stack flexDirection={"column"} width={"80%"}>
                <List sx={{backgroundColor: "white"}}>
                {Object.entries(camposVisiveis).map(([key, label]) => (
                    <React.Fragment key={key}>
                    <ListItem>
                        <ListItemText primary={label} sx={{color: "#0078D7"}}/>
                        <Box display={"flex"} flexDirection={"row"} justifyContent={"flex-end"}>
                            <TextField variant="filled" multiline maxRows={6} value={task[key] instanceof Date ? task[key].toLocaleString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            }) : String(task[key])} />
                        </Box>
                    </ListItem>
                    <Divider />
                    </React.Fragment>
                ))}
                </List>
            </Stack>
        )
}