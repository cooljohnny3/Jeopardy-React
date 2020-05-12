// Tile for a question

import * as React from 'react'

import { Question } from '../Data';

export interface QuestionTileProps { question: Question };

export class QuestionTile extends React.Component<QuestionTileProps> {
    constructor(props: QuestionTileProps) {
        super(props);
    }

    render() { 
        return <div className="tile" onClick={this.handleClick}>{this.props.question.value}</div> 
    }

    handleClick() {
        // display question in new view to be created that is over main board
        // 5 seconds to answer with animation for count down similar to real thing
        // text box to enter answer
        // logic to check if right or not
        // if correct add money else remove
    }
}