<template>
  <div v-show="!hideAllFilters" id="filters">
    version: {{version}}
    <FilterCategorInter></FilterCategorInter>
  </div>
</template>

<script>
import version from '../assets/version.json'
import FilterCategorInter from './FilterCategorInter.vue'
export default {
  components: {
    FilterCategorInter
  },
  data () {
    return {
      version: version.version,
    }
  },
  computed: {
    hideAllFilters () {
      return this.$store.state.filters.hideAllFilters
    }
  }
}
</script>

<style scoped>
  #filters{
    position: absolute;
    top: 0px;
    left: 0px;
    z-index:1000;

    /* height: 100%;
    width: 100%;
    padding-top: 100px;
    padding-bottom: 10px;
    padding-left: 10px;
    padding-rigth: 10px;
    background-color: grey;
    opacity: 0.5; */
  }
</style>
