import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

export const store =  new VueX.Store({
  state:{
    filters:{
      hideAllFilters: false,
      currentCategorInter: 'suap',
      currentTimeAggregation: 'j',
      currentGeoAggregation: 'com',
    },
    carte:{
      zoom:10
    },
    data:{

    },
    configuration:{
      categorInter: [
        {
          name: 'SUAP',
          nameCode: 'suap',
          description: 'Secours a personne',
          position: 1,
          show:true
        },
        {
          name: 'Accident',
          nameCode: 'acc',
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
      timeAggregation:[
        {
          name: 'jour',
          nameCode: 'j',
          description: 'aggregation par jours',
          position: 1,
          show:true
        },
        {
          name: 'semaine',
          nameCode: 's',
          description: 'aggregation par semaines',
          position: 2,
          show:true
        },
        {
          name: 'mois',
          nameCode: 'm',
          description: 'aggregation par mois',
          position: 3,
          show:true
        },
        {
          name: 'trimestre',
          nameCode: 't',
          description: 'aggregation par trimestres',
          position: 4,
          show:true
        },
        {
          name: 'an',
          nameCode: 'a',
          description: 'aggregation par ans',
          position: 5,
          show:true
        }
      ],
      geoAggregation:[
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
   //  saleProduct: state => {
   //    return state.products.map( product => {
   //         return { name: product.name + 'changed', price : product.price * 0.8
   //        }
   //      }
   //    )
   // }
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
 }

})
