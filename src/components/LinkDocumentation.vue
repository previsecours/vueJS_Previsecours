<template>
  <div id="linkDocumentation" v-on:click="clickEvent">
    <h5>Lien vers la documentation</h5>
    <buttonDoc v-bind:iconName="iconName"></buttonDoc>
  </div>
</template>

<script>
import es from '../store/elasticsearch.js'
import buttonDoc from './reusable/Button.vue'

export default {
  components: {
    buttonDoc
  },
  data () {
    return {
      iconName: 'book',
      data : [],
    }
  },
  methods:{
    clickEvent: function(){
      window.open('https://previsecours.fr/documentation', '_blank');
    }
  }
}
</script>


<style scoped>
#linkDocumentation{
  position: absolute;
  bottom: 180px;
  right: 105px;
  width: 100px;
  background-color: #f6f6f6;
  color: #636b6f;
  text-align: center;
  border: 1px solid lightgray;
}
#linkDocumentation ul {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
#linkDocumentation li {
  list-style: none;
  padding: 5px 0px 5px 0px;
  min-width: 90px;
  width: 100%;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
