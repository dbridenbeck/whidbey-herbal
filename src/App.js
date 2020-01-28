import React, { useContext } from 'react';
import  { Switch, Route } from 'react-router-dom';
import  { __RouterContext } from 'react-router-dom';
import { useTransition, animated, useSpring } from 'react-spring';
import Home from './pages/Home/Home.js';
import Checkout from './pages/Checkout/Checkout.js';
import Layout from './Layout/Layout.js';
import Product from './pages/Product/Product.js';
import Shop from './pages/Shop/Shop.js';
import Recipe from './pages/Recipe/Recipe.js';
import "./index.css";

const App = () => {
    
  const { location } = useContext(__RouterContext);

  console.log("location is: ", location)

  const [, setY] = useSpring(() => ({ y: 0 }))

  const transitions = useTransition(location, location => location.pathname, {
    enter: { opacity: 1, transform: "translate(0%, 0)" },
    leave: location => async (next, cancel) => {
      if (location.pathname === "/") {
        await setY({
          y: 0,
          reset: true,
          from: { y: window.scrollY },
          onFrame: props => window.scroll(0, props.y)
        })
      }
      await next({ opacity: 0, transform: "translate(100%, 0)" });
    },
    from: { opacity: 0, transform: "translate(0%, 0)" }
  });

  return (
    <Layout>
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          <Switch location={item}>
            <Route exact path="/" component={Home} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/shop" component={Shop} />
            <Route path="/product/:handle" component={Product} />
            <Route path="/recipe/:handle" component={Recipe} />
          </Switch>
        </animated.div>
      ))}
    </Layout>
  );
}

export default App;