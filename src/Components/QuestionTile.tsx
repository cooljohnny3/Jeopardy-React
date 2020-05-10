// Tile for a question

import * as React from 'react'

import { Question } from '../Data';

export interface QuestionTileProps { question: Question };

export function QuestionTile(props: QuestionTileProps) {
    return <div className="questiontile">{props.question.value}</div>
}