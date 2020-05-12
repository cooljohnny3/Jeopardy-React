import * as React from 'react'

import { Question } from '../Data';

import {QuestionTile} from './QuestionTile'

export interface QuestionColumnProps {questions: Question[]}

export class QuestionColumn extends React.Component<QuestionColumnProps> {
    constructor(props: QuestionColumnProps) {
        super(props);
    }

    questionTiles = this.props.questions.map((q, n) => 
        <QuestionTile key={'question ' + n} question={q}></QuestionTile>
    )

    render() {
        return <div className="questioncolumn">{this.questionTiles}</div>
    }
}