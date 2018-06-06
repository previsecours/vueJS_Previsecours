<template>
  <div id="ButtonExport">
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
      iconName: 'database'
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
  #ButtonExport{
    position: fixed;
    top: 60px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
</style>
