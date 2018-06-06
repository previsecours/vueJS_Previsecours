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
      return this.$store.state.configuration.categorInters[0];
    }
  },
  methods:{
    filters_updateCategory(e){
      this.$store.commit('filters_updateCategory',e.nameCode);
      console.log( 'action a produire lorsque on selectionne une categorie d intervention de dropdown', e);
    }
  }
}
</script>

<style scoped>
  #filterCategorInter{
    position: fixed;
    bottom: 70px;
    left: 1%;
    background-color: white;
    z-index:2;
    /* pour que les menus ne se montent pas les uns sur les autres il faut faire en sorte que en bas le z-index soit superieur */
  }
</style>
