import { Meteor } from "meteor/meteor"
import React from 'react';
import { TelasLogin } from "./TelasLogin"
import { useTracker, useSubscribe } from "meteor/react-meteor-data"

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const logout = () => Meteor.logout();
  return (
  <div>
    <h1>Welcome to Meteor!</h1>
    {user ? (
    <>
    <div>Usuário Logado</div>
    <button onClick={logout}>Log Out</button>
    </>
    ) : (
      <TelasLogin/>
    )
    }
  </div>
  )
};


