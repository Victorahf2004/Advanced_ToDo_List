import { Meteor } from "meteor/meteor";
import React, {useState, useEffect} from 'react';
import { Routes, Route, useNavigate, useLocation} from "react-router-dom";
import { TelasLogado } from "./TelasLogado";
import { TelasLogin } from "./TelasLogin";
import { useTracker } from "meteor/react-meteor-data";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const isLoggedIn = !!user;
  const loggingIn = Meteor.loggingIn()
  let navigate = useNavigate();
  const location = useLocation();
  const [alertOpen, setAlertOpen] = useState(false);

  useEffect(() => {
    if (!loggingIn && !isLoggedIn && location.pathname.startsWith("/Logado")) {
      setAlertOpen(true);
    }
  }, [isLoggedIn]);

  const voltarPraTelaDeLogin = () => {
    navigate("/");
    setAlertOpen(false);
  }
  
  return (
    <>
    {alertOpen && (
      <>
      <Alert severity="error" onClose={voltarPraTelaDeLogin} >
        Faça Login para poder acessar o app!
      </Alert>
      <Button variant="contained" onClick={voltarPraTelaDeLogin}>Fazer Login</Button>
      </>
    )}
    {!alertOpen && (
      <Routes>
        <Route path="/*" element={<TelasLogin />} />
        <Route path="/Logado/*" element={<TelasLogado />} />
      </Routes>
      )
    }
    </>
    );
};


