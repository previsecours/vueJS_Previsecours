<template>
  <div id="ButtonExport" v-on:click="clickEvent">
    <buttonprint v-bind:iconName="iconName"></buttonprint>
  </div>
</template>

<script>
import buttonprint from './reusable/Button.vue'
import es from '../store/elasticsearch.js'

export default {
  components: {
    buttonprint,
  },
  data () {
    return {
      iconName: 'database'
    }
  },
  methods:{
    clickEvent: function(){
      console.log('vue component trigggering loadDataForExport');
      console.log('pour les prediction');
      let queryPre = es.function_createQueryPreForExport(this.$store.state.filters.currentDepartment)
      let queryGeo = es.function_createQueryGeoForExport(this.$store.state.filters.currentDepartment)
      let searchPre = es.search('pre', queryPre)
      let searchGeo = es.search('geo', queryGeo)

      Promise.all([searchPre, searchGeo].map(p => p.catch(e => e)))
        .then(function(results){
          console.log('results are ---',results)
          let resultPredictions = results[0].hits.hits
          let resultGeographies = results[1].hits.hits

          let resultMerged = resultPredictions.map((pre) => {
            try {
              // console.log(pre._source.geo_id,resultGeographies[0]._source.properties.code);
              let info = resultGeographies.find(geo => pre._source.geo_id === geo._source.properties.code)._source
              pre._source.nom = info.properties.nom
              pre._source.maille_geographique = info.geotype
              return pre._source
            } catch (e) {
              console.log('ca marche pas le mapping geo_id = code dans l export', e.toString().slice(0,100));
            }
          })

          console.log(resultMerged);
        })
        .catch(e => console.log('error is ',e));
    }
  }
}
</script>

<style scoped>
  #ButtonExport{
    position: fixed;
    top: 60px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
</style>
