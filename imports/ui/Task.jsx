import React from "react";

export const Task = ({ nomeDaTarefa, nomeDoUsuario}) => {
    return (
        <li>
            <span>
                <img src="/logoTarefa.png" alt="Logo de Tarefas" /> {" "}
                <strong>{nomeDaTarefa}</strong> {" "}
                <small>{nomeDoUsuario}</small>
            </span>
        </li>
    )
}