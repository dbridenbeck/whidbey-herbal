import React from 'react';
import  { Switch, Route, Redirect } from 'react-router-dom';
import Home from './pages/Home/Home.js';
import Checkout from './pages/Checkout/Checkout.js';
import Layout from './Layout/Layout.js';
import Product from './pages/Product/Product.js';
import Shop from './pages/Shop/Shop.js';
import Recipe from './pages/Recipe/Recipe.js';
import NotFoundPage from './pages/404/404.js';
import "./index.css";

const App = () => {

  return (
    // Layout is called top level at App.js
    <Layout>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* /whidbey-herbal path is a test for github pages testing */}
        <Route exact path="/whidbey-herbal" component={Home} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/shop" component={Shop} />
        <Route path="/product/:handle" component={Product} />
        <Redirect from="/product/" to="/shop" />
        <Route path="/recipe/:handle" component={Recipe} />
        <Redirect from="/recipe/" to="/" />
        <Route component={NotFoundPage} />
      </Switch>
    </Layout>
  );
}

export default App;