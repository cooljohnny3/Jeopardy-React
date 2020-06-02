// Tile for a question

import * as React from 'react'

import { Question } from '../Data';

export interface QuestionTileProps { 
    question: Question, 
    openQuestion: CallableFunction 
};

export function QuestionTile(props: QuestionTileProps) {
    let value = props.question.value;
    if (!value)
        return <div className="questiontile">N/A</div>
    else
        return <div className="questiontile" onClick={() => props.openQuestion(props.question)}>{props.question.value}</div>
}