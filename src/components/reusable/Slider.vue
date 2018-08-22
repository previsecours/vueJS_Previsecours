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
    sliderStartPosition: function(){
      return this.getTodayCorrespondingValue()
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
      val = Math.round(val) //pour ne pas avoir de bug d'affichage type 20.99999999999996 a la palce de 21 comme ca devrait l'etre
      let val_for_timeFromDateBegin = val - 1  //car val commence a 1 mais non on veut que ca commence a 0 pour avoir le debut de la premiere semaine
      let options, tooltip
      let timeStepBetweenRepetition = this.timeAggregationConfiguration.timeStepBetweenRepetitions
      let timeFromDateBegin = this.$moment( new Date(this.beginDate) ).add(val_for_timeFromDateBegin * timeStepBetweenRepetition.step,timeStepBetweenRepetition.type).valueOf()
      let nameCode = this.timeAggregationConfiguration.nameCode
      switch (nameCode) {
        case 'j':
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
          break;
        case 's':
            options = { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric'};
            tooltip = 'semaine débutant le ' + new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
          break;
        case 'm':
            options = { year: 'numeric', month: 'long' };
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
          break;
        case 't':
            options = { month: 'long', year: 'numeric' };
            tooltip = 'trimestre débutant en ' + new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
          break;
        case 'a':
            options = { year: 'numeric'};
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
          break;
        default:
            options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
            tooltip = new Date(timeFromDateBegin).toLocaleDateString("fr-FR",options)  + " (nº" + val + ")"
      }
      return tooltip
    },
    getTodayCorrespondingValue: function(){
      try {
        let timeStepBetweenRepetition = this.timeAggregationConfiguration.timeStepBetweenRepetitions
        let timeFromDateBegin = this.$moment( new Date(this.beginDate) )
        let timeFromDateEnd = this.$moment( new Date(this.beginDate) ).add(this.sliderRangeEnd * timeStepBetweenRepetition.step,timeStepBetweenRepetition.type)
        let nameCode = this.timeAggregationConfiguration.nameCode
        let timeNow = this.$moment()
        let todayCorrespondingValue
        if (process && process.env && process.env.DEBUG_MODE) {
          console.log('this.beginDate: ', this.$store.state.slider.begin);
          console.log('timeFromDateBegin: ', timeFromDateBegin.format('Do MMM YYYY') );
          console.log('timeFromDateEnd:   ', timeFromDateEnd.format('Do MMM YYYY') );
          console.log('timeNow:           ', timeNow.format('Do MMM YYYY'));
        }
        if(!this.$moment(timeNow).isBetween(timeFromDateBegin,timeFromDateEnd) ) {
          if (process && process.env && process.env.DEBUG_MODE) { console.log('not in between');  } return 1
        }
        switch (nameCode) {
          case 'j':
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'days');
            break;
          case 's':
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'weeks');
            break;
          case 'm':
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'months');
            break;
          case 't':
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'months') / 3;
            break;
          case 'a':
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'years');
            break;
          default:
              todayCorrespondingValue = timeNow.diff(timeFromDateBegin,'weeks');
        }
        todayCorrespondingValue = Math.round(todayCorrespondingValue) + 1 //parceque le compte est a 0 par defaut sur moment, or nous commencons a 1
        if (process && process.env && process.env.DEBUG_MODE) { console.log('todayCorrespondingValue',todayCorrespondingValue, 'for nameCode type: ',nameCode); }
        return todayCorrespondingValue
      } catch (e) {
          console.log(e);
          return 1
      }
    },
    updateSlider: function(){
      let vueCompo = this;
      this.$refs.slider.noUiSlider.updateOptions({
        range:{
          min: vueCompo.sliderRangeBegin,
          max: vueCompo.sliderRangeEnd
        },
        step: 1,
        start:1
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
          start: this.sliderStartPosition,
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
