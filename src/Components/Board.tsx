// Board which holds tiles

import * as React from 'react'

import { Question, Category } from '../Data';

import {QuestionTile} from './QuestionTile'
import {CategoryTile} from './CategoryTile'

export interface BoardProps {questions: Question[]}

export class Board extends React.Component<BoardProps> {
    constructor(props: BoardProps) {
        // console.log(props.questions);
        super(props)
    }

    categoryTiles = this.getCategories().map((c) => 
        <CategoryTile category={c}></CategoryTile>
    )

    questionTiles = this.props.questions.map((q) => 
        <QuestionTile question={q}></QuestionTile>
    )

    render() {
        return (
        <div className="board">
            <div className="categories">
                {this.categoryTiles}
            </div>
            <div className="questions">
                {this.questionTiles}
            </div>
        </div>
        )
    }

    getCategories(): Category[] {
        let categories = [];
        for(let q of this.props.questions) {
            categories.push(q.category);
        }
        // console.log(categories);
        return categories; 
    }
}