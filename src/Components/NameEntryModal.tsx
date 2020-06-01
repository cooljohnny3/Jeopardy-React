// Modal box for name entry

import * as React from 'react'

import Modal from 'react-overlays/Modal';

import './Modal.css';

export interface NameEntryModalProps { show: boolean, nameEntryError: boolean, handleClick:CallableFunction, handleNamechange: CallableFunction };

export function NameEntryModal(props: NameEntryModalProps) {
    return <Modal
        className='name-modal'
        show={props.show}
        backdrop={'static'}
    >
        <form onSubmit={(e) => props.handleClick(e)}>
            <p>Enter your name:</p>
            {props.nameEntryError ? <p style={{color: 'red'}}>Please enter a valid name</p> : null }
            <input type="text" onChange={(e) => props.handleNamechange(e)}/>
            <input type="submit" value="Enter"/>
        </form>
    </Modal>
}