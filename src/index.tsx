// import React from 'react'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
// import { render } from 'react-dom'
// import * as Sentry from '@sentry/react'
// import { Integrations } from '@sentry/tracing'
//
// import Home from './Home'
// import PokemonProfile from './PokemonProfile'
// import { DemoForUser } from './Demo'
//
// Sentry.init({
//   dsn: 'https://27452c0494544b6ea76bf2263d9a98c2@o901511.ingest.sentry.io/5842217',
//   integrations: [new Integrations.BrowserTracing({
//     tracingOrigins: ['localhost', 'pokeapi.co', /^\//]
//   })],
//   tracesSampleRate: 1.0
// })
//
// const App = () => (
//   <Router>
//     <Switch>
//       <Route path="/demo" component={() => <DemoForUser />} />
//       <Route path="/p/:name" component={PokemonProfile} />
//       <Route component={Home} />
//     </Switch>
//   </Router>
// )
// console.log(App)
// console.log(DemoForUser)
//
// render(<DemoForUser />, document.getElementById('app'))

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { EMPTY } from 'rxjs'
import * as Rx from 'rxjs/operators'
import { F } from '@grammarly/focal'
import { Flow, UI } from '@grammarly/embrace'

const mainGrid = UI.Grid.make<'header' | 'body'>(({ slots }) => (
  <F.div className="main">
    <F.div>
        {slots.header}
    </F.div>
    <F.div>
        {slots.body}
    </F.div>
  </F.div>
))

const Body = UI.Node.make<{ readonly content: string }, never>(({ state }) => (
  <F.main className="body">
    {state.pipe(Rx.map(({ content }) => content))}
  </F.main>
))

export const bodyFlow: Flow.For<typeof Body> = Rx.startWith({ content: 'Hello, World!' })

const Header = UI.Node.make(() => <header className="header">Welcome</header>)

export const Main = UI.Knot.make(mainGrid, { header: Header, body: Body })

const mainFlow: Flow.For<typeof Main> = Flow.composeKnot<typeof Main>({
  header: () => EMPTY,
  body: bodyFlow
})

const App: React.FC = () => UI.mount(Main, mainFlow)

ReactDOM.render(<App />, document.getElementById('root'))
