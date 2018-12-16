import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { HashRouter as Router } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import App from './components/App';
import rootReducer from './reducers';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: blue[100],
            main: blue[500],
            dark: blue[900],
        },
    },
});

const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)
));

window.store = store;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </Router>
    </Provider>
    , document.querySelector('#root')
);
