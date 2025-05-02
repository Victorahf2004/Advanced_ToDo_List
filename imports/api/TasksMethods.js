import { Meteor } from "meteor/meteor";
import { TasksCollection } from "./TasksCollection";

Meteor.methods({
    async "tasks.insert"(nome) {
        const usuario = await Meteor.users.findOneAsync(this.userId);
        const login = usuario?.username || "desconhecido";
        return TasksCollection.insertAsync({
            nomeTask: nome,
            userName: login,
            userId: this.userId,
            createdAt: new Date(),
        });
    },
});