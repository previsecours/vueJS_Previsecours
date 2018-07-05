import elasticsearch from 'elasticsearch'
import configuration from '../assets/configuration.json'
export default { search, searchSimpleFilter, function_createQuery }

let protocol = window.location.protocol  //previsecours.fr.local
let host = window.location.host  // http:
let port = (window.location.port) ? window.location.port: '80'
let apiPath = (process.env.ES_PATH) ? process.env.ES_PATH : '/api/'
let url = protocol + '//' + host + ':' + port + apiPath
// testing purposes: we remove the :80 (was not working on viz.previsecours.fr )
let url2 = protocol + '//' + host + apiPath
console.log( 'url for elasticsearch config', url2);

const client = new elasticsearch.Client({
  host: url2,
  apiVersion: '5.6'
})

/**
 * ------------------------------------------------------------------------------------------------------------------------------
 * Search functions
 * ------------------------------------------------------------------------------------------------------------------------------
*/


/**
 * [Basic search function for elasticsearch]
 * @param  {string} indexType  [one of the value defined in configuration.indexes]
 * @param  {Object} query [the elasticsearch query]
 * @return {Object}       [the result from elasticsearch database]
 *
 * example:
 * es.search(
     'geo',
     {
         "query": {
             "match" : { "type" : "Feature" }
         }
     }))
 *
 */
function search(indexType, query) {
  if(!configuration.indexes[indexType]) {
    console.log('indexes[indexType] problem in SEARCH: ',configuration.indexes[indexType]);
    return false
  }
  return client.search({
    index: configuration.indexes[indexType],
    body: query
  })
}


/**
 * [searchSimpleFilter description]
 * @param  {string} indexType  [idem]
 * @param  {string} field [field you wanna query. can be sub.property like property.subproperty]
 * @param  {string} ref   [the value of the field you want to retrieve]
 * @return {Object}       [the result from elasticsearch database]
 *
 * example:
   es.searchSimpleFilter(
     'geo',
     'properties.OBJECTID',
     16
   )
 */
function searchSimpleFilter (indexType, field, ref) {
  const query = querySimpleFilter(field, ref)
  return search(indexType, query)
}




/**
 * ------------------------------------------------------------------------------------------------------------------------------
 * query definitions used in search function
 * ------------------------------------------------------------------------------------------------------------------------------
*/

function querySimpleFilter (field, ref, size = 1000) {
  return {
    size: size,
    query: {
      match: {
        [field] : ref
      }
    }
  }
}

/**
 * [function_createQuery will create the elasticsearch query for the mentioned dataSubset, according to the current state of the store]
 * @param  {object} storeState [description, directly coming from the store, so reliable]
 * @param  {string} dataSubset [string defined in the assets/configuration.json (already checked in the store action, so reliable)]
 * @return {object}            [the query]
 */
function function_createQuery(storeState,dataSubset){
  let query
  switch (dataSubset) {
    case 'int':
      query = function_createQueryInt(storeState)
      break;
    case 'pre':
      query = function_createQueryPre(storeState)
      break;
    case 'geo':
      query = function_createQueryGeo(storeState)
      break;
    default:
      query = function_createQueryInt(storeState)
  }
  return query;
}



function function_createQueryInt(storeState){
  let currentDepartment = storeState.filters.currentDepartment
  let currentCategorInter = storeState.filters.currentCategorInter
  let currentTimeAggregation = storeState.filters.currentTimeAggregation
  let currentGeoAggregation = storeState.filters.currentGeoAggregation
  let type = 'function_createQueryInt - sdis'+currentDepartment.toString()+'_'+currentGeoAggregation+'_'+currentCategorInter+'_'+currentTimeAggregation
  console.log(type);
  return {
           "query": {
              "type":{
                "value":type
              }
               // "match" : { "type" :  }
           },
           size: 1000
         }
}


function function_createQueryGeo(storeState){
  let currentDepartment = storeState.filters.currentDepartment
  let currentGeoAggregation = storeState.filters.currentGeoAggregation
  let type = 'function_createQueryGeo - sdis'+currentDepartment.toString()+'_'+currentGeoAggregation
  console.log(type);
  return {
           "query": {
             "match" : {
                "geotype": currentGeoAggregation
              }
           },
           size: 1000
         }
}

function function_createQueryPre(storeState){
  let currentDepartment = storeState.filters.currentDepartment
  let currentCategorInter = storeState.filters.currentCategorInter
  let currentTimeAggregation = storeState.filters.currentTimeAggregation
  let currentGeoAggregation = storeState.filters.currentGeoAggregation
  let type = 'function_createQueryPre - sdis'+currentDepartment.toString()+'_'+currentGeoAggregation+'_'+currentCategorInter+'_'+currentTimeAggregation
  console.log(type);
  return {
           "query": {
              "match" : {
                "prediction_type" : type
              }
           },
           size: 1000
         }
}
