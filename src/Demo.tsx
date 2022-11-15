import * as React from 'react'
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'
import { Observable } from 'rxjs'
import { pipe } from 'fp-ts/lib/function'

import AttachIcon from './images/Attach.svg'
import './Demo.css'

const mainGrid = UI.Grid.make<'textarea' | 'actions'>(({ slots }) => (
  <F.div className="main">
      <F.div>
        {slots.textarea}
      </F.div>
      <F.div>
        {slots.actions}
      </F.div>
  </F.div>
))

const Textarea = UI.Node.make<string, string>(({ state, notify }) => (
    <F.div className="textarea-wrap">
        <F.textarea
            placeholder="Type a message..."
            value={state}
            onChange={e => notify(e.currentTarget.value)()}
        />
    </F.div>
))

const textareaFlow: Flow.For<typeof Textarea> = Rx.startWith('')

const ChatActions = UI.Node.make<{}, 'attach'>(({ state, notify }) => (
    <F.button onClick={notify('attach')}>
        <AttachIcon />
    </F.button>
))

const chatActionsFlow: Flow.For<typeof ChatActions> = (actions: Observable<'attach'>) => actions.pipe(
  Rx.startWith(''),
  Rx.map(action => {
    console.log(action)
    return action
  })
)

export const Chat = UI.Knot.make(mainGrid, { textarea: Textarea, actions: ChatActions })

const mainFlow: Flow.For<typeof Chat> = Flow.composeKnot<typeof Chat>({
  textarea: textareaFlow,
  actions: chatActionsFlow
})

const InitialChat = UI.mount(Chat, mainFlow)
// const ChatWithEmojis = UI.patch('textarea')(() => UI.Node.empty)

const ChatWithExperiments = pipe(
  InitialChat
  // ChatWithEmojis
)

export const Demo: React.FC = () => React.createElement(() => ChatWithExperiments)
