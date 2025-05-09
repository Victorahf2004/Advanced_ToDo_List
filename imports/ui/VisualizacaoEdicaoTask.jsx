import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { TasksCollection } from '/imports/api/TasksCollection';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditNoteIcon from '@mui/icons-material/EditNote';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from '@mui/material/Box';
import { EdicaoTask } from "./EdicaoTask";
import { VisualizacaoTask } from "./VisualizacaoTask";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useParams } from "react-router-dom";

export const VisualizacaoEdicaoTask = ( { alteracaoSucesso, setAlteracaoSucesso }) => {
    const [value, setValue] = useState(0);
    
    let navigate = useNavigate();
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const { taskId } = useParams();
    
    const task = useTracker(() => {
        return TasksCollection.findOne(taskId)
    });

    const handleChange = (e, newValue) => {
        setValue(newValue);
        setAlteracaoSucesso("");
    }

    const getSituacaoTasks = (situacaoTask) => {
        let arrayChips = ["outlined", "outlined", "outlined"]; // array padrão de chips
        
        if (situacaoTask == "Cadastrada") {
            arrayChips[0] = "filled";
        }
        else if (situacaoTask == "Em Andamento") {
            arrayChips[1] = "filled";
        }
        else {
            arrayChips[2] = "filled";
        }
        return arrayChips;
    }

    const chipsVariants = getSituacaoTasks(task.situacao);
    return (
        <>
            <Tabs value={value} onChange={handleChange}>
                <Tab icon={<VisibilityIcon />} label="Visualização" iconPosition="end" />
                <Tab icon={<EditNoteIcon />} label="Edição" iconPosition="end" />
            </Tabs> 
            
            <Box hidden={value !== 0} >
                <VisualizacaoTask chipsVariants={chipsVariants} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>
            </Box>

            <Box hidden={value !== 1} >
                <EdicaoTask chipsVariants={chipsVariants} alteracaoSucesso={alteracaoSucesso} setAlteracaoSucesso={setAlteracaoSucesso}/>
            </Box>
        </>
    )
}