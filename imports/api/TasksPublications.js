import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection"

Meteor.publish("tasksLista", function (situacao) {
    const tarefasPublicas = {tipo: "Pública"};
    
    const usuarioAtual = this.userId;
    if (!usuarioAtual) {
        console.log("Sem usuário");
        return this.ready();
    }
    const pertencerAoUsuarioAtual = {userId: usuarioAtual};

    const serPrivada = {tipo: "Pessoal"};
    const tarefasPrivadasDoUsuarioLogado = { $and: [pertencerAoUsuarioAtual, serPrivada] };
    
    const querySemOlharSituacao = { $or: [tarefasPublicas, tarefasPrivadasDoUsuarioLogado]}
    let query = querySemOlharSituacao;
    if (situacao == false){
        let semConcluidas = {situacao: { $ne: "Concluída"}};
        query = { $and: [querySemOlharSituacao, semConcluidas]};
    }

    return TasksCollection.find(query);
});

Meteor.publish("tasksSemRestricao", function () {
    const tarefasPublicas = {tipo: "Pública"};
    
    const usuarioAtual = this.userId;
    if (!usuarioAtual) {
        console.log("Sem usuário");
        return this.ready();
    }
    const pertencerAoUsuarioAtual = {userId: usuarioAtual};

    const serPrivada = {tipo: "Pessoal"};
    const tarefasPrivadasDoUsuarioLogado = { $and: [pertencerAoUsuarioAtual, serPrivada] };
    
    const querySemOlharSituacao = { $or: [tarefasPublicas, tarefasPrivadasDoUsuarioLogado]}

    return TasksCollection.find(querySemOlharSituacao);
});