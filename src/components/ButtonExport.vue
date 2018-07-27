<template>
    <vue-json-to-csv id="ButtonExport" :json-data=data csv-title="previsecours_predictions"></vue-json-to-csv>
</template>

<script>
import buttonprint from './reusable/Button.vue'
import es from '../store/elasticsearch.js'
import VueJsonToCsv from 'vue-json-to-csv'

export default {
  components: {
    buttonprint,
    VueJsonToCsv
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
    #ButtonExport button {
        width: 40px;
        height: 40px;
        position: relative;
        margin: 0px 0px;
        display: inline-block;
        vertical-align: middle;
        background-color: #f6f6f6 !important;
        text-align: center;
        color: #636b6f !important;
        padding: 10px;
        text-transform: none;
        font-weight: 300;
        border: 0;
        background-image: linear-gradient(#009688, #009688), linear-gradient(#D2D2D2, #D2D2D2) !important;
        background-size: 0 2px, 100% 0px !important;
        background-repeat: no-repeat !important;
        background-position: center bottom, center calc(100% - 1px) !important;
        transition: background 0s ease-out !important;
        float: none !important;
        box-shadow: none;
        border-radius: 0;
        list-style: none;
        &:hover {
          background: #e1e1e1 !important;
          cursor: pointer !important;
        }
        a {
            &:hover {
                text-decoration: none;
            }
        }
    }

  #ButtonExport{
    position: fixed;
    top: 60px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
</style>
