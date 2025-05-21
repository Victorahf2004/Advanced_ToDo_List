import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    async "tasks.insert"({nomeTask, descricao, tipo}) {
        const usuario = await Meteor.users.findOneAsync(this.userId);
        const login = usuario?.username || "desconhecido";
        console.log(login)
        return TasksCollection.insertAsync({
            nomeTask: nomeTask,
            descricao: descricao,
            situacao: "Cadastrada",
            tipo: tipo,
            dataEntrega: "",
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