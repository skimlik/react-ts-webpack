import './main.scss';
import * as React from 'react';
import { combineReducers, createStore } from 'redux';
import { Component } from 'react';
import { Demo } from './Demo';
import { Provider } from 'react-redux';
import { DemoReducer } from './reducers/demo-reducer';

const logo = require('./logo.svg');

class App extends Component {
    render() {
        let reducers = combineReducers({
            demo: DemoReducer
        });
        let store = createStore(reducers);

        return (
            <Provider store={store}>
                <Demo logo={logo} />
            </Provider>
        );
    }
}

export default App;
