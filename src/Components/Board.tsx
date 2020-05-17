import * as React from 'react';

import { getData, Question, Category } from '../Data';

import {QuestionColumn} from './QuestionColumn';
import {CategoryTile} from './CategoryTile';

import './Board.css';

interface BoardState {isLoading: boolean, error: string, name: string, score: number, data: Category[]}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            name: '',
            score: 0,
            data: []
        };
    }

    componentDidMount() {
        getData().then((d) => {
            this.setState({isLoading: false, data: d});
        }).catch(error => this.setState({error: error.toString(), isLoading: false}));
    }

    render() {
        const {isLoading, error, name, data, score} = this.state;
        return (
            error ? <p>{error}</p> : 
            !isLoading ? (
                <div className="board">
                    <div className="categories">
                        {this.state.data.map((c, n) => 
                        <CategoryTile key={'category ' + n} category={c.title.toUpperCase()}></CategoryTile>)}
                    </div>
                    <div className="questions">
                        {this.getQuestions().map((q, n) => 
                        <QuestionColumn key={'column ' + n} questions={q.slice(0,5)}></QuestionColumn>
                        )}
                    </div>
                </div>) : (
                    <h3>Loading...</h3>
                )
        )
    }

    getQuestions(): Question[][] {
        let questions = [];
        for(let c of this.state.data) {
            questions.push(c.clues);
        }
        // console.log(categories);
        return questions;
    }
}