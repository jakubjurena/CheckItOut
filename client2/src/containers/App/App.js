import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';

// MOCKS
const LoginPage = () => (
    <div>
        LOGIN PAGE
    </div>
);

const HomePage = () => (
    <div>
        HOME PAGE
    </div>
);

const App = () => (
    <div className="app">
        <Switch>
            <Route exact path='/login' component={LoginPage} />
            <Route component={HomePage} />
        </Switch>
    </div>
);

export default App;

