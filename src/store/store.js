import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

import es from './elasticsearch.js'

console.log(
  es.searchSimpleFilter(
    'geo',
    'properties.OBJECTID',
    16
  )
)

export const store =  new VueX.Store({
  state:{
    /**
     * [current status of filters on which we base the queries to database]
     * @type {Object}
     */
    filters:{
      hideAllFilters: false,
      currentCategorInter: 'suap',
      currentTimeAggregation: 'j',
      currentGeoAggregation: 'com',
    },
    /**
     * [initial zoom for map.]
     * @type {Object}
     */
    carte:{
      zoom:10
    },
    data:{

    },
    /**
     * [current status of the slider.
     * Initial value defined here as well.]
     * @type {Object}
     *       begin: Date().getTime() First date on the slider = range min
     *       currentPosition: INT how many steps betwwen time MIN and current time. the time for one step is defined in configuration.timeAggregation
     */
    slider:{
      /**
       * [date BEGIN to choose which day, month... to see on the map.
       * Unix Timestamp (milliseconds)   ex: 1528620491576   ]
       * @type {Date}
       */
      begin: new Date().getTime(),
      currentPosition:1
    },
    configuration:{
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
          show:true
        },
        {
          name: 'Accident',
          nameCode: 'acci',
          description: 'Accident de la route',
          position: 2,
          show:true
        },
        {
          name: 'Incendie Urb',
          nameCode: 'incu',
          description: 'Incendie en milieu urbain',
          position: 3,
          show:true
        },
        {
          name: 'Incendie Nat',
          nameCode: 'incn',
          description: 'Incendie en milieu naturel',
          position: 4,
          show:true
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
      timeAggregations:[
        {
          name: 'jour',
          nameCode: 'j',
          description: 'aggregation par jours',
          timeRepetition:5,
          timeStepBetweenRepetitions: { type: 'days', step: 1},
          position: 1,
          show:true
        },
        {
          name: 'semaine',
          nameCode: 's',
          description: 'aggregation par semaines',
          timeRepetition:5,
          timeStepBetweenRepetitions: { type: 'days', step: 7},
          position: 2,
          show:true
        },
        {
          name: 'mois',
          nameCode: 'm',
          description: 'aggregation par mois',
          timeRepetition:5,
          timeStepBetweenRepetitions: { type: 'months', step: 1},
          position: 3,
          show:true
        },
        {
          name: 'trimestre',
          nameCode: 't',
          description: 'aggregation par trimestres',
          timeRepetition:5,
          timeStepBetweenRepetitions: { type: 'months', step: 3},
          position: 4,
          show:true
        },
        {
          name: 'an',
          nameCode: 'a',
          description: 'aggregation par ans',
          timeRepetition:5,
          timeStepBetweenRepetitions: { type: 'months', step: 12},
          position: 5,
          show:true
        }
      ],
      geoAggregations:[
        {
          name: 'departement',
          nameCode: 'dpt',
          description: 'aggregation par departement',
          position: 1,
          show:true
        },
        {
          name: 'zone de couverture',
          nameCode: 'zdc',
          description: 'aggregation par zone de couverture',
          position: 2,
          show:true
        },
        {
          name: 'commune',
          nameCode: 'com',
          description: 'aggregation par commune',
          position: 3,
          show:true
        }
      ]
    }
  },
  getters:{
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
        timeAggregation = state.configuration.timeAggregations.find( timeAggregation => timeAggregation.nameCode ===  timeAggregationNameCodeArg)
        if(!timeAggregation){ throw 'timeAggregation not defined for: ' + timeAggregationNameCodeArg }
      } catch (e) {
        console.log('error',e);
        return
      }
      return timeAggregation
   }
 },
 mutations:{
   filters_updateCategory: (state,newCategoryCode) => {
       state.filters.currentCategorInter = newCategoryCode;
   },
   filters_updateGeoAggregation:(state,newGeoAggregation) => {
       state.filters.currentGeoAggregation = newGeoAggregation;
   },
   filters_updateTimeAggregation:(state,newTimeAggregation) => {
       state.filters.currentTimeAggregation = newTimeAggregation;
   },
 },
 actions: {
   filters_updateCategory: (context,newCategoryCode) => {
       context.commit('filters_updateCategory',newCategoryCode)
   },
   filters_updateGeoAggregation:(context,newGeoAggregation) => {
       context.commit('filters_updateGeoAggregation',newGeoAggregation)
   },
   filters_updateTimeAggregation:(context,newTimeAggregation) => {
       context.commit('filters_updateTimeAggregation',newTimeAggregation)
   },
 }

})
