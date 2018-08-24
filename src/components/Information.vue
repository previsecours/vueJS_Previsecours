<template>
  <div id="information" v-on:click="appear = !appear">
    <i class="fa fa-info"></i>
    <legende v-if="appear"></legende>
  </div>
</template>

<script>
import legende from './Legende.vue'
export default {
  components:{
    legende
  },
  data () {
    return {
      appear: true
    }
  },
}
</script>

<style scoped>
  #information{
    position: fixed;
    bottom: 50px;
    right: 1%;
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
