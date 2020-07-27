import React from "react";
import ReactGA from "react-ga";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { Router } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";

import ScrollToTop from "./utils/ScrollToTop";
import * as serviceWorker from "./serviceWorker";
import { Reducer1 } from "./state/app";
import App from "./App";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../src/state/localStorage";
import "./index.css";

// google analytics config
const history = createBrowserHistory();
const trackingId = "UA-151317774-1";
ReactGA.initialize(trackingId);
history.listen((location, action) => {
  ReactGA.pageview(location.pathname + location.search);
});

const Root = () => {
  // persist state from localStorage
  const preLoadedState = getFromLocalStorage();

  // create store
  const store = createStore(
    Reducer1,
    preLoadedState,
    compose(
      applyMiddleware(thunk),
      window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  // update localStorage with subscribe to save to localStorage on state change
  store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });

  return (
      <Provider store={store}>
        <Router basename={process.env.PUBLIC_URL} history={history}>
          <ScrollToTop />
          <App />
        </Router>
      </Provider>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default Root;
