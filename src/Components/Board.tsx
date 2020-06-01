import * as React from 'react';

import { getData, Question, Category } from '../Data';

import { QuestionColumn } from './QuestionColumn';
import { CategoryTile } from './CategoryTile';
import { StatusBar } from './StatusBar';
import { NameEntryModal } from './NameEntryModal';
import { QuesitonModal } from './QuestionModal';

import './Board.css';

interface BoardState {
    isLoading: boolean,
    error: string,
    name: string, 
    money: number, 
    data: Category[], 
    showNameDialog: boolean, 
    nameEntryError: boolean, 
    showQuestionModal: boolean, 
    answerQuestionError: boolean, 
    playerAnswer: string, 
    currentQuestion: string, 
    currentAnswer: string, 
    currentValue: number
}

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
            nameEntryError: false,
            showQuestionModal: false,
            answerQuestionError: false,
            playerAnswer: '',
            currentQuestion: '',
            currentAnswer: '',
            currentValue: 0
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameButtonClick = this.handleNameButtonClick.bind(this);
        this.openQuestion = this.openQuestion.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this);
    }

    componentDidMount() {
        getData().then((d) => {
            this.setState({ isLoading: false, data: d });
        }).catch(error => this.setState({ error: error.toString(), isLoading: false }));
    }

    render() {
        const { isLoading, error, name, data, money, showNameDialog, nameEntryError, showQuestionModal, answerQuestionError, currentQuestion } = this.state;

        const categories = (
            <div className="categories">
                {data.map((c, n) =>
                    <CategoryTile key={'category ' + n} category={c.title.toUpperCase()}></CategoryTile>)}
            </div>
        )

        const questions = (
            <div className="questions">
                {this.getQuestions().map((q, n) =>
                    <QuestionColumn key={'column ' + n} questions={q.slice(0, 5)} openQuestion={this.openQuestion}/>
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
                <QuesitonModal
                    show={showQuestionModal}
                    answerQuestionError={answerQuestionError}
                    quesiton={currentQuestion}
                    handleAnswer={this.handleQuestionAnswer}
                    handleAnswerChange={this.handleAnswerChange}
                />
                {categories}
                {questions}
                {!this.state.showNameDialog ? <StatusBar name={name} money={money} /> : null}
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
        for (let c of this.state.data) {
            questions.push(c.clues);
        }
        return questions;
    }

    handleNameChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({ name: event.currentTarget.value })
    }

    handleNameButtonClick(event: React.FormEvent<HTMLFormElement>) {
        if (this.state.name === '') {
            this.setState({ nameEntryError: true });
            event.preventDefault();
        }

        else
            this.setState({ showNameDialog: false, nameEntryError: false });
    }

    openQuestion(question: string, answer: string, value: number) {
        // Pull up modal with question and answer entry
        this.setState({
            showQuestionModal: true,
            currentQuestion: question,
            currentAnswer: answer,
            currentValue: value
        });
    }

    handleAnswerChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            playerAnswer: event.currentTarget.value
        });
    }

    handleQuestionAnswer(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();
        alert("Hello there");
        this.setState({
            showQuestionModal: false,
            currentQuestion: '',
            currentAnswer: '',
            currentValue: 0
        })
    }
}