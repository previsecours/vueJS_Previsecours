<template>
  <div id="filterCategorInter">
    <dropdown :options="categorInter" :selected="firstSelected" v-on:updateOption="filters_updateCategory" v-bind:iconName="iconName"></dropdown>
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
      iconName: 'truck'
    }
  },
  computed: {
    categorInter() {
      return this.$store.state.configuration.categorInters;
    },
    firstSelected(){
      return this.$store.state.configuration.categorInters.find( categorInter => categorInter.nameCode ===  this.$store.state.filters.currentCategorInter)
    }
  },
  methods:{
    filters_updateCategory(e){
      this.$store.dispatch('filters_updateCategory',e.nameCode);
      this.mixpanel('Click - Button Filtre categorie intervention')
    }
  }
}
</script>

<style scoped>
  #filterCategorInter{
    position: fixed;
    left: 1%;
    top: 130px;
    background-color: white;
    z-index:2;
    /* pour que les menus ne se montent pas les uns sur les autres il faut faire en sorte que en bas le z-index soit superieur */
  }
</style>
