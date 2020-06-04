import * as React from 'react';

import { getData, Question, Category } from '../Data';

import { QuestionColumn } from './QuestionColumn';
import { CategoryTile } from './CategoryTile';
import { StatusBar } from './StatusBar';
import { NameEntryModal } from './NameEntryModal';
import { QuesitonModal } from './QuestionModal';
import { GameEndModal } from './GameEndModal';

import './Board.css';

interface BoardState {
    isLoading: boolean,
    error: string,
    name: string,
    money: number,
    categories: Category[],
    questions: Question[][];
    showNameDialog: boolean,
    nameEntryError: boolean,
    showQuestionModal: boolean,
    answerQuestionError: boolean,
    playerAnswer: string,
    currentQuestion: Question | undefined,
    cluesAnswered: number,
    showGameEndModal: boolean
}

export class Board extends React.Component<{}, BoardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            error: '',
            name: '',
            money: 0,
            categories: [],
            questions: [[]],
            showNameDialog: true,
            nameEntryError: false,
            showQuestionModal: false,
            answerQuestionError: false,
            playerAnswer: '',
            currentQuestion: undefined,
            cluesAnswered: 0,
            showGameEndModal: false
        };

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleNameButtonClick = this.handleNameButtonClick.bind(this);
        this.openQuestion = this.openQuestion.bind(this);
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionAnswer = this.handleQuestionAnswer.bind(this);
        this.startGame = this.startGame.bind(this);
    }

    componentDidMount() {
        this.startGame();
    }

    render() {
        const { isLoading, error, name, categories, questions, money, showNameDialog, nameEntryError, showQuestionModal, answerQuestionError, currentQuestion, showGameEndModal } = this.state;

        const categoryColumns = (
            <div className="categories">
                {categories.map((c, n) =>
                    <CategoryTile key={'category ' + n} category={c.title.toUpperCase()}></CategoryTile>)}
            </div>
        )

        const questionColumns = (
            <div className="questions">
                {questions.map((q, n) =>
                    <QuestionColumn
                        key={'column ' + n}
                        questions={q}
                        openQuestion={this.openQuestion}
                    />
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
                    quesiton={currentQuestion ? currentQuestion.question : 'Error opening current question'}
                    handleAnswer={this.handleQuestionAnswer}
                    handleAnswerChange={this.handleAnswerChange}
                />
                <GameEndModal
                    show={showGameEndModal}
                    handleClick={this.startGame}
                    money={money}
                />
                {categoryColumns}
                {questionColumns}
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

    getQuestions(data: Category[]): Question[][] {
        let questions = [];
        for (let c of data) {
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

    openQuestion(question: Question) {
        // Pull up modal with question and answer entry
        this.setState({
            showQuestionModal: true,
            currentQuestion: question
        });
    }

    handleAnswerChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({
            playerAnswer: event.currentTarget.value
        });
    }

    handleQuestionAnswer(event: React.FormEvent<HTMLInputElement>) {
        event.preventDefault();

        let { playerAnswer, currentQuestion, categories, cluesAnswered } = this.state;

        if (playerAnswer === '') {
            this.setState({ answerQuestionError: true });
        } else {
            if (currentQuestion?.answer.toLowerCase() === this.state.playerAnswer.toLowerCase()) {
                for (let cat of categories) {
                    if (cat.clues.includes(currentQuestion)) {
                        cat.clues[cat.clues.indexOf(currentQuestion)].id = -1;
                        break;
                    }
                }
                this.setState((state) => ({
                    showQuestionModal: false,
                    currentQuestion: undefined,
                    playerAnswer: '',
                    answerQuestionError: false,
                    money: state.money + (state.currentQuestion ? state.currentQuestion.value : 0),
                    cluesAnswered: state.cluesAnswered + 1
                }));
                // Check if all questions answered
                // needs to be one less for whatever reason
                if (cluesAnswered >= 29) {
                    this.setState({
                        showGameEndModal: true
                    })
                }

            } else {
                this.setState((state) => ({
                    showQuestionModal: false,
                    currentQuestion: undefined,
                    playerAnswer: '',
                    answerQuestionError: false,
                    money: state.money - (state.currentQuestion ? state.currentQuestion.value : 0)
                }));
            }
        }
    }

    startGame() {
        if (!this.state.isLoading) {
            this.setState({
                isLoading: true,
                error: '',
                name: '',
                money: 0,
                categories: [],
                questions: [[]],
                showNameDialog: true,
                cluesAnswered: 0,
                showGameEndModal: false
            });
        }

        getData().then((d) => {
            for (let cat of d) {
                if (cat.clues.length > 5) {
                    cat.clues = cat.clues.slice(0, 5);
                }
                for (let i in cat.clues) {
                    cat.clues[i].value = 100 * (parseInt(i) + 1);
                }
            }
            this.setState({ isLoading: false, categories: d, questions: this.getQuestions(d) });
        }).catch(error => this.setState({ error: error.toString(), isLoading: false }));
    }
}