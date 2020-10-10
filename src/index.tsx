import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import {createStore, compose, applyMiddleware} from 'redux'
import  {blogsReducer} from "./store/reducers";
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from "redux-thunk";

const w = window as any;
const composeEnchancer = process.env.NODE_ENV === "development" ? w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const store = createStore(blogsReducer, composeEnchancer(applyMiddleware(thunk)));

const app = 
<Provider store= {store}>
  <Router>
    <App />
  </Router>
</Provider>

ReactDOM.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA