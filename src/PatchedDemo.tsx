import * as React from 'react'
import * as Rx from 'rxjs/operators'
import { Flow, UI } from '@grammarly/embrace'
import { flow, pipe } from 'fp-ts/lib/function'

import AttachIcon from './images/Attach.svg'
import EmojiIcon from './images/Emoji.svg'
import './Demo.css'

import { Chat, textareaFlow, titleFlow } from './Demo'

const NewTitle = UI.Node.make(() => <div className="title">Patched Chat</div>)

const ChatActionsWithEmojis = UI.Node.make<{}, 'attach' | 'emoji'>(({ state, notify }) => (
    <div className="actions-wrap">
        <AttachIcon className="actions-button" onClick={notify('attach')} />
        <EmojiIcon className="actions-button" onClick={notify('emoji')} />
    </div>
))

const chatActionsFlowWithEmojis: Flow.For<typeof ChatActionsWithEmojis> = flow(
  Rx.map(action => {
    if (action === 'emoji') {
      alert('🥳🥳🥳🥳🥳')
    } else if (action === 'attach') {
      console.log('Attached')
    }
    return action
  }),
  Rx.startWith('')
)

const PatchedChat = pipe(
  Chat,
  UI.patch('title')(() => NewTitle),
  UI.patch('actions')(() => ChatActionsWithEmojis)
)

const newMainFlow: Flow.For<typeof PatchedChat> = Flow.composeKnot<typeof PatchedChat>({
  title: titleFlow,
  textarea: textareaFlow,
  actions: chatActionsFlowWithEmojis
})

const NewChat = UI.mount(PatchedChat, newMainFlow)

export const PatchedDemo: React.FC = () => React.createElement(() => NewChat)
