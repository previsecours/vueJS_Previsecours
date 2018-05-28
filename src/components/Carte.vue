<template>
  <div style="height: 100%; width: 100%;">
    <l-map style="height: 100%" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker" :icon="baseballIcon"></l-marker>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker } from 'vue2-leaflet'


var baseballIcon = L.icon({
  iconUrl: 'static/images/baseball-marker.svg',
  iconSize: [32, 37],
  iconAnchor: [16, 37],
  popupAnchor: [0, -28]
});


export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      center: L.latLng(47.413220, -1.219482),
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.2195),
      baseballIcon:L.icon({
        iconUrl: 'src/assets/marker.svg',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
      })
    }
  },
  computed: {
    zoom(){
      return this.$store.state.carte.zoom;
    }
  },
  methods:{
    printLog(){
      console.log(this.$store.getters.saleProduct);
    }
  }
}
</script>

<style>
    .leaflet-fake-icon-image-2x {
    background-image: url(../../node_modules/leaflet/dist/images/marker-icon.png);
    }
    .leaflet-fake-icon-shadow {
    background-image: url(../../node_modules/leaflet/dist/images/marker-shadow.png);
    }
    @import "../../node_modules/leaflet/dist/leaflet.css";
    body {
    margin: 0px;
    font-family: Helvetica, Verdana, sans-serif;
    }
    #side {
    float:left;
    width:208px;
    }
    #full_div {
    position: absolute;
    overflow-x: auto;
    top: 0;
    right: 0;
    left: 208px;
    bottom: 0;
    padding-left: 8px;
    border-left: 1px solid #ccc;
    }
    ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    }
    li {
    font: 200 15px/1.5 Helvetica, Verdana, sans-serif;
    border-bottom: 1px solid #ccc;
    }
    li:last-child {
    border: none;
    }
    li a {
    font-size: 15px;
    padding-left: 8px;
    text-decoration: none;
    color: #000;
    display: block;
    -webkit-transition: font-size 0.3s ease, background-color 0.3s ease;
    -moz-transition: font-size 0.3s ease, background-color 0.3s ease;
    -o-transition: font-size 0.3s ease, background-color 0.3s ease;
    -ms-transition: font-size 0.3s ease, background-color 0.3s ease;
    transition: font-size 0.3s ease, background-color 0.3s ease;
    }
    li a:hover {
    font-size: 20px;
    background: #f6f6f6;
    }
</style>
