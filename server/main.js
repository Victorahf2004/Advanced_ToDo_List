import { Meteor } from 'meteor/meteor';
import { Accounts } from "meteor/accounts-base";
import "../imports/api/UserMethods"

const SEED_USERNAME = "meteorite";
const SEED_PASSWORD = "password";

Meteor.startup(async () => {
  await Meteor.users.removeAsync({}); //remove os usuários a cada início de sessão para poupar memória
  if (!(await Accounts.findUserByUsername(SEED_USERNAME))){
    await Accounts.createUser({
      username: SEED_USERNAME,
      password: SEED_PASSWORD,
    });
  }
});
