import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import { render } from 'react-dom';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('./Home'),
  loading: Loading
});

const NoMatch = Loadable({
  loader: () => import('./NotFound'),
  loading: Loading
});

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route component={NoMatch} />
    </Switch>
  </Router>
);

render(<App />, document.getElementById('app'));
