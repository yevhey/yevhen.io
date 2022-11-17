import * as React from 'react'
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'
import { flow } from 'fp-ts/lib/function'

import AttachIcon from './images/Attach.svg'
import './Demo.css'

const mainGrid = UI.Grid.make<'title' | 'textarea' | 'actions'>(({ slots }) => (
    <div className="demo-wrap">
        <F.Fragment>
            {slots.title}
        </F.Fragment>
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
    </div>
))

const Title = UI.Node.make<string>(() => <div className="title">Chat</div>)

export const titleFlow: Flow.For<typeof Title> = Rx.startWith('')

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
        <div className="actions-wrap">
            <AttachIcon className="actions-button" onClick={notify('onAttach')} />
        </div>
    </>
))

export const chatActionsFlow: Flow.For<typeof ChatActions> = flow(
  Rx.map(() => ({
    status: 'File is attached'
  })),
  Rx.startWith({ status: '' })
)

export const Chat = UI.Knot.make(mainGrid, { title: Title, textarea: Textarea, actions: ChatActions })

const chatFlow: Flow.For<typeof Chat> = Flow.composeKnot<typeof Chat>({
  title: titleFlow,
  textarea: textareaFlow,
  actions: chatActionsFlow
})

const InitialChat = UI.mount(Chat, chatFlow)

export const Demo: React.FC = () => React.createElement(() => InitialChat)
