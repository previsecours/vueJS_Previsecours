<template>
    <div id="legende">
      <h3>Echelle de couleur</h3>
      <h5>relatif aux nombres d'interventions prédites</h5>
      <ul>
        <li v-for="obj in arrayLegende" v-bind:style="{'backgroundColor':obj.color,'color':obj.fontColor}">
            {{ obj.classe }}
        </li>
      </ul>
    </div>
</template>

<script>
import ColorFunctions from './mixins/ColorFunctions.js'

export default {
  mixins: [ColorFunctions],
  data () {
    return {
      hideOrnot: true,
    }
  },
  computed: {
    arrayLegende() {
      let arr = []
      for (var i = 1; i <= 5; i++) {
        let fontColor = 'inherit'
        if (i === 1 || i === 5) { fontColor = 'white'  }
        arr.push( {color: this.green2red(i), classe: this.int2classe(i), fontColor: fontColor} )
      }
      console.log(arr);
      return arr
    },
  }
}
</script>


<style>
  #legende{
    position: absolute;
    bottom: 40px;
    right: 0px;
    width: 100px;
    background-color: #f6f6f6;
    color: #636b6f;
    text-align: center;
    border: 1px solid lightgray;
  }
  #legende ul {
    list-style: none;
    padding: 0px;
    margin: 0px;
  }
  #legende li {
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
