<template>
  <div v-show="!hideAllFilters" id="filters">
    <FilterCategorInter></FilterCategorInter>
    <FilterTimeAggregation></FilterTimeAggregation>
    <FilterGeoAggregation></FilterGeoAggregation>
  </div>
</template>

<script>
import version from '../assets/version.json'
import FilterCategorInter from './FilterCategorInter.vue'
import FilterTimeAggregation from './FilterTimeAggregation.vue'
import FilterGeoAggregation from './FilterGeoAggregation.vue'
export default {
  components: {
    FilterCategorInter,
    FilterTimeAggregation,
    FilterGeoAggregation
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
  }
</style>
