<template>
  <div id="FilterTimeAggregation">
    <dropdown :options="timeAggregation" :selected="firstSelected" v-on:updateOption="filters_updateTimeAggregation" v-bind:iconName="iconName"> </dropdown>
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
      iconName: 'calendar-alt'
    }
  },
  computed: {
    timeAggregation() {
      return this.$store.state.configuration.timeAggregations;
    },
    firstSelected(){
      return this.$store.state.configuration.timeAggregations.find( timeAggregation => timeAggregation.nameCode ===  this.$store.state.filters.currentTimeAggregation)
    }
  },
  methods:{
    filters_updateTimeAggregation(e){
      this.$store.dispatch('filters_updateTimeAggregation',e.nameCode);
      this.mixpanel('Click - Button Filtre temporel')
    }
  }
}
</script>

<style scoped>
  #FilterTimeAggregation{
    position: fixed;
    left: 1%;
    top: 70px;
    background-color: white;
    z-index:3;
  }
</style>
