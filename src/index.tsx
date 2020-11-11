import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from "react-redux";
import {createStore, compose, applyMiddleware, combineReducers} from 'redux'
import  {blogsReducer} from "./store/reducers/blog_reducer";
import {BrowserRouter as Router} from 'react-router-dom'
import thunk from "redux-thunk";
import { userReducer } from './store/reducers/user_reducer';

const w = window as any;
const composeEnchancer = process.env.NODE_ENV === "development" ? w.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose

const reducers = combineReducers({
  user: userReducer,
  blog: blogsReducer
})

const store = createStore(reducers, composeEnchancer(applyMiddleware(thunk)));

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