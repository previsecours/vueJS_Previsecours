<template>
  <div class='sliders'>
    <span>
      <div ref='slider' class='slider'></div>
    </span>
  </div>
</template>

<script>
import slider from 'nouislider'
import 'nouislider/distribute/nouislider.css'

export default {
  data () {
    return {
      currentTimeAggregationData: 1
    }
  },
  computed:{
    currentTimeAggregation: function(){
      return  this.$store.state.filters.currentTimeAggregation
    },
    currentPosition: function(){
      return  this.$store.state.slider.currentPosition
    },
    begin: function(){
      return  this.$store.state.slider.begin
    },
    beginHELP: function(){
      return  new Date(this.begin).toLocaleDateString()
    },
    timeAggregationConfiguration: function(){
      return this.$store.getters.slider_timeAggregationConfiguration(this.$store.state.filters.currentTimeAggregation)
    },
    step : function(){
      return  this.timeAggregationConfiguration.timeStepBetweenRepetitions.step *
      this.timeAggregationConfiguration.timeRepetition
    },
    end: function() {
      return this.$moment(this.begin).add(
        this.step,
        this.timeAggregationConfiguration.timeStepBetweenRepetitions.type ).valueOf();
      //return new Date(new Date().setDate(new Date().getDate()+5)).getTime()
    },
    endHELP: function(){
      return new Date(this.end).toLocaleDateString()
    },

  },
  methods: {
    formatTooltip: function(val){
      let options, tooltip
      let nameCode = this.timeAggregationConfiguration.nameCode
      switch (nameCode) {
        case 'j':
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            tooltip = new Date(val).toLocaleDateString("fr-FR",options)
          break;
        case 's':
            options = { weekday: 'short', month: 'long', day: 'numeric' };
            tooltip = 'semaine debutant le ' + new Date(val).toLocaleDateString("fr-FR",options)
          break;
        case 'm':
            options = { year: 'numeric', month: 'long' };
            tooltip = new Date(val).toLocaleDateString("fr-FR",options)
          break;
        case 't':
            options = { month: 'long' };
            tooltip = 'trimestre debutant en ' + new Date(val).toLocaleDateString("fr-FR",options)
          break;
        case 'a':
            options = { year: 'numeric'};
            tooltip = new Date(val).toLocaleDateString("fr-FR",options)
          break;
        default:
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            tooltip = new Date(val).toLocaleDateString("fr-FR",options)
      }
      return tooltip
    },
    formatStep: function(){
      let stepDay = 1000 * 60 * 60 * 24
      try {
          switch (this.timeAggregationConfiguration.nameCode) {
            case 'j':
              stepDay *= 1
              break;
            case 's':
              stepDay *= 7
              break;
            case 'm':
              stepDay *= 31
              break;
            case 't':
              stepDay *= 3 * 31
              break;
            case 'a':
              stepDay *= 365
              break;
            default:
              stepDay *= 1
              break;
          }
      } catch (e) {
        console.log('error in formatStep: ',e);
      }
      return stepDay;
    },
    updateSlider: function(){
      let vueCompo = this;
      this.$refs.slider.noUiSlider.updateOptions({
        range:{
          min: vueCompo.begin,
          max: vueCompo.end
        },
        step: vueCompo.formatStep(),
      })
    },
    // setYear (type) {
    //   this.$store.dispatch('set_dates', {
    //     dates: [Math.floor(this.begin[type]), Math.floor(this.end[type])],
    //     router: this.$router,
    //     type: type
    //   })
    // }
  },
  watch: {
    currentTimeAggregation() {
      this.updateSlider()
    }
  },
  mounted () {
    slider.create(this.$refs.slider, {
      start: this.begin,//new Date(new Date().setDate(new Date().getDate()+3)).getTime(),
      behaviour: 'tap-drag',
      connect: true,
      range: {
        min: this.begin,
        max: this.end
      },
      step: this.formatStep(),
      tooltips: [{ to: this.formatTooltip }],
      animate: true,
    })
    // .on('update', function(){
    //   console.log('this.begin, this.end', values);
    // })
  }
}
</script>

<style>
.sliders {
  position: fixed;
  bottom: 10px;
  left: 40%;
  margin-bottom: 4em;
  z-index: 2000;
  width: 300px;
  height: 40px;
}

.slider {
  margin-top: 3.5em;
  margin-bottom: 5em;
}

.noUi-tooltip {
  padding: 2px !important;
  font-size: 12px;
}
.slider .noUi-connect {
  background: rgb(253, 32, 32);
  border-radius: 0px;
}

.pve .noUi-connect {
  background: rgb(9, 9, 253);
  border-radius: 0px;
}

.noUi-handle::after {
    left: 4px !important;
}

.noUi-handle::before {
  left: 8px !important;
}

.noUi-handle {
  outline:none;
}

.noUi-handle-lower {
  /* border-radius: 10px 0px 0px 10px !important; */
  width: 16px !important;
  left: -15px !important;
}

.noUi-handle-upper {
  /* border-radius: 0px 10px 10px 0px !important; */
  width: 16px !important;
  left: -1px !important;
}

.offsetTooltip .noUi-handle-upper .noUi-tooltip {
  bottom: 220% !important;
}

.noUi-tooltip {
  font-size: 14px;
}

.noUi-origin{
  left:100% !important;
}
</style>
