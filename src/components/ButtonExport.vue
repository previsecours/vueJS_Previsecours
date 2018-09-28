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
      // console.log('vue component trigggering loadDataForExport');
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
              pre._source.nom = (info.properties.NOM) ? info.properties.NOM : info.properties.nom
              pre._source.maille_geographique = component.rename(info.geotype,'maille_geographique')

              if (pre._source.hasOwnProperty('prediction_type')) {
                pre._source.maille_temporelle = component.rename(component.getFreqAndCat(pre._source.prediction_type)[0],'maille_temporelle')
                pre._source.categorie = component.rename(component.getFreqAndCat(pre._source.prediction_type)[1],'categorie')
                delete pre._source.prediction_type;
              }

              if (pre._source.hasOwnProperty('pre_001_is')) {
                pre._source.date_de_reference = component.rename(pre._source.pre_001_is,'pre_001_is')
                delete pre._source.pre_001_is;
              }
              //ici on renomme les colonnes et on les trie pour avoir le bon ordre d'affichage
              let keys = Object.keys(pre._source)
              Array.sort(keys)
              keys.forEach(function(key){
                if(component.rename(key,'label') !== key){
                  pre._source[component.rename(key,'label')] = pre._source[key];
                  delete pre._source[key];
                }
              })

              return pre._source
            } catch (e) {
              console.log('pb avec le mapping geo_id = code dans l export de data', e.toString().slice(0,100));
            }
          })
          component.data = resultMerged
        })
        .catch(e => console.log('error is ',e));
    },
    rename: function(text,typeOfInformation){
      if (typeOfInformation === 'maille_geographique') {
        switch (text) {
          case 'com':
            return 'commune'
            break;
          case 'zdc':
            return 'zone de couverture'
            break;
          case 'dpt':
            return 'departement'
            break;
          default:
            return 'commune'
        }
      } else if (typeOfInformation === 'label') {
        let textSubstrType = (text.split('_')) ? text.split('_')[0] : ''
        let textSubstrNum = (text.split('_')) ? text.split('_')[1] : ''
        switch (textSubstrType) {
          case 'pre':
            return 'Prediction ' + textSubstrNum
            break;
          case 'cla':
            return 'Classe ' + textSubstrNum
            break;
          case 'po':
            return 'Reference ' + textSubstrNum
            break;
          default:
            return text
        }
      } else if (typeOfInformation === 'pre_001_is') {
          return 'Le debut de la premiere iteration est le '+ text
      } else if (typeOfInformation === 'maille_temporelle') {
        switch (text) {
          case 'j':
            return 'quotidien'
            break;
          case 's':
            return 'hebdomadaire'
            break;
          case 'm':
            return 'mensuel'
            break;
          case 't':
            return 'trimestriel'
            break;
          case 'a':
            return 'annuel'
            break;
          default:
            return text
        }
      } else if (typeOfInformation === 'categorie') {
        switch (text) {
          case 'suap':
            return "SUAP: Secours d'urgence aux personnes"
            break;
          case 'incn':
            return 'Incendies en milieu naturel'
            break;
          case 'incu':
            return 'Incendies en milieu urbain'
            break;
          case 'acci':
            return 'Accidents de la route'
            break;
          case 'coia':
            return 'Incendies et Accidents'
            break;
          default:
            return text
        }
      }
      return text
    },
    getFreqAndCat: function(prediction_type){
      let cat = (prediction_type.split('_') && prediction_type.split('_')[2]) ? prediction_type.split('_')[2] : ''
      let freq = (prediction_type.split('_') && prediction_type.split('_')[3]) ? prediction_type.split('_')[3] : ''
      return [freq,cat]
    }
  }
}
</script>


<style>
/* we cannot "scoped" this style because we want to overwrite the default style of the vue componenet VueJsonToCsv */
  #ButtonExport{
    position: fixed;
    top: 10px;
    left: 82px;
    background-color: white;
    z-index:1000;
  }
</style>
