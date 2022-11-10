import React, {FormEvent, ReactNode} from 'react';
import * as Rx from 'rxjs/operators'
import {Observable, pipe} from 'rxjs';
import { Flow, UI } from '@grammarly/embrace';
import { F } from '@grammarly/focal';
import './Demo.css';

import AttachIcon from './images/Attach.svg';
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';

const Textarea = UI.Node.make<string, FormEvent<HTMLTextAreaElement>>(({ state, notify }) => (
    <F.div className="textarea-wrap">
        <F.textarea
            placeholder="Type a message..."
            value={state}
            onChange={notify}
        />
    </F.div>
));

const textareaFlow: Flow.For<typeof Textarea> = (actions: Observable<FormEvent<HTMLTextAreaElement>>) => actions.pipe(
    Rx.startWith(''),
    Rx.pluck('target', 'value'),
);

const ChatActions = UI.Node.make<{}, 'attach'>(({ state, notify }) => (
    <F.button onClick={notify('attach')}>
        <AttachIcon />
    </F.button>
));

const chatActionsFlow: Flow.For<typeof ChatActions> = (actions: Observable<'attach'>) => actions.pipe(
    Rx.tap(d => {
        console.log(d);
    }),
);

export const TextAreaComponent: Observable<ReactNode> = UI.mount(Textarea, textareaFlow);
export const ActionsComponent = () => UI.mount(ChatActions, chatActionsFlow);


const DemoChat = UI.Node.make<'textarea' | 'actions'>(({ state }) => (
    <div className="demo">
        <div className="demo-body" />
        <div className="demo-footer">
            {state}
        </div>
    </div>
);

export const Chat = UI.Knot.make(DemoChat, { textarea: TextAreaComponent, actions: ActionsComponent })

const ChatWithoutAttachment = pipe(
    Chat,
    UI.patch('actions')(() => UI.node.empty),
);

const ChatWithEmojis = () => {

}

export const DemoForUser = pipe(
    Chat,
    ChatWithoutAttachment,
    ChatWithEmojis,
);
