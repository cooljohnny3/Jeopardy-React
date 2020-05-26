import * as React from 'react';

import Modal from 'react-overlays/Modal';

import { getData, Question, Category } from '../Data';

import {NameEntryModal} from './NameEntryModal';
import {QuestionColumn} from './QuestionColumn';
import {CategoryTile} from './CategoryTile';
import {StatusBar} from './StatusBar';

import './Board.css';

interface BoardState {isLoading: boolean, error: string, name: string, money: number, data: Category[], showNameDialog: boolean}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            name: 'default',
            money: 0,
            data: [],
            showNameDialog: true
        };
    }

    componentDidMount() {
        getData().then((d) => {
            this.setState({isLoading: false, data: d});
        }).catch(error => this.setState({error: error.toString(), isLoading: false}));
    }

    render() {
        const {isLoading, error, name, data, money, showNameDialog} = this.state;

        const categories = (
            <div className="categories">
                {data.map((c, n) => 
                <CategoryTile key={'category ' + n} category={c.title.toUpperCase()}></CategoryTile>)}
            </div>
        )

        const questions = (
            <div className="questions">
                {this.getQuestions().map((q, n) => 
                <QuestionColumn key={'column ' + n} questions={q.slice(0,5)}></QuestionColumn>
                )}
            </div>
        )

        const board = (
        <div className="board">
            {/* <NameEntryModal
                showBox={true} 
                onEnter={(enteredName: string) => 
                    {this.setState({showNameDialog: false, name: enteredName})}
                }
            /> */}
            {categories}
            {questions}        
            <StatusBar name={name} money={money} />
        </div>
        )

        return (
            error ? 
                <p>{error}</p> : 
                !isLoading ? 
                    board : 
                    <h3>Loading...</h3>
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