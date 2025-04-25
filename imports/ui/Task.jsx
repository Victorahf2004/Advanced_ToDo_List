import React from "react";

export const Task = ({ icone, nomeDaTarefa, nomeDoUsuario}) => {
    return (
        <li>
            <span>
                {icone} {" "}
                <strong>{nomeDaTarefa}</strong> {" "}
                <small>{nomeDoUsuario}</small>
            </span>
        </li>
    )
}