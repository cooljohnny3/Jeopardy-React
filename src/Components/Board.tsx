// Board which holds tiles

import * as React from 'react'

import { Question, Category } from '../Data';

import {QuestionTile} from './QuestionTile';
import {CategoryTile} from './CategoryTile';

import './Board.css';

export interface BoardProps {questions: Question[]}

export class Board extends React.Component<BoardProps> {
    constructor(props: BoardProps) {
        super(props);
        console.log(props.questions);
    }

    categoryTiles = this.getCategories().map((c, n) => 
        <CategoryTile key={'category' + n} category={c}></CategoryTile>
    )

    questionTiles = this.props.questions.map((q, n) => 
        <QuestionTile key={'question' + n} question={q}></QuestionTile>
    )

    render() {
        return (
            <div className="border">
                <div className="board">
                    <div className="categories">
                        {this.categoryTiles}
                    </div>
                    <div className="questions">
                        {this.questionTiles}
                    </div>
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