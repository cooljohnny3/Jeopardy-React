// Status to display name of player and current money count

import * as React from 'react'

export interface StatusProps { name: string, money: number };

export function StatusBar(props: StatusProps) {
    return <p className="statusbar">{props.name} : <span style={{color: (props.money < 0) ?'red' : 'yellow'}}>{props.money}</span></p>
}