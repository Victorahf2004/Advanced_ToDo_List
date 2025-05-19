import { Meteor } from "meteor/meteor";
import { useParams } from "react-router-dom";
import { TasksCollection } from '/imports/api/TasksCollection';
import React, { useState } from "react";
import { Routes, Route, useNavigate} from "react-router-dom";
import { useTracker, useSubscribe } from "meteor/react-meteor-data";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectSexo = ({ chave, inputs, handleChange }) => {

    console.log(inputs[chave]);
    return (
        <Box sx={{width: "15%"}}>
        <FormControl fullWidth>
            <InputLabel>Sexo</InputLabel>
            <Select value={inputs[chave]} label="Sexo" onChange={(e) => handleChange(e, chave)}>
                <MenuItem value={""}>Select</MenuItem>
                <MenuItem value={"Masculino"}>Masculino</MenuItem>
                <MenuItem value={"Feminino"}>Feminino</MenuItem>
                <MenuItem value={"Outro"}>Outro</MenuItem>
                <MenuItem value={"Prefiro não informar"}>Prefiro não informar</MenuItem>
            </Select>
        </FormControl>
        </Box>
    )
}