import Vue from 'vue'
import App from './components/App.vue'
import {store} from './store/store'
import router from './router'

// adding the fontawsome globally to the project:
import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-solid'
import faSpinner from '@fortawesome/fontawesome-free-solid/faSpinner'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// so that we can user momentJS in every vues: with {{ $moment() }} ou this.moment()
import VueMomentLib from 'vue-moment-lib'

// on met en place MixPanel pour faire du tracking uilisateurs afin de comprendre comment ameliorer l'app previsecours
import MixpanelFunctions from './components/mixins/MixpanelFunctions.js'

Vue.config.productionTip = false
// adding the fontawsome globally to the project:
fontawesome.library.add(brands, faSpinner)
Vue.component('font-awesome-icon', FontAwesomeIcon)

// so that we can user momentJS in every vues: with {{ $moment() }} ou this.moment()
Vue.use(VueMomentLib)

// on met en place MixPanel pour faire du tracking uilisateurs afin de comprendre comment ameliorer l'app previsecours
Vue.use(MixpanelFunctions)

new Vue({
  store: store,
  router,
  el: '#previsecoursMainApp',
  components: { App },
  template: '<App/>'
})
