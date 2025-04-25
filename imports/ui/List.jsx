import React from "react"
import { Task } from "./Task"

const tasks = [
    {_id: 1, nomeTarefa: "Tarefa1", nomeUsuario: "Usuario1"},
    {_id: 2, nomeTarefa: "Tarefa2", nomeUsuario: "Usuario2"},
    {_id: 3, nomeTarefa: "Tarefa3", nomeUsuario: "Usuario3"},
    {_id: 4, nomeTarefa: "Tarefa4", nomeUsuario: "Usuario4"},
]

export const List = () => {
    return (
        <>
        <ol>
            {tasks.map((task) => (
                <Task
                key={task._id} 
                nomeDaTarefa={task.nomeTarefa}
                nomeDoUsuario={task.nomeUsuario}/>
            ))}
        </ol>
        </>
    )
}