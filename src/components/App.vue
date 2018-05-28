<template>
  <div style="width:100%; height:100%; margin:0px">
    <Carte></Carte>
    <Filters></Filters>
  </div>
</template>

<script>
import Carte from './Carte.vue'
import Filters from './Filters.vue'

export default {
  components: {
    Carte,
    Filters
  },
}
</script>
