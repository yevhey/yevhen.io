import React, { FormEvent } from 'react';
import * as Rx from 'rxjs/operators'
import { Observable } from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';
import './Demo.css';

import AttachIcon from './images/Attach.svg';
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';

const Textarea = UI.Node.make<string, string>(({ state, notify }) => (
    <F.div>
        <F.textarea
            value={state}
            onChange={e => notify(e.currentTarget.value)}
        />
    </F.div>
));

const textareaFlow: Flow.For<typeof Textarea> = (actions: Observable<string>) => actions.pipe(
    Rx.startWith(''),
    Rx.pluck('asdfsadf'),
);

const ChatActions = UI.Node.make<{}, 'attach'>(({ state, notify }) => (
    <F.button onClick={notify('attach')}>
        <AttachIcon />
    </F.button>
));

const chatActionsFlow: Flow.For<typeof ChatActions> = (actions: Observable<'attach'>) => actions.pipe(
    Rx.tap(d => console.log(d)),
    Rx.scan((acc, a) => {
        console.log(a);
        if (a === 'attach') {
            console.log('attach');
        }
        return acc;
    }, 0),
    Rx.startWith(0)
);

export const DemoForUser = () => UI.mount(Textarea, textareaFlow);
