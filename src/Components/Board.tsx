import * as React from 'react';

import { Question, Category } from '../Data';

import {QuestionColumn} from './QuestionColumn';
import {CategoryTile} from './CategoryTile';

import './Board.css';

export interface BoardProps {categories: Category[]}

export class Board extends React.Component<BoardProps> {
    constructor(props: BoardProps) {
        super(props);
    }

    categoryTiles = this.props.categories.map((c, n) => 
        <CategoryTile key={'category ' + n} category={c.title.toUpperCase()}></CategoryTile>
    )

    questionColumns = this.getQuestions().map((q, n) => 
        <QuestionColumn key={'column ' + n} questions={q.slice(0,5)}></QuestionColumn>
    )

    render() {
        return (
        <div className="board">
            <div className="categories">
                {this.categoryTiles}
            </div>
            <div className="questions">
                {this.questionColumns}
            </div>
        </div>
        )
    }

    getQuestions(): Question[][] {
        let questions = [];
        for(let c of this.props.categories) {
            questions.push(c.clues);
        }
        // console.log(categories);
        return questions;
    }
}