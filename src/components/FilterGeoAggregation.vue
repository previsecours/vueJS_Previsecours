<template>
  <div id="FilterGeoAggregation">
    <dropdown :options="geoAggregation" :selected="firstSelected" v-on:updateOption="filters_updateGeoAggregation" v-bind:iconName="iconName"></dropdown>
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
      iconName: 'map-signs'
    }
  },
  computed: {
    geoAggregation() {
      return this.$store.state.configuration.geoAggregations;
    },
    firstSelected(){
      return this.$store.state.configuration.geoAggregations.find( geoAggregation => geoAggregation.nameCode ===  this.$store.state.filters.currentGeoAggregation)
    }
  },
  methods:{
    filters_updateGeoAggregation(e){
      this.$store.dispatch('filters_updateGeoAggregation',e.nameCode);
      this.mixpanel('Click - Button Filtre geographique')
    }
  }
}
</script>

<style scoped>
  #FilterGeoAggregation{
    position: fixed;
    left: 1%;
    top: 190px;
    background-color: white;
    z-index:1;
  }
</style>
