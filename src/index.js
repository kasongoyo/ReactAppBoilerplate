import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import Home from 'Home';
// import About from 'About';
import { Route } from 'react-router';
import { ConnectedRouter } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const Home = Loadable({
  loader: () => import('Home' /* webpackChunkName: "home" */),
  loading: Loading,
});

const About = Loadable({
  loader: () => import('About'  /* webpackChunkName: "about" */),
  loading: Loading,
});



// Create a browser history in this case
const history = createHistory();

render(
  //Connect redux store with react components
  <Provider store={store(history)}>
    <ConnectedRouter history={history}>
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
