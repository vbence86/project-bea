'use strict';
import 'jquery';
import 'tether';
import 'bootstrap/dist/js/bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, Link, Redirect, browserHistory } from "react-router";
import { App } from "neal-react";

import { ContentProvider } from './components/ContentProvider';
import Homepage from './pages/Homepage';

class MainApp extends React.Component {
  render() {
    return (
      <App
        googleAnalyticsKey="UA-42490151-3"
        segmentKey="Pd3LXILLoxlOKXi9zWTCyhK2MRvygFhF"
        stripeKey="pk_BkaOyHcEiCFaUiEADe7UH6Wq7D6f7"
        history={ browserHistory }>
        { this.props.children }
      </App>
    );
  }
}

ContentProvider.connect({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  locale: 'en-GB'
});

ReactDOM.render((
  <Router history={ browserHistory }>
    <Route path="/" component={ MainApp } history={ browserHistory }>
      <IndexRoute name="home" component={ Homepage }/>
      <Route path="*" component={ Homepage }/>
    </Route>
  </Router>
), document.getElementById("root"));
