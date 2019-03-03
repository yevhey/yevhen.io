import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { render } from 'react-dom';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading,
});

const Pokemon = Loadable({
  loader: () => import('./PokemonProfile'),
  loading: Loading,
});

const App = () => (
  <Router>
    <Switch>
      <Route path="/:name" component={Pokemon} />
      <Route component={Home} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('app'));
