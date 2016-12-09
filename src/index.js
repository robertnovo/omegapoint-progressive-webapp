import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import './index.css';


Notification.requestPermission();

if (navigator.serviceWorker) {
	navigator.serviceWorker.register("service-worker.js");
}

import * as reducers from './store/reducers';
const store = createStore(
  combineReducers(reducers),
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
