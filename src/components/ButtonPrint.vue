<template>
  <transition name="slide-fade">
    <div id="ButtonPrint" v-on:click="clickEvent" v-if="show">
      <buttonprint v-bind:iconName="iconName" ></buttonprint>
    </div>
  </transition>
</template>

<script>
import buttonprint from './reusable/Button.vue'
import domtoimage from 'dom-to-image';
export default {
  components: {
    buttonprint,
  },
  data () {
    return {
      iconName: 'print',
      show: true
    }
  },
  methods:{
    clickEvent: function(){
      this.show = false
      let insideThis = this
      domtoimage.toJpeg(this.$parent.$refs.refForScreenshot, { quality: 0.99 }).then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'previsecours.jpeg';
          link.href = dataUrl;
          link.click();
          insideThis.show = true
      })
      .catch(function (error) { console.error('oops, screenshot went wrong!', error);  });
    }
  }
}
</script>

<style scoped>
  #ButtonPrint{
    position: fixed;
    top: 10px;
    right: 1%;
    background-color: white;
    z-index:1000;
  }
  .clickedClass{
    color: red;
    background-color: green;
  }

   /* how to fade */
  .slide-fade-enter-active {
    transition: all .4s ease;
  }
  .slide-fade-leave-active {
    transition: all .05s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
