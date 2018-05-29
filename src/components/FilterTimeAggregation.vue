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
      return this.$store.state.configuration.timeAggregation;
    },
    firstSelected(){
      return this.$store.state.configuration.timeAggregation[0];
    }
  },
  methods:{
    filters_updateTimeAggregation(e){
      this.$store.commit('filters_updateTimeAggregation',e.nameCode);
      console.log( 'action a produire lorsque on selectionne un jour de dropdown', e);
    }
  }
}
</script>

<style scoped>
  #FilterTimeAggregation{
    position: fixed;
    bottom: 10px;
    left: 1%;
    background-color: white;
    z-index:3;
  }
</style>
