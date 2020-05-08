// Tile for a question

import * as React from 'react'

import { Question } from '../Data';

export interface QuestionTileProps { question: Question };

export function QuestionTile(props: QuestionTileProps) {
    return <h1 className="questiontile">"$" + {props.question.value}</h1>
}