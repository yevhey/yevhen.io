import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { render } from 'react-dom';
import Home from './Home';
import PokemonProfile from './PokemonProfile';

const App = () => (
  <Router>
    <Switch>
      <Route path="/:name" component={PokemonProfile} />
      <Route component={Home} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('app'));
