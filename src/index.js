import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';
import './App.css'
import './index.css'
import { createSessionFromToken } from './actions/sessionActions'

const store = configureStore();

const token = localStorage.getItem('access_token')

if(token !== null){
  store.dispatch(createSessionFromToken(token));
}


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();