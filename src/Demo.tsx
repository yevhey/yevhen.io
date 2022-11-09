import React from 'react';
import { Link } from 'react-router-dom';
import * as Rx from 'rxjs/operators'
import { Observable, pipe } from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';
import './Demo.css';

import AttachIcon from './images/Attach.svg';
import mount = UI.mount;
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';

const Button = UI.Node.make<number, 'click'>(({ state, notify }) => (
    <F.div>
        <F.button onClick={notify('click')}>{state}</F.button>
        d
    </F.div>
))

const counterFlow: Flow.For<typeof Button> = (actions: Observable<'click'>) => {
    return actions.pipe(
        Rx.scan((acc, a) => (a === 'click' ? acc + 1 : acc - 1), 0),
        Rx.startWith(0)
    )
};

export const DemoForUser = () => UI.mount(Button, counterFlow);