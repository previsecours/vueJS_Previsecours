<template>
  <div id="information" v-on:click="appear = !appear">
    <i class="fa fa-info"></i>
    <legende v-if="appear"></legende>
    <buttonGetLastUpdate v-if="appear"></buttonGetLastUpdate>
    <linkDocumentation v-if="appear"></linkDocumentation>
  </div>
</template>

<script>
import legende from './Legende.vue'
import buttonGetLastUpdate from './ButtonGetLastUpdate.vue'
import linkDocumentation from './LinkDocumentation.vue'
export default {
  components:{
    legende,
    buttonGetLastUpdate,
    linkDocumentation
  },
  data () {
    return {
      appear: false
    }
  },
}
</script>

<style scoped>
  #information{
    position: fixed;
    bottom: 100px;
    right: 12px;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f6f6f6;
    z-index:1000;
    border-radius: 20px;
    border: 1px lightgray solid;
  }
</style>
