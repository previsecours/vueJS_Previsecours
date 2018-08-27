import router from '../../router'
import MixpanelonUserClick from './MixpanelonUserClick'
import VueMultianalytics from 'vue-multianalytics'

const MyPlugin = {}

MyPlugin.install = function (Vue, options) {
  Vue.use(VueMultianalytics, {
    modules: {
      mixpanel: {
        token: '7bb4203f0d0117ca1b4386b440ab6bca'
      }
    },
    routing: {
      vueRouter: router, //  the router instance -> automatically sync with router (optional)
      preferredProperty: 'name', // By default 'path' and related with vueRouter (optional)
      ignoredViews: [], // Views that will not be tracked
      ignoredModules: ['ga', 'facebook', 'segment', 'mparticle'] // Modules that will not send route change events.
    }
  }, MixpanelonUserClick)
  Vue.mixin({
    created: function () {
      console.log('mixin created')
    },
    methods: {
      mixpanel: function (input) {
        this.$mam.onUserClick(input)
      }
    }
  })
}

export default MyPlugin
