import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import * as serviceWorker from './serviceWorker';
import { Reducer1 } from './state/App';
import { saveToLocalStorage, getFromLocalStorage } from "../src/state/localStorage";
import thunk from "redux-thunk";
import Home from '../src/pages/Home';
import Checkout from '../src/pages/Checkout';
import Layout from '../src/components/Layout';
import Product from '../src/pages/Product';
import Shop from '../src/pages/Shop';
import Recipe from '../src/pages/Recipe';
import "./index.css";

const Root = () => {

  // persist state from localStorage
  const preLoadedState = getFromLocalStorage();

  // create store
  const store = createStore(
    Reducer1,
    preLoadedState,
    compose(
      applyMiddleware(thunk),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  // update localStorage with subscribe to save to localStorage on state change
  store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });
  return (
  <Provider store={store}>
    <Router>
      <Layout>
        <Route exact path="/" component={Home} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:handle" component={Product}/>
        <Route path="/recipe/:handle" component={Recipe}/>
      </Layout>
    </Router>
  </Provider>
  )
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

export default Root;