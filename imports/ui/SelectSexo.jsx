import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export const SelectSexo = ({ chave, inputs, handleChange }) => {

    return (
        <Box sx={{minWidth: "10vw"}}>
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