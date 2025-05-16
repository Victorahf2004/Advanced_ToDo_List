import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";

Meteor.methods({
    "users.create"(login, senha) {
        return Accounts.createUser({
            username: login,
            password: senha,
            profile: {
                nome: "",
                email: "",
                data_nasc: "",
                sexo: "",
                empresa_trab: "",
                foto: "",
            },
        });
    },
});