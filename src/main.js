import Vue from 'vue'
import App from './components/App.vue'
import {store} from './store/store'

// adding the fontawsome globally to the project:
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-solid'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
fontawesome.library.add(brands, faSpinner)


new Vue({
  store: store,
  el: '#previsecoursMainApp',
  render: h => h(App)
})
