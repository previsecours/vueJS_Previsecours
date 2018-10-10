<template>
  <div id="buttonGetLastUpdate">
    <h5>Indicateurs de mise à jour des facteurs</h5>
    <JsonToCsv id="ButtonExport2" :json-data=data csv-title="previsecours_last_update" :icon="iconName"></JsonToCsv>
  </div>
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
      iconName: 'calendar',
      data : [],
    }
  },
  mounted: function() {
    this.getData()
  },
  methods:{
    getData: function(){
      // console.log('vue component trigggering loadDataForExport');
      let queryPre = es.function_createQueryPreForExportLastUpdate("featureslastupdate")
      let searchPre = es.search('doc', queryPre)
      // sinon le this n'est pas accessiblea l'interieur e Promise
      let component = this
      Promise.all([searchPre].map(p => p.catch(e => e)))
        .then(function(results){
          let resultPredictions = results[0].hits.hits
          let resultMerged = resultPredictions.map((pre) => {
            try {
              pre._source.Derniere_date_disponible = pre._source.lastDateIs
              pre._source.Facteur = pre._source.facteur
              delete pre._source.documentName;
              delete pre._source.updatedat;
              delete pre._source.lastDateIs;
              delete pre._source.facteur;
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
  #buttonGetLastUpdate{
    position: absolute;
    bottom: 40px;
    right: 105px;
    width: 100px;
    background-color: #f6f6f6;
    color: #636b6f;
    text-align: center;
    border: 1px solid lightgray;
  }
  #buttonGetLastUpdate ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  #buttonGetLastUpdate li {
    list-style: none;
    padding: 5px 0px 5px 0px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
