import React, { useContext } from 'react';
import  { Switch, Route, Redirect } from 'react-router-dom';
import  { __RouterContext } from 'react-router-dom';
import { useTransition, animated, useSpring } from 'react-spring';
import Home from './pages/Home/Home.js';
import Checkout from './pages/Checkout/Checkout.js';
import Layout from './Layout/Layout.js';
import Product from './pages/Product/Product.js';
import Shop from './pages/Shop/Shop.js';
import Recipe from './pages/Recipe/Recipe.js';
import NotFoundPage from './pages/404/404.js';
import "./index.css";

const App = () => {
    
  const { location } = useContext(__RouterContext);
  // set y position to top after transition, duration set just under the value in navlinks' setInterval
  // this allows the homepage hashlinks to scroll
  const [, setY] = useSpring(() => ({config: { duration: 300 }, y: 0 }))
  
  // react spring transition for route switching
  const transitions = useTransition(location, location => location.pathname, {
    enter: { opacity: 1 },
    leave: location => async (next, cancel) => {
      // first, scroll to top
      await setY({
        y: 0,
        reset: true,
        from: { y: window.scrollY },
        onFrame: props => window.scroll(0, props.y),
      });
      // then disappear
      await next({ opacity: 0 })
    },
    from: { opacity: 0 }
  });

  return (
    // Layout is called top level at App.js
    <Layout>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/" component={Home} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/shop" component={Shop} />
            <Route path="/product/:handle" component={Product} />
            <Redirect from="/product/" to="/shop" />
            <Route path="/recipe/:handle" component={Recipe} />
            <Redirect from="/recipe/" to="/" />
            <Route component={NotFoundPage} />
          </Switch>
        </animated.div>
      ))}
    </Layout>
  );
}

export default App;