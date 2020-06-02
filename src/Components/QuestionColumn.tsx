import * as React from 'react'

import { Question } from '../Data';

import {QuestionTile} from './QuestionTile'
import {BlankQuestionTile} from './BlankQuestionTile'

export interface QuestionColumnProps {
    questions: Question[], 
    openQuestion: CallableFunction
}

export function QuestionColumn(props: QuestionColumnProps) {
    let questionTiles = props.questions.map((q, n) => 
        q.id !== -1 ? 
            <QuestionTile 
                key={'question ' + n} 
                question={q} 
                openQuestion={props.openQuestion}
            /> :
            <BlankQuestionTile key={'question ' + n} />
    )

    return <div className="questioncolumn">{questionTiles}</div>
}