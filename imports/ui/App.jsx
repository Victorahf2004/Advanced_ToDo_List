import { Meteor } from "meteor/meteor"
import React from 'react';
import { Routes, Route} from "react-router-dom";
import { TelasLogado } from "./TelasLogado"
import { TelasLogin } from "./TelasLogin"
import { useTracker } from "meteor/react-meteor-data"

export const App = () => {
  const user = useTracker(() => Meteor.user());
  return (
    <>
    <Routes>
      <Route path="/*" element={<TelasLogin />} />
      <Route path="/Logado/*" element={<TelasLogado />} />
    </Routes>
    </>
    );
};


