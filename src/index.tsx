import * as React from "react";
import * as ReactDOM from "react-dom";

import {getData} from './Data';
import {Board} from './Components/Board';

getData().then((questionData) => {
    ReactDOM.render(
        <Board questions={questionData}/>,
        document.getElementById("example")
    );
});