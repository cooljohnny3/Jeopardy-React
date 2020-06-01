import * as React from 'react';

import { getData, Question, Category } from '../Data';

import {QuestionColumn} from './QuestionColumn';
import {CategoryTile} from './CategoryTile';
import {StatusBar} from './StatusBar';
import {NameEntryModal} from './NameEntryModal';

import './Board.css';

interface BoardState {isLoading: boolean, error: string, name: string, money: number, data: Category[], showNameDialog: boolean, nameEntryError: boolean}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            name: '',
            money: 0,
            data: [],
            showNameDialog: true,
            nameEntryError: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameButtonClick = this.handleNameButtonClick.bind(this);
    }

    componentDidMount() {
        getData().then((d) => {
            this.setState({isLoading: false, data: d});
        }).catch(error => this.setState({error: error.toString(), isLoading: false}));
    }

    render() {
        const {isLoading, error, name, data, money, showNameDialog, nameEntryError} = this.state;

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
            <NameEntryModal 
                show={showNameDialog} 
                nameEntryError={nameEntryError}
                handleClick={this.handleNameButtonClick}
                handleNamechange={this.handleNameChange}
            />
            {categories}
            {questions}
            {!this.state.showNameDialog ? <StatusBar name={name} money={money} />: null}
        </div>
        )

        return (
            error ? 
                <p>{error}</p> : !isLoading ? 
                    board : 
                    <h3>Loading...</h3>
        )
    }

    getQuestions(): Question[][] {
        let questions = [];
        for(let c of this.state.data) {
            questions.push(c.clues);
        }
        return questions;
    }

    handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value}, () => console.log(this.state.name))
    }

    handleNameButtonClick(event: React.FormEvent<HTMLFormElement>) {
        if(this.state.name === '') {
            this.setState({nameEntryError: true});
            event.preventDefault();
        }
            
        else
            this.setState({showNameDialog: false, nameEntryError: false});
    }
}