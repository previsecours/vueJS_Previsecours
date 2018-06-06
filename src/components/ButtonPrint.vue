<template>
  <div id="ButtonPrint">
    <buttonprint v-on:click="clickEvent" v-bind:iconName="iconName"></buttonprint>
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
      iconName: 'print'
    }
  },
  methods:{
    clickEvent: function(){
      console.log('inside buttonprint');
    }
  }
}
</script>

<style scoped>
  #ButtonPrint{
    position: fixed;
    top: 10px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
</style>
