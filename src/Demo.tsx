import React from 'react';
import * as Rx from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';
import './Demo.css';

import AttachIcon from './images/Attach.svg';
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';
const counterUI = UI.Node.make<number, 'plus' | 'minus'>(({ state, notify }) => (
    <>
        <F.button onClick={notify('plus')}>+</F.button>
        {state}
        <F.button onClick={notify('minus')}>-</F.button>
    </>
));

const counterFlow: Flow.For<typeof counterUI> = (actions: Observable<'plus' | 'minus'>) => {
    return actions.pipe(
        Rx.scan((acc, a) => (a === 'plus' ? acc + 1 : acc - 1), 0),
        Rx.startWith(0)
    )
};

export const Demo = () => {
    return (
        <>
            <span className="demo-title">Chat</span>
            <div className="demo-wrap">
                <AttachIcon />
            </div>
        </>
    );
};
