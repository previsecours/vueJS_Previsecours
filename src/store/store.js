import Vue from 'vue';
import VueX from 'vuex';

Vue.use(VueX);

export const store =  new VueX.Store({
  state:{
    filters:{
      hideAllFilters: false,
      currentCategorInter: 'suap',
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
          nameCode: 'incU',
          description: 'Incendie en milieu urbain',
          position: 3,
          show:true
        },
        {
          name: 'Incendie Nat',
          nameCode: 'incN',
          description: 'Incendie en milieu naturel',
          position: 4,
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
  }
})
