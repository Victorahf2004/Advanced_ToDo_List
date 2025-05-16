import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection"

Meteor.publish("tasks", function () {
    const tarefasPublicas = {tipo: "Pública"};
    
    const usuarioAtual = this.userId;
    if (!usuarioAtual) {
        console.log("Sem usuário");
        return this.ready();
    }
    const pertencerAoUsuarioAtual = {userId: usuarioAtual};

    const serPrivada = {tipo: "Pessoal"};
    const tarefasPrivadasDoUsuarioLogado = { $and: [pertencerAoUsuarioAtual, serPrivada] };
    
    const query = { $or: [tarefasPublicas, tarefasPrivadasDoUsuarioLogado]}
    
    return TasksCollection.find(query);
});