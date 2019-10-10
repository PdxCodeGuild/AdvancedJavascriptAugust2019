import React, { setGlobal, addCallback } from 'reactn';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const initialState = {
  token: null,
};

const rehydrateState = () => {
  const state = localStorage.getItem("globalState");

  if(state) return JSON.parse(state);

  return initialState;
}

setGlobal(rehydrateState());

addCallback((state) => {
  localStorage.setItem("globalState", JSON.stringify(state));
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
