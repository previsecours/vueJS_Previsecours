<template>
  <div id="filterCategorInter">
    <dropdown :options="categorInter" :selected="firstSelected" v-on:updateOption="updatedDropdown"></dropdown>
  </div>
</template>

<script>
import dropdown from './reusable/Dropdown.vue'
export default {
  components: {
    dropdown,
  },
  data () {
    return {
    }
  },
  computed: {
    categorInter() {
      return this.$store.state.configuration.categorInter;
    },
    firstSelected(){
      return this.$store.state.configuration.categorInter[0];
    }
  },
  methods:{
    updatedDropdown(e){
      console.log( 'action a produire lorsque on selectionne un jour de dropdown', e);
    }
  }
}
</script>

<style scoped>
  #filterCategorInter{
    position: fixed;
    bottom: 10px;
    left: 10%;
    background-color: white
    /* z-index:1000; */
  }
</style>
