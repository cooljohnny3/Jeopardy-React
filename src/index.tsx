import * as React from "react";
import * as ReactDOM from "react-dom";

import {getData, Category} from './Data';
import {Board} from './Components/Board';

import './Index.css';

getData().then((data: Category[]) => {
    console.log(data);
    ReactDOM.render(
        <Board categories={data}/>,
        document.getElementById("app")
    );
}).catch((e) => console.error(e));

// TODO: add status for money amount
// TODO: add starting screen to enter name
// TODO: start loading questions in background while user enters name
