import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection"

Meteor.publish("tasksLista", function (situacao, search, paginaAtual) {
    const itensPorPagina = 4;
    const tarefasPublicas = {tipo: "Pública"};
    
    const usuarioAtual = this.userId;
    if (!usuarioAtual) {
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

    if (search != ""){
        let resultadosPesquisa = {nomeTask: { $regex: search, $options: "i"}};
        query = { $and: [query, resultadosPesquisa]};
    }

    return TasksCollection.find(query, { skip: (paginaAtual - 1) * itensPorPagina, limit: itensPorPagina});
});

Meteor.publish("tasksSemRestricao", function () {
    const tarefasPublicas = {tipo: "Pública"};
    
    const usuarioAtual = this.userId;
    if (!usuarioAtual) {

        return this.ready();
    }
    const pertencerAoUsuarioAtual = {userId: usuarioAtual};

    const serPrivada = {tipo: "Pessoal"};
    const tarefasPrivadasDoUsuarioLogado = { $and: [pertencerAoUsuarioAtual, serPrivada] };
    
    const querySemOlharSituacao = { $or: [tarefasPublicas, tarefasPrivadasDoUsuarioLogado]}

    return TasksCollection.find(querySemOlharSituacao);
});