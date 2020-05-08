import * as React from "react";
import * as ReactDOM from "react-dom";

import {getData} from './Data';
import {Board} from './Components/Board';

ReactDOM.render(
    <Board data={async () => await getData()}/>,
    document.getElementById("example")
);