// Modal box for displaying question

import * as React from 'react'

import Modal from 'react-overlays/Modal';

import './Modal.css';

export interface QuesitonModalProps { 
    show: boolean, 
    answerQuestionError: boolean, 
    quesiton: string, 
    handleAnswer: CallableFunction, 
    handleAnswerChange: CallableFunction 
};

export function QuesitonModal(props: QuesitonModalProps) {
    return <Modal
    className='name-modal'
    show={props.show}
    backdrop={'static'}
>
    <form onSubmit={(e) => props.handleAnswer(e)}>
        <p>{props.quesiton}</p>
        {props.answerQuestionError ? <p style={{color: 'red'}}>Please enter a valid answer</p> : null }
        <input type="text" onChange={(e) => props.handleAnswerChange(e)}/>
        <input type="submit" value="Enter"/>
    </form>
</Modal>
}