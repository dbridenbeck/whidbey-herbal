import '../index.css'
import Layout from '../components/Layout/Layout'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import { createStore, applyMiddleware, compose } from 'redux'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import ScrollToTop from '../utils/ScrollToTop'
import { Reducer1 } from '../state/app'
import { useRouter } from 'next/router'
import ReactGA from 'react-ga'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { useEffect } from 'react'
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from '../../src/state/localStorage'

function App({ Component, pageProps }) {
  // google analytics config
  const router = useRouter()
  const trackingId = 'UA-151317774-1'
  ReactGA.initialize(trackingId)
  useEffect(() => {
    // CONFIRM THIS WORKS AS EXPECTED!
    router.beforePopState(({ url }) => {
      ReactGA.pageview(url)
    })
  })

  // persist state from localStorage
  const preLoadedState = getFromLocalStorage()

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
  )

  // update localStorage with subscribe to save to localStorage on state change
  store.subscribe(() => {
    const state = store.getState()
    saveToLocalStorage(state)
  })

  // config Apollo
  const httpLink = createHttpLink({
    uri: 'https://whidbey-herbal.myshopify.com/api/2020-07/graphql.json',
  })

  const middlewareLink = setContext(() => ({
    headers: {
      'X-Shopify-Storefront-Access-Token': '837432f0b8059e443da74da036f73f70',
    },
  }))

  const client = new ApolloClient({
    link: middlewareLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <ScrollToTop />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ApolloProvider>
    </Provider>
  )
}

export default App
