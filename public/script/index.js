import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Home from './components/Home';
let router =  (
    <Router history={browserHistory}>
        <Route path = '/' component={Home}></Route>
        <Route path = '/home' component={Home}></Route>
    </Router>
);

ReactDOM.render(
    router,
    document.getElementById('app')
);;