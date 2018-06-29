import Vue from 'vue'
import App from './components/App.vue'
import {store} from './store/store'
import router from './router'

Vue.config.productionTip = false

// adding the fontawsome globally to the project:
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-solid'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'
fontawesome.library.add(brands, faSpinner)

//so that we can user momentJS in every vues: with {{ $moment() }} ou this.moment()
import VueMomentLib from 'vue-moment-lib';
Vue.use(VueMomentLib);

new Vue({
  store: store,
  router,
  el: '#previsecoursMainApp',
  components: { App },
  template: '<App/>'
})
