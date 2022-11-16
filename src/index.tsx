// import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { render } from 'react-dom'
// import * as Sentry from '@sentry/react'
// import { Integrations } from '@sentry/tracing'
//
// import Home from './Home'
// import PokemonProfile from './PokemonProfile'
// import { Demo } from './Demo'
//
// Sentry.init({
//   dsn: 'https://27452c0494544b6ea76bf2263d9a98c2@o901511.ingest.sentry.io/5842217',
//   integrations: [new Integrations.BrowserTracing({
//     tracingOrigins: ['localhost', 'pokeapi.co', /^\//]
//   })],
//   tracesSampleRate: 1.0
// })
//
// const App: React.FC = () => (
//   <Router>
//     <Switch>
//       <Route path="/demo" component={Demo} />
//       <Route path="/p/:name" component={PokemonProfile} />
//       <Route component={Home} />
//     </Switch>
//   </Router>
// )

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'
import { flow, pipe } from 'fp-ts/lib/function';

const mainGrid = UI.Grid.make<'header' | 'body'>(({ slots }) => (
  <div className="main">
    <F.div>
      {slots.header}
    </F.div>
    <F.div>
      {slots.body}
    </F.div>
  </div>
))

const Body = UI.Node.make<{ readonly content: string }, never>(({ state }) => (
  <F.main className="body">{state.pipe(Rx.map(({ content }) => content))}</F.main>
))

export const bodyFlow: Flow.For<typeof Body> = Rx.startWith({ content: 'Hello, World!' })

const Header = UI.Node.make<string>(() => <header className="header">Welcome</header>)

const headerFlow: Flow.For<typeof Header> = Rx.startWith('')

export const Main = UI.Knot.make(mainGrid, { header: Header, body: Body })

const mainFlow: Flow.For<typeof Main> = Flow.composeKnot<typeof Main>({
  header: headerFlow,
  body: bodyFlow
})

const CustomHeader = UI.Node.make<{ readonly user: string }, 'onClick'>(({ state, notify }) => (
  <header className="header">
    <F.span>{state.pipe(Rx.map(({ user }) => `Hello, ${user}`))}</F.span>
    <button onClick={notify('onClick')}>Button</button>
  </header>
))

const customHeaderFlow: Flow.For<typeof CustomHeader> = flow(
  Rx.map(() => ({ user: 'username' })),
  Rx.startWith({ user: 'anonymous' })
)

const PatchedMain = pipe(
  Main,
  UI.patch('header')(() => CustomHeader)
)

const newMainFlow: Flow.For<typeof PatchedMain> = Flow.composeKnot<typeof PatchedMain>({
  header: customHeaderFlow,
  body: bodyFlow
})

const App: React.FC = () => UI.mount(PatchedMain, newMainFlow)

// const patchedMain = pipe(
//   Main,
//   UI.patch('footer')(() => CustomFooter)
// )
//
// export const App: React.FC = () => UI.mount(patchedMain, mainFlow)

ReactDOM.render(<App />, document.getElementById('root'))
