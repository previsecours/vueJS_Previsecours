import Vue from 'vue';
import VueX from 'vuex';
import es from './elasticsearch.js'
import configuration from '../assets/configuration.json'

Vue.use(VueX);

export const store = new VueX.Store({
  state: {
    /**
     * [current status of filters on which we base the queries to database]
     * @type {Object}
     */
    filters: {
      hideAllFilters: false,
      currentCategorInter: 'suap',
      currentTimeAggregation: 's',
      currentGeoAggregation: 'com',
      currentDepartment: 91
    },
    /**
     * [initial zoom for map.]
     * @type {Object}
     */
    carte: {
      zoom: 10
    },
    data: {
      geo: {},
      int: {},
      pre: {}
    },
    dataHasBeenUpdated: 0,
    /**
     * [current status of the slider.
     * Initial value defined here as well.]
     * @type {Object}
     *       begin: Date().getTime() First date on the slider = range min
     *       currentPosition: INT how many steps betwwen time MIN and current time. the time for one step is defined in configuration.timeAggregation
     */
    slider: {
      /**
       * [date BEGIN to choose which day, month... to see on the map.
       * Unix Timestamp (milliseconds)   ex: 1528620491576   ]
       * @type {Date}
       */
      begin: '',
      currentPosition: 1
    },
    configuration: {
      /**
       * [set up the different time categorInters we can choose in filters]
       * @type {Array}
       *           name: display name,
       *           nameCode: coded name for code reference
       *           description: in case we need to explain
       *           position: INT to define the order in the filter -> for display only
       *           show: BOOLEAN do we show this possibility in the filter (in case it isn't used any longer)

       */
      categorInters: [
        {
          name: 'SUAP',
          nameCode: 'suap',
          description: 'Secours a personne',
          position: 1,
          show:true,
          available:true
        },
        {
          name: 'Accident',
          nameCode: 'acci',
          description: 'Accident de la route',
          position: 2,
          show:true,
          available:false
        },
        {
          name: 'Incendie Urb',
          nameCode: 'incu',
          description: 'Incendie en milieu urbain',
          position: 3,
          show:true,
          available:false
        },
        {
          name: 'Incendie Nat',
          nameCode: 'incn',
          description: 'Incendie en milieu naturel',
          position: 4,
          show:true,
          available:false
        },
        {
          name: 'Incendie & Accident',
          nameCode: 'coia',
          description: 'Incendie (naturel et urbain) et accident',
          position: 5,
          show: true,
          available:false
        }
      ],
      /**
       * [set up the different time aggragation that are used to define end date in filters]
       * @type {Array}
       *           name: display name,
       *           nameCode: coded name for code reference
       *           description: in case we need to explain
       *           timeRepetition:5,
       *           timeStepBetweenRepetitions: {
       *              type: 'days','months'... MOMENTjs TIME defintion. could be weeks, years... but we try to keep it minimalist: days / months
       *              step: how many 'days' between the BEGIN and the END on the slider
       *           }
       *           position: INT to define the order in the filter -> for display only
       *           show: BOOLEAN do we show this possibility in the filter (in case it isn't used any longer)

       */
      timeAggregations: [
        {
          name: 'jour',
          nameCode: 'j',
          description: 'aggregation par jours',
          timeRepetition: 5,
          timeStepBetweenRepetitions: {
            type: 'days',
            step: 1
          },
          position: 1,
          show:true,
          available:false
        },
        {
          name: 'semaine',
          nameCode: 's',
          description: 'aggregation par semaines',
          timeRepetition: 12,
          timeStepBetweenRepetitions: {
            type: 'days',
            step: 7
          },
          position: 2,
          show:true,
          available:true
        },
        {
          name: 'mois',
          nameCode: 'm',
          description: 'aggregation par mois',
          timeRepetition: 12,
          timeStepBetweenRepetitions: {
            type: 'months',
            step: 1
          },
          position: 3,
          show:true,
          available:false
        },
        {
          name: 'trimestre',
          nameCode: 't',
          description: 'aggregation par trimestres',
          timeRepetition: 4,
          timeStepBetweenRepetitions: {
            type: 'months',
            step: 3
          },
          position: 4,
          show:true,
          available:false
        },
        {
          name: 'an',
          nameCode: 'a',
          description: 'aggregation par ans',
          timeRepetition: 3,
          timeStepBetweenRepetitions: {
            type: 'months',
            step: 12
          },
          position: 5,
          show:true,
          available:false
        }
      ],
      geoAggregations: [
        {
          name: 'departement',
          nameCode: 'dpt',
          description: 'aggregation par departement',
          position: 1,
          show:true,
          available:false
        },
        {
          name: 'zone de couverture',
          nameCode: 'zdc',
          description: 'aggregation par zone de couverture',
          position: 2,
          show:true,
          available:false
        },
        {
          name: 'commune',
          nameCode: 'com',
          description: 'aggregation par commune',
          position: 3,
          show:true,
          available:true
        }
      ]
    }
  },
  getters: {
    /**
     * [retrieve the configuration of a time code
     *
     * Used in Slider.vue to calculate end Date]
     * @param  {[type]} state [the code for a time aggregation]
     * @return {[type]}       [the whole configuration related, or undefined]
     */
    slider_timeAggregationConfiguration: state => timeAggregationNameCodeArg => {
      let timeAggregation
      try {
        timeAggregation = state.configuration.timeAggregations.find(timeAggregation => timeAggregation.nameCode === timeAggregationNameCodeArg)
        if (!timeAggregation) {
          throw 'timeAggregation not defined for: ' + timeAggregationNameCodeArg
        }
      } catch (e) {
        console.log('error', e);
        return
      }
      return timeAggregation
    }
  },
  mutations: {
    filters_updateCategory: (state, newCategoryCode) => {
      state.filters.currentCategorInter = newCategoryCode;
    },
    filters_updateGeoAggregation: (state, newGeoAggregation) => {
      state.filters.currentGeoAggregation = newGeoAggregation;
    },
    filters_updateTimeAggregation: (state, newTimeAggregation) => {
      state.filters.currentTimeAggregation = newTimeAggregation;
    },
    reloadData: (state, newData) => {
      console.log('result newData.elasticsearchResult', newData.elasticsearchResult);
      state.data[newData.dataSubset] = newData.elasticsearchResult;
      state.dataHasBeenUpdated += 1
    },
    slider_updateDateBegin: (state, newData) => {
      state.slider.begin = newData;
    },
    slider_updateCurrentPosition: (state, newData) => {
      state.slider.currentPosition = newData;
    }
  },
  actions: {
    filters_updateCategory: (context, newCategoryCode) => {
      context.commit('filters_updateCategory', newCategoryCode)
      context.dispatch('reloadData', ['pre'])
    },
    filters_updateGeoAggregation: (context, newGeoAggregation) => {
      context.commit('filters_updateGeoAggregation', newGeoAggregation)
      context.dispatch('reloadData', ['geo'])
    },
    filters_updateTimeAggregation: (context, newTimeAggregation) => {
      return new Promise((resolve, reject) => {
        context.commit('filters_updateTimeAggregation', newTimeAggregation)
        context.dispatch('reloadData', ['pre']).then(function() {
          try {
            let dateBegin = context.state.data.pre.hits.hits[0]._source.pre_001_is
            context.commit('slider_updateDateBegin', dateBegin)
            resolve()
          } catch (e) {
            console.log('problem with state.data.pre.hits.hits[0]._source.pre_001_is -> ', e);
          }
        })
      })
    },
    /**
    * [getNewData will create the query and then fetch the result for one dataset like 'int'. dataSubset has been checked in the reloadData function, so no need to double check here]
    * @param  {object} context    [store context]
    * @param  {string} dataSubset [string, that is defined in the assets/configuration.json   -> for instance could be 'int']
    * @return {object}            [result of the query]
    */
    getNewData(context, dataSubset) {
      let query = es.function_createQuery(context.state, dataSubset)
      console.log(query, dataSubset);
      return es.search(dataSubset, query)
    },
    /**
     * [reloadData will trigger the elasticsearch request and update the store with the result]
     * @param  {object} context     [store context]
     * @param  {[string]} dataSubsets [array of strings, that are defined in the assets/configuration json. for instance could be ['int','geo']   ]
     * @return {object}             [nothing]
     */
    reloadData: (context, dataSubsets) => {
      return new Promise((resolve, reject) => {
        if (Array.isArray(dataSubsets)) {
          dataSubsets.forEach((dataSubset, i) => {
            //here we make sure the dataSubset is one of those defined in the assets/configuration.json
            if (typeof dataSubset === 'string' && typeof configuration.indexes[dataSubset] === 'string') {
              context.dispatch('getNewData', dataSubset).then(function(values) {
                let result = {
                  'dataSubset': dataSubset,
                  'elasticsearchResult': values
                };
                context.commit('reloadData', result)
                //on reslve uniquement quand tout les commit sont effectues
                if (i === dataSubsets.length - 1) {
                  resolve()
                }
              })
            } else {
              console.log('dataSubset: ', dataSubset, ' needs to be part of the configuration json, like int or geo');
            }
          })
        } else {
          console.log('dataSubsets needs to be an array of string');
        }
      })
    }
  }

})
