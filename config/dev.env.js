var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

//   /!\ Attention, il sont redefini dans webpack.config.js  car pour une raison inconne ils ne sont pas transmis au projet vue apres webpack EN GROS, ce fichier est USELESS

module.exports = merge(prodEnv, {
  NODE_ENV: 'development',
  ES_HOST: 'http://previsecours.fr.local:80/api/',
  PATH: '/av/test',
  ES_PATH: '/api/'
}
