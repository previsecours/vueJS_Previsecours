import elasticsearch from 'elasticsearch'
import configuration from '../assets/configuration.json'
export default { search, searchSimpleFilter, function_createQuery }

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '5.6'
})

/**
 * Search functions
*/


/**
 * [Basic search function for elasticsearch]
 * @param  {string} type  [one of the value defined in configuration.indexes]
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
function search(type, query) {
  if(!configuration.indexes[type]) {
    console.log('indexes[type] problem in SEARCH: ',configuration.indexes[type]);
    return false
  }
  return client.search({
    index: configuration.indexes[type],
    body: query
  })
}


/**
 * [searchSimpleFilter description]
 * @param  {string} type  [idem]
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
function searchSimpleFilter (type, field, ref) {
  const query = querySimpleFilter(field, ref)
  return search(type, query)
}




/**
 * query definitions used in search function
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

function function_createQuery(storeState,dataSubset){
  let currentDepartment = storeState.filters.currentDepartment
  let currentCategorInter = storeState.filters.currentCategorInter
  let currentTimeAggregation = storeState.filters.currentTimeAggregation
  let currentGeoAggregation = storeState.filters.currentGeoAggregation

  console.log(currentDepartment,currentCategorInter,currentTimeAggregation,currentGeoAggregation,dataSubset);

  return {
           "query": {
               "match" : { "type" : "Feature" }
           }
       }

}
