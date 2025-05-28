import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    async "tasks.count"(situacao, search){
        console.log("O filtroConcluídas é: " + situacao);
        console.log("O filtroSearch é: " + search);
        const tarefasPublicas = {tipo: "Pública"};
        
        const usuarioAtual = this.userId;
        if (!usuarioAtual) {
            console.log("Sem usuário");
            // return this.ready();
        }
        else {
            console.log("Com usuário");
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

        const total = await TasksCollection.find(query).countAsync();
        return Math.ceil(total / 4);
    },   
    async "tasks.insert"({nomeTask, descricao, tipo, dataEntrega}) {
        const usuario = await Meteor.users.findOneAsync(this.userId);
        const login = usuario?.username || "desconhecido";
        console.log(login)
        return TasksCollection.insertAsync({
            nomeTask: nomeTask,
            descricao: descricao,
            situacao: "Cadastrada",
            tipo: tipo,
            dataEntrega: dataEntrega,
            userName: login,
            userId: this.userId,
            createdAt: new Date(),
        });
    },
    "tasks.update"(taskCreatorId, taskId, novosAtributos) {
        if (taskCreatorId != (this.userId)){
            throw new Meteor.Error("not-authorized", "Só o criador da tarefa pode editá-la!");
        }
        return TasksCollection.updateAsync(taskId, {
            $set: novosAtributos,
        });
    },
    "tasks.delete"(taskId, taskCreatorId) {
        if (taskCreatorId != (this.userId)){
            throw new Meteor.Error("not-authorized", "Só o criador da tarefa pode deletá-la");
        }
        return TasksCollection.removeAsync(taskId);
    }
});