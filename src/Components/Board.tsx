// Board which holds tiles
// map category to array of questions

import * as React from 'react'

import { Question, Category } from '../Data';

import {QuestionTile} from './QuestionTile'
import {CategoryTile} from './CategoryTile'

export interface BoardProps {data: Category[]}

export class Board extends React.Component {
    constructor(props: any) {
        super(props)
    }

    render() {
        return (
        <div className="board">
            <div className="categories">
                {this.getCategories().map((c) => {
                    <CategoryTile category={c}></CategoryTile>
                })}
            </div>
            <div className="questions">
                {this.getQuestions().map((q) => {
                    <QuestionTile question={q}> </QuestionTile>
                })}
            </div>
        </div>
        )
    }

    getQuestions(): Question[] {
        return new Array<Question>();
    }

    getCategories(): Category[] {
        return new Array<Category>();
    }
}