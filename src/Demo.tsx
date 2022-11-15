import * as React from 'react'
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'
import { Observable } from 'rxjs'
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

const ChatActions = UI.Node.make<{}, 'attach'>(({ state, notify }) => (
    <F.button onClick={notify('attach')}>
        <AttachIcon />
    </F.button>
))

const chatActionsFlow: Flow.For<typeof ChatActions> = (actions: Observable<'attach'>) => actions.pipe(
  Rx.map(d => {
    console.log(d)
    return d
  }))

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

export const Main = UI.Knot.make(mainGrid, { textarea: Textarea, actions: ChatActions })

const mainFlow: Flow.For<typeof Main> = Flow.composeKnot<typeof Main>({
  textarea: textareaFlow,
  actions: chatActionsFlow
})

const App: React.FC = () => UI.mount(Main, mainFlow)

export const Demo: React.FC = () => (
    <>
        <App />
    </>
)
