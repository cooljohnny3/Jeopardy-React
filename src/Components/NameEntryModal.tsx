// Modal box for entrering name

import * as React from 'react'
import Modal from 'react-overlays/Modal';

export interface NameEntryModalProps { showBox: boolean, onEnter: CallableFunction };
export interface NameEntryModalState { name: string };

export class NameEntryModal extends React.Component<NameEntryModalProps, NameEntryModalState> {
    constructor(props: NameEntryModalProps) {
        super(props);
        this.state = {
            name: ''
        }
    }

    handleChange(event: React.FormEvent<HTMLInputElement>) {
        this.setState({name: event.currentTarget.value})
    }

    render() {
        const {showBox, onEnter} = this.props;
        const {name} = this.state;
        return (
            <Modal
                className='name-modal'
                show={showBox} 
                onExit={onEnter(name)}
            >
                <label>
                    <input type="text" value={this.state.name} onChange={this.handleChange}/>
                    <button>Enter</button>
                </label>
            </Modal>
        )
    }
}