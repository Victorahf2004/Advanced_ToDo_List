import React from "react";

export const Task = ({ icone, nomeDaTarefa, nomeDoUsuario}) => {
    return (
        <li>
            <span>
                {icone} {" "}
                <h4>{nomeDaTarefa}</h4> {" "}
                <small>{nomeDoUsuario}</small>
            </span>
        </li>
    )
}