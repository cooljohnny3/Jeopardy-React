// Status to display name of play and current money count

import * as React from 'react'

export interface StatusProps { name: string, money: number };

export function StatusBar(props: StatusProps) {
    return <p className="statusbar">{props.name} : {props.money}</p>
}