// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import 'tachyons'
import Vue from 'vue'

import VueApollo from 'vue-apollo'

import router from './router'
import App from './App'
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings'
import { ApolloLink } from 'apollo-link';
// import router from './router'

require('dotenv').config()

Vue.config.productionTip = false

debugger

const address = 'https://api.graph.cool/simple/v1/' + 'cjz8trmai0vap0160ar1dax1n'
const httpLink = new HttpLink({
  uri: address
})

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(GC_AUTH_TOKEN)
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })

  return forward(operation)
})

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

Vue.use(VueApollo)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

let userId = localStorage.getItem(GC_USER_ID)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  data: {
    userId
  },
  render: h => h(App)
})

