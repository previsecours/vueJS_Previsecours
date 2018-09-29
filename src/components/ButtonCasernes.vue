<template>
  <div id="ButtonCasernes" v-on:click="clickEvent">
    <buttonprint v-bind:iconName="iconName"></buttonprint>
  </div>
</template>

<script>
import buttonprint from './reusable/Button.vue'
export default {
  components: {
    buttonprint,
  },
  data () {
    return {
      iconName: 'building'
    }
  },
  methods:{
    clickEvent: function(){
      this.$store.commit('toogleCasernes')
    }
  },
  /**
   * we trigger on launch the load of all casernes
   * it will then only be toggled if the button is clicked
   * @return nothing
   */
  mounted: function() {
    this.$store.dispatch('loadCasernes')
  }
}
</script>

<style scoped>
  #ButtonCasernes{
    position: fixed;
    top: 10px;
    left: 15px;
    background-color: white;
    z-index:1000;
  }
</style>
