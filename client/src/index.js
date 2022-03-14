import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/index.scss';

//Redux
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'
import { getUsers } from './actions/users.actions';
import {getPosts} from './actions/posts.actions';
import { getLikes } from './actions/likes.actions';
import {getComments} from './actions/comments.actions'

//Dev Tools
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';


// Ne pas oublier de virer le console TOOLs pour le REDUX
const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk, logger))
)

store.dispatch(getUsers())
store.dispatch(getPosts())
store.dispatch(getLikes())
store.dispatch(getComments())

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

