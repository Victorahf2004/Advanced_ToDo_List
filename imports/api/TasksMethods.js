import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    async "tasks.insert"(nome) {
        const usuario = await Meteor.users.findOneAsync(this.userId);
        const login = usuario?.username || "desconhecido";
        return TasksCollection.insertAsync({
            nomeTask: nome,
            descricao: "Descrição",
            situacao: "Cadastrada",
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