import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { render } from 'react-dom'
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import Home from './Home'
import PokemonProfile from './PokemonProfile'
import { Demo } from './Demo'
import { PatchedDemo } from './PatchedDemo'

Sentry.init({
  dsn: 'https://27452c0494544b6ea76bf2263d9a98c2@o901511.ingest.sentry.io/5842217',
  integrations: [new Integrations.BrowserTracing({
    tracingOrigins: ['localhost', 'pokeapi.co', /^\//]
  })],
  tracesSampleRate: 1.0
})

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path="/demo" component={Demo} />
      <Route path="/patched-demo" component={PatchedDemo} />
      <Route path="/:name" component={PokemonProfile} />
      <Route component={Home} />
    </Switch>
  </Router>
)

render(<App />, document.getElementById('root'))
