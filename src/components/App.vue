<template>
  <div style="width:100%; height:100%; margin:0px" ref='refForScreenshot'>
    <Carte></Carte>
    <Filters></Filters>
    <Slider></Slider>
    <ButtonPrint></ButtonPrint>
    <ButtonExport></ButtonExport>
    <ButtonCasernes></ButtonCasernes>
    <Information></Information>
  </div>
</template>

<script>
import Carte from './Carte.vue'
import Filters from './Filters.vue'
import Slider from './reusable/Slider.vue'
import ButtonPrint from './ButtonPrint.vue'
import ButtonExport from './ButtonExport.vue'
import ButtonCasernes from './ButtonCasernes.vue'
import Information from './Information.vue'
export default {
  components: {
    Carte,
    Filters,
    Slider,
    ButtonPrint,
    ButtonExport,
    ButtonCasernes,
    Information,
  },
}
</script>
