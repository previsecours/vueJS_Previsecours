<template>
    <JsonToCsv id="ButtonExport" :json-data=data csv-title="previsecours_predictions" :icon="iconName"></JsonToCsv>
</template>

<script>
import es from '../store/elasticsearch.js'
import JsonToCsv from './reusable/JsonToCsv.vue'

export default {
  components: {
    JsonToCsv
  },
  data () {
    return {
      iconName: 'database',
      data : [],
    }
  },
  mounted: function() {
    this.getData()
  },
  methods:{
    getData: function(){
      console.log('vue component trigggering loadDataForExport');
      let queryPre = es.function_createQueryPreForExport(this.$store.state.filters.currentDepartment)
      let queryGeo = es.function_createQueryGeoForExport(this.$store.state.filters.currentDepartment)
      let searchPre = es.search('pre', queryPre)
      let searchGeo = es.search('geo', queryGeo)

      // sinon le this n'est pas accessiblea l'interieur e Promise
      let component = this
      Promise.all([searchPre, searchGeo].map(p => p.catch(e => e)))
        .then(function(results){
          let resultPredictions = results[0].hits.hits
          let resultGeographies = results[1].hits.hits

          let resultMerged = resultPredictions.map((pre) => {
            try {
              let info = resultGeographies.find(geo => pre._source.geo_id === geo._source.properties.code)._source
              pre._source.nom = info.properties.nom
              pre._source.maille_geographique = info.geotype
              return pre._source
            } catch (e) {
              console.log('pb avec le mapping geo_id = code dans l export de data', e.toString().slice(0,100));
            }
          })
          component.data = resultMerged
        })
        .catch(e => console.log('error is ',e));
    }
  }
}
</script>


<style>
/* we cannot "scoped" this style because we want to overwrite the default style of the vue componenet VueJsonToCsv */
  #ButtonExport{
    position: fixed;
    top: 60px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
</style>
