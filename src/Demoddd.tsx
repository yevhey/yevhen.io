// import React from 'react';
// import { Link } from 'react-router-dom';
// import * as Rx from 'rxjs/operators'
// import { Observable, pipe } from 'rxjs';
// import { Flow, UI } from '@grammarly/embrace';
// import { F } from '@grammarly/focal';
// import './Demo.css';
//
// import AttachIcon from './images/Attach.svg';
// import mount = UI.mount;
// // import EmojiIcon from './images/EmojiSmile.svg';
// // import SendIcon from './images/Send.svg';
// const counterUI = UI.Knot.make<number, 'plus' | 'minus'>(({ state, notify }) => (
//     <>
//         <F.button onClick={notify('plus')}>+</F.button>
//         {state}
//         <F.button onClick={notify('minus')}>-</F.button>
//     </>
// ));
//
// const counterFlow: Flow.For<typeof counterUI> = (actions: Observable<'plus' | 'minus'>) => {
//     return actions.pipe(
//         Rx.scan((acc, a) => (a === 'plus' ? acc + 1 : acc - 1), 0),
//         Rx.startWith(0)
//     )
// };
//
// const DemoChat = UI.Grid.make<'textarea' | 'actions'>(({ slots }) => (
//     <div className="demo">
//         <div className="demo-body">
//
//         </div>
//         <div className="demo-footer">
//             {slots.textarea}
//             {slots.actions}
//         </div>
//     </div>
// );
//
// const TextAreaComponent = UI.Knot.make<{ value: string }, 'change'>(({ state, notify }) => (
//     <div className="textarea-wrap">
//         <textarea
//             placeholder="Type a message..."
//             value={state.value}
//             onChange={e => notify('change')(e.target.value)}
//         />
//     </div>
// ));
//
// const ActionsComponent = UI.Knot.make<{}, 'attach'>(({ state, notify }) => (
//     <button onClick={notify('attach')}>
//         <AttachIcon />
//     </button>
// ));
//
// export const Chat = UI.Knot.make(DemoChat, { textarea: TextAreaComponent, actions: ActionsComponent })
//
// const chatFlow: Flow.For<typeof Chat> = (actions: Observable<'plus' | 'minus'>) => {
//     return actions.pipe(
//         Rx.scan((acc, a) => (a === 'plus' ? acc + 1 : acc - 1), 0),
//         Rx.startWith(0)
//     )
// };
//
// const ChatApp = UI.mount(Chat, chatFlow);
//
// const Demoddd = () => {
//     return (
//         <>
//             <span className="title">Chat</span>
//             <DemoChat />
//         </>
//     );
// };
//
// const DemoWithoutAttachment = UI.patch(Demoddd, {
//     'AttachIcon': () => UI.Node.empty,
// });
//
// const DemoWithEmojis = () => {
//
// }
//
// export const DemoForUser = pipe(
//     Demoddd,
//     DemoWithoutAttachment,
//     DemoWithEmojis,
// );
