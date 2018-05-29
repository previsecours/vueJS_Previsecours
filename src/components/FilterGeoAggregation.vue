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
      return this.$store.state.configuration.geoAggregation;
    },
    firstSelected(){
      return this.$store.state.configuration.geoAggregation[0];
    }
  },
  methods:{
    filters_updateGeoAggregation(e){
      this.$store.commit('filters_updateGeoAggregation',e.nameCode);
      console.log( 'action a produire lorsque on selectionne une geo aggregation de dropdown', e);
    }
  }
}
</script>

<style scoped>
  #FilterGeoAggregation{
    position: fixed;
    bottom: 130px;
    left: 1%;
    background-color: white;
    z-index:1;
  }
</style>
