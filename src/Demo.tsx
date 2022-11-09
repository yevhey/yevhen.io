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

const Textarea = UI.Node.make<string, 'change'>(({ state, notify }) => (
    <F.div>
        <F.textarea
            value={state}
            onChange={() => notify('change')}
        />
    </F.div>
));

const textareaFlow: Flow.For<typeof Textarea> = (actions: Observable<'change'>) => actions.pipe(
    Rx.map(value => value),
    Rx.startWith('')
);

const ChatActions = UI.Node.make<{}, 'attach'>(({ state, notify }) => (
    <F.button onClick={notify('attach')}>
        <AttachIcon />
    </F.button>
));

const chatActionsFlow: Flow.For<typeof ChatActions> = (actions: Observable<'attach'>) => {
    return actions.pipe(
        Rx.startWith({})
    );
};

export const DemoForUser = () => UI.mount(Textarea, textareaFlow);
