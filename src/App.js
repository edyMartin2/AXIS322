import React, { useEffect, useState } from "react";
import * as THREE from "three";
import { LevelOne } from "./Levels";
import { Primary } from "./Objects";
import Welcome from "./UI/views/welcome";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/**
 * Construira la logica del juego
 * consultaremos el nivel ultimo en el que se ah dejado el juego
 */
const GameEngine = () => {
  // Definira el nivel donde se ah quedado
  const [level, setLevel] = useState(0);

  // Arreglo de niveles
  const Levels = [LevelOne];

  // capturamos el nivel
  const L = Levels[level];
  return <L THREE={THREE} World={Primary} changeLevel={setLevel} />;
};

export default React.memo = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome}>
        </Route>
        <Route path={'/play'} component={GameEngine}>
        </Route>
        <Route path="/about">
          <h1>Sobre nosotros</h1>
        </Route>
        <Route path="/contact">
          <h1>Contactanos</h1>
        </Route>
      </Switch>
    </Router>
  );
};
