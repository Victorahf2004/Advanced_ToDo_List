import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import { TasksCollection } from "/imports/api/TasksCollection"
import "../imports/api/UserMethods";
import "../imports/api/TasksMethods";
import "../imports/api/TasksPublications";

const insertTask = (taskName, user) => 
  TasksCollection.insertAsync({
    nomeTask: taskName,
    descricao: "Descrição",
    situacao: "Cadastrada",
    tipo: "Pública",
    dataEntrega: new Date("2025-05-21T14:30"),
    userName: user.username,
    userId: user._id,
    createdAt: new Date(), 
  })
const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "123";

Meteor.startup(async () => {
  await Meteor.users.removeAsync({}); //remove os usuários a cada início de sessão para poupar memória
  await TasksCollection.removeAsync({}); //remove as tarefas a cada início de sessão para poupar memória
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))){
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
      profile: {
                nome: "",
                email: "",
                data_nasc: "",
                sexo: "",
                empresa_trab: "",
                foto: "",
            },
    });
  }

  const user1 = await Accounts.findUserByUsername(SEED_USERNAME);
  if ((await TasksCollection.find().countAsync()) == 0) {
    [
      {nomeTask: "Tarefa1"},
      {nomeTask: "Tarefa2"},
      {nomeTask: "Tarefa3"},
      {nomeTask: "Tarefa4"},
  ].forEach(({nomeTask}) => insertTask(nomeTask, user1));
  }
});
