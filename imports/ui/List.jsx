import React from "react"
import { Task } from "./Task"

const tasks = [
    {_id: 1, icone: "icone1", nomeTarefa: "Tarefa1", nomeUsuario: "Usuario1"},
    {_id: 2, icone: "icone2", nomeTarefa: "Tarefa2", nomeUsuario: "Usuario2"},
    {_id: 3, icone: "icone3", nomeTarefa: "Tarefa3", nomeUsuario: "Usuario3"},
    {_id: 4, icone: "icone4", nomeTarefa: "Tarefa4", nomeUsuario: "Usuario4"},
]

export const List = () => {
    return (
        <>
        <ol>
            {tasks.map((tasks) => {
                <Task
                key={tasks._id} 
                icone={tasks.icone}
                nomeDaTarefa={tasks.nomeTarefa}
                nomeDoUsuario={tasks.nomeUsuario}/>
            })}
        </ol>
        </>
    )
}