import React, { setGlobal, addCallback } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const rehydrate = () => {
  return JSON.parse(localStorage.getItem("state")) || {
    items: [],
    loggedIn: false,
  }
}

setGlobal(rehydrate())

addCallback((state) => {
  localStorage.setItem("state", JSON.stringify(state));

  return null;
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
