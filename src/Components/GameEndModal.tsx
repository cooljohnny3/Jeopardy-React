// Modal box for game end

import * as React from 'react'

import Modal from 'react-overlays/Modal';

import './Modal.css';

export interface GameEndModalProps { show: boolean, handleClick:CallableFunction, money: number };

export function GameEndModal(props: GameEndModalProps) {
    return <Modal
        className='modal'
        show={props.show}
        backdrop={'static'}
    >
        <div>
            {props.money > 0 ?
            <p>Good job, you earned ${props.money}</p>:
            <p>Oh no you're in the red. Better luck next time.</p>}
            <button onClick={()=> props.handleClick()}>Restart</button>
        </div>
    </Modal>
}