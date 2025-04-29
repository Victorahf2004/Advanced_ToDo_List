import React from "react"
import { useTracker, useSubscribe } from 'meteor/react-meteor-data'; 
import { Task } from "./Task"
import { TasksCollection } from '/imports/api/TasksCollection';
import { Meteor } from "meteor/meteor";
// const tasks = [
//     {_id: 1, nomeTarefa: "Tarefa1", nomeUsuario: "Usuario1"},
//     {_id: 2, nomeTarefa: "Tarefa2", nomeUsuario: "Usuario2"},
//     {_id: 3, nomeTarefa: "Tarefa3", nomeUsuario: "Usuario3"},
//     {_id: 4, nomeTarefa: "Tarefa4", nomeUsuario: "Usuario4"},
// ]

export const List = () => {
    const user = useTracker(() => Meteor.user());
    const isLoading = useSubscribe("tasks");
    const tasks = useTracker(() => {
        if (!user) {
            console.log("Caiu aqui 1");
            return [];
        }
        else {
            console.log("Caiu aqui 2");
            return TasksCollection.find({}, { sort: {createdAt: -1} }).fetch();
        }
      });
    
    if (isLoading()){
        return <div>Loading...</div>
    }
    return (
        <>
        <ol>
            {tasks.map((task) => (
                <Task
                key={task._id} 
                nomeDaTarefa={task.nomeTask}
                nomeDoUsuario={task.userName}/>
            ))}
        </ol>
        </>
    )
}