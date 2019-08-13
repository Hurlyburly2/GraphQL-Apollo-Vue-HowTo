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
// import router from './router'

require('dotenv').config()

Vue.config.productionTip = false

debugger

const address = 'https://api.graph.cool/simple/v1/' + 'cjz8trmai0vap0160ar1dax1n'
const httpLink = new HttpLink({
  uri: address
})

console.log(address)

const apolloClient = new ApolloClient({
  link: httpLink,
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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  render: h => h(App)
})
