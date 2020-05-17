import * as React from "react";
import * as ReactDOM from "react-dom";

import {Board} from './Components/Board';

import './Index.css';

ReactDOM.render(
    <Board />,
    document.getElementById("app")
);

// TODO: add status for money amount
// TODO: add starting screen to enter name
// TODO: start loading questions in background while user enters name
