import React, { useEffect, useState } from "react";
import * as THREE from 'three';
import { LevelOne } from "./Levels";
import { Primary } from "./Objects";

/**
 * Construira la logica del juego
 * consultaremos el nivel ultimo en el que se ah dejado el juego
 */
const GameEngine = () => {

  // Definira el nivel donde se ah quedado
  const [level, setLevel] = useState(0)

  // Arreglo de niveles
  const Levels = [LevelOne]

  // capturamos el nivel
  const L = Levels[level]
  return (<L THREE={THREE} World={Primary}/>)

}


export default React.memo = () => {


  return (<GameEngine />);
}

