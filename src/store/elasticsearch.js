import elasticsearch from 'elasticsearch'

export default { search, searchSimpleFilter }

const indexes = {
    con: 'configuration',
    int: 'interventions',
    geo: 'geographies',
}

const client = new elasticsearch.Client({
  host: process.env.ES_HOST,
  apiVersion: '5.6'
})

/**
 * Search functions
*/


/**
 * [Basic search function for elasticsearch]
 * @param  {string} type  [one of the value defined in indexes]
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
  if(!indexes[type]) {
    console.log('indexes[type] problem in SEARCH: ',indexes[type]);
    return false
  }
  return client.search({
    index: indexes[type],
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
