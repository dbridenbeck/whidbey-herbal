import '../index.css';
import Layout from '../components/Layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { createStore, applyMiddleware, compose } from 'redux';
import ScrollToTop from '../utils/ScrollToTop';
import { Reducer1 } from '../state/app';
import { useRouter } from 'next/router';
import ReactGA from 'react-ga';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from '../../src/state/localStorage';
import apolloClient from '../apolloClient';
import { useEffect } from 'react';

function App({ Component, pageProps }) {
  // google analytics config
  const router = useRouter();

  const trackingId = 'UA-151317774-1';
  ReactGA.initialize(trackingId);
  // GET THIS WORKING AS EXPECTED!
  // useEffect(() => {
  //   router.beforePopState(({ url }) => {
  //     ReactGA.pageview(url);
  //   });
  // });

  // persist state from localStorage
  const preLoadedState = getFromLocalStorage();

  // create store
  const store = createStore(
    Reducer1,
    preLoadedState,
    compose(
      applyMiddleware(thunk),
      typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
        ? window.__REDUX_DEVTOOLS_EXTENSION__()
        : (f) => f
    )
  );

  useEffect(() => {
    const handleRouteChange = (url) => {
      const isHomeHash = url.slice(0, 2) === '/#';
      if (isHomeHash) {
        const hash = url.split('/')[1];
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          });
        }
      }
    };
    router.events.on('routeChangeComplete', handleRouteChange);
  }, []);

  // update localStorage with subscribe to save to localStorage on state change
  store.subscribe(() => {
    const state = store.getState();
    saveToLocalStorage(state);
  });

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <ScrollToTop />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
export { apolloClient };
