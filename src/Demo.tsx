import * as React from 'react'
import { Link } from 'react-router-dom';
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'
import { flow } from 'fp-ts/lib/function'

import AttachIcon from './images/Attach.svg'
import './Demo.css'

const mainGrid = UI.Grid.make<'textarea' | 'actions'>(({ slots }) => (
    <>
        <Link to="/">&lt; Back</Link>
        <div className="title">Chat</div>
        <div className="demo">
            <div className="demo-body" />
            <F.div className="demo-footer">
                <F.Fragment>
                    {slots.textarea}
                </F.Fragment>
                <F.Fragment>
                    {slots.actions}
                </F.Fragment>
            </F.div>
        </div>
    </>
))

const Textarea = UI.Node.make<string, string>(({ state, notify }) => (
    <div className="textarea-wrap">
        <F.textarea
            placeholder="Type a message..."
            value={state}
            onChange={e => notify(e.currentTarget.value)()}
        />
    </div>
))

export const textareaFlow: Flow.For<typeof Textarea> = Rx.startWith('')

const ChatActions = UI.Node.make<{ readonly status: string }, 'onAttach'>(({ state, notify }) => (
    <>
        <F.div className="actions-info">{state.pipe(Rx.map(({ status }) => status))}</F.div>
        <AttachIcon className="actions-button" onClick={notify('onAttach')} />
    </>
))

export const chatActionsFlow: Flow.For<typeof ChatActions> = flow(
  Rx.map(() => ({
    status: 'File is attached'
  })),
  Rx.startWith({ status: '' })
)

export const Chat = UI.Knot.make(mainGrid, { textarea: Textarea, actions: ChatActions })

const chatFlow: Flow.For<typeof Chat> = Flow.composeKnot<typeof Chat>({
  textarea: textareaFlow,
  actions: chatActionsFlow
})

const InitialChat = UI.mount(Chat, chatFlow)

export const Demo: React.FC = () => React.createElement(() => InitialChat)
