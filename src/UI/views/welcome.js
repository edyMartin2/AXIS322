import React from "react";
import { Link } from "react-router-dom";

import "../../App.css";
import "../ux/List.css"


const Welcome = ({ changeLevel }) => {
  return (
    <div className="container">
      <div className="center">
        <div className="btn">
          <h1>A.D.O.N.I.S</h1>
        </div>
        <ul className="list">
          <li>
            <Link to={'/play'}>Play</Link>
          </li>
          <li>
            <Link to={"/about"}>About</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Welcome;
