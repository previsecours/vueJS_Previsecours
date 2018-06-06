import elasticsearch from 'elasticsearch'

export default { search }

// const indexes = process.env.indexes
const indexes = {
    previsecours:'"previsecours"',
    int: '"interventions"',
    communes: '"communes_boundaries"',
    zc: '"zc_boundaries"'
}

// console.log(process.env.ES_HOST);
// const client = new elasticsearch.Client({
//   host: process.env.ES_HOST,
//   apiVersion: '5.6'
// })
//
// function search(type, query) {
//   return client.search({
//     index: indexes[type],
//     body: query
//   })
// }
