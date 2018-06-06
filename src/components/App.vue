<template>
  <div style="width:100%; height:100%; margin:0px">
    <Carte></Carte>
    <Filters></Filters>
    <Slider></Slider>
    <ButtonPrint></ButtonPrint>
    <ButtonExport></ButtonExport>
  </div>
</template>

<script>
import Carte from './Carte.vue'
import Filters from './Filters.vue'
import Slider from './reusable/Slider.vue'
import ButtonPrint from './ButtonPrint.vue'
import ButtonExport from './ButtonExport.vue'
export default {
  components: {
    Carte,
    Filters,
    Slider,
    ButtonPrint,
    ButtonExport,
  },
}
</script>
