var merge = require('webpack-merge')
var prodEnv = require('./prod.env')


module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  ES_HOST: '"http://localhost:9200"',
  PATH: '"/av/test"',
  // indexes: {
  //   previsecours:'"previsecours"',
  //   int: '"interventions"',
  //   communes: '"communes_boundaries"',
  //   zc: '"zc_boundaries"'
  // }
}
