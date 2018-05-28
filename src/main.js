import Vue from 'vue'
import App from './components/App.vue'
import {store} from './store/store'

new Vue({
  store: store,
  el: '#previsecoursMainApp',
  render: h => h(App)
})
