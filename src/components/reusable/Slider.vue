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
    sliderRangeBegin: function(){
      return 1
    },
    sliderRangeEnd: function(){
      return this.timeAggregationConfiguration.timeRepetition
    },
    beginDate: function(){
      return this.$store.state.slider.begin
    },
    timeAggregationConfiguration: function(){
      return this.$store.getters.slider_timeAggregationConfiguration(this.currentTimeAggregation)
    },
  },
  methods: {
    formatTooltip: function(val){
      let options, tooltip
//new version
      let timeStepBetweenRepetition = this.timeAggregationConfiguration.timeStepBetweenRepetitions
      let timeFromDateBegin = this.$moment(this.beginDate).add(val * timeStepBetweenRepetition.step,timeStepBetweenRepetition.type).valueOf()
//end new version
      let nameCode = this.timeAggregationConfiguration.nameCode
      switch (nameCode) {
        case 'j':
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
          break;
        case 's':
            options = { weekday: 'short', month: 'long', day: 'numeric' };
            tooltip = 'semaine debutant le ' + new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
          break;
        case 'm':
            options = { year: 'numeric', month: 'long' };
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
          break;
        case 't':
            options = { month: 'long' };
            tooltip = 'trimestre debutant en ' + new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
          break;
        case 'a':
            options = { year: 'numeric'};
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
          break;
        default:
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)
      }
      return tooltip
    },
    updateSlider: function(){
      let vueCompo = this;
      this.$refs.slider.noUiSlider.updateOptions({
        range:{
          min: vueCompo.sliderRangeBegin,
          max: vueCompo.sliderRangeEnd
        },
        step: 1,
      })
    },
  },
  watch: {
    currentTimeAggregation() {
      this.updateSlider()
    }
  },
  mounted(){
    let vueCompo = this;
    this.$store.dispatch('filters_updateTimeAggregation',this.$store.state.filters.currentTimeAggregation).then(() => {
        slider.create(this.$refs.slider, {
          start: this.sliderRangeBegin,//new Date(new Date().setDate(new Date().getDate()+3)).getTime(),
          behaviour: 'tap-drag',
          connect: true,
          range: {
            min: this.sliderRangeBegin,
            max: this.sliderRangeEnd
          },
          step: 1,
          tooltips: [{ to: this.formatTooltip }],
          animate: true,
        })
        .on('update', function(values){
          vueCompo.$store.commit('slider_updateCurrentPosition',parseInt(values[0]))
          // console.log('values on update', values);
        })
    })
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
