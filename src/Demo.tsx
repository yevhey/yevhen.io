import React, {FC, FormEvent, ReactNode} from 'react'
import * as Rx from 'rxjs/operators'
import { pipe } from 'fp-ts/lib/function'
import { EMPTY, Observable } from 'rxjs'
import { Flow, UI } from '@grammarly/embrace'
import { F } from '@grammarly/focal'
import './Demo.css'

import AttachIcon from './images/Attach.svg';
// import EmojiIcon from './images/EmojiSmile.svg';
// import SendIcon from './images/Send.svg';

const Textarea = UI.Node.make<string, string>(({ state, notify }) => (
    <F.div className="textarea-wrap">
        <F.textarea
            placeholder="Type a message..."
            value={state}
            onChange={e => notify(e.currentTarget.value)()}
        />
    </F.div>
))

const textareaFlow: Flow.For<typeof Textarea> = Rx.startWith('');

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

export const TextAreaComponent = () => UI.mount(Textarea, textareaFlow);
export const ActionsComponent = () => UI.mount(ChatActions, chatActionsFlow);

const DemoChat = UI.Node.make<'dd' | 'ddd'>(({ state }) => (
    <div className="demo">
        <div className="demo-body" />
        <div className="demo-footer">
            {state.dd}
            {state.ddd}
        </div>
    </div>
))

export const Chat = UI.Knot.make(DemoChat, { dd: TextAreaComponent, ddd: ActionsComponent })

const chatFlow: Flow.For<typeof Chat> = Flow.composeKnot<typeof Chat>({
  dd: textareaFlow,
  ddd: chatActionsFlow,
})

export const DemoForUser = () => UI.mount(Chat, chatFlow)

// const ChatWithoutAttachment = pipe(
//     Chat,
//     UI.patch('actions')(() => UI.node.empty),
// );
//
// const ChatWithEmojis = () => {

}

// const appGrid = UI.Grid.make<'header' | 'body'>(({ slots }) => (
//   <div>
//       <div>
//         {/* @ts-expect-error */}
//         {slots.header}
//       </div>
//       <div>
//         {/* @ts-expect-error */}
//         {slots.body}
//       </div>
//   </div>
// ))
//
// const headerd = UI.Grid.make<'nav'>(({ slots }) => (
//   <F.div>
//       <div>
//         Welcome
//       </div>
//       <div>
//         {/* @ts-expect-error */}
//         {slots.nav}
//       </div>
//   </F.div>
// ))
//
// const buttonNav = UI.Node.make<never, 'navClick'>(({ notify }) => (
//   <button onClick={notify('navClick')}>Navigate</button>
// ))
//
// const body = UI.Node.make<string, never>(({ state }) => <F.div>{state}</F.div>)
//
// const header = UI.Knot.make(headerd, { nav: buttonNav })
//
// const app = UI.Knot.make(appGrid, {
//   header,
//   body
// })
//
// const aNav = UI.Node.make<never, 'navClick'>(({ notify }) => (
//   <a onClick={notify('navClick')}>Navigate</a>
// ))
//
// export const DemoForUser = pipe(
//   app
//   UI.patch('header', 'nav')(() => aNav)
//   ChatWithoutAttachment,
//   ChatWithEmojis,
// )
