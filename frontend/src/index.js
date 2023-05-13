import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './main.scss';
import { Provider } from 'react-redux';
import store from './store/index.js';

import { positions, transitions, Provider as AlertProvider } from 'react-alert';
import alertTemplate from 'react-alert-template-basic';

/* const HttpProxyAgent = require('http-proxy-agent');
const agent = new HttpProxyAgent('http://chat-cripto.psg.org/'); */

const options = {
  position: positions.TOP_RIGHT,
  timeout: 5000,
  offset: '30px',
  transition: transitions.SCALE
}

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={alertTemplate} {...options} >
      <App />
    </AlertProvider>
  </Provider>
  ,
  document.getElementById('root')
); 