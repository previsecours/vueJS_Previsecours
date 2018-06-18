<template>
  <div style="height: 100%; width: 100%;" class="custom-popup">
    <l-map style="height: 100%" :zoom="zoom" :center="center" ref="map">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker :lat-lng="marker" :icon="baseballIcon"></l-marker>
      <l-geo-json ref='firstLoadgeojson' :geojson="geojson" :options="options"></l-geo-json>
    </l-map>
  </div>
</template>

<script>
import {LMap, LTileLayer, LMarker, LGeoJson } from 'vue2-leaflet'



// function _perc2color(perc,scale,colorMin,colorMax) {
//     color = d3.scale.linear().domain([1,scale])
//           .interpolate(d3.interpolateHcl)
//           .range([d3.rgb(colorMin), d3.rgb(colorMax)]);
//     return color(perc);
// }

// function style(feature) {
//     var varForColorization = (feature.properties.prediction.pre_1) ? parseFloat(feature.properties.prediction.pre_1) : 0;
//     var colorCoded = '#ffffff';
//         // colorCoded = _perc2colorRED(Math.round( varForColorization / 1 ), 100);
//     return {
//             weight: 1,
//             opacity: 1,
//             color: '#FFFAFA',
//             dashArray: '2',
//             fillOpacity: 0.5,
//             fillColor: colorCoded,
//         };
// }


// we define the main vue js script
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LGeoJson,
  },
  data() {
    return {
      //map
      center: L.latLng(48.2603, 2.0941),
      //tile layer
      url:'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      //other map component
      marker: L.latLng(47.413220, -1.2195),
      baseballIcon:L.icon({
        iconUrl: 'src/assets/marker.svg',
        iconSize: [32, 37],
        iconAnchor: [16, 37],
        popupAnchor: [0, -28]
      }),


      //pour les goejson
      options_bases: {
        style: function () {
          return {
            weight: 1,
            color: '#FFFAFA',
            opacity: 0.9,
            dashArray: '2',
            fillColor: '#e4ce7f',
            fillOpacity: 0.5
          }
        }
      },
      geojson_layer: undefined,






      //from cartav
      contourLayerGroup: L.layerGroup(),
      contourLayer: null,
      detailedContentLayerGroup: L.featureGroup(),
      geojsonAccLayer: null,
      infoSidebarData: {
        hoverInfoData: {
          areaMouseOver: '',
          ratio: '',
          accidentsN: '',
          pveN: '',
          km_voie: ''
        },
        showGraph: false,
        graphData: {}
      },
      roadAccidentsLayerGroup: L.layerGroup(),
      zoomActive: false,
      //fin de from cartav





    }
  },
  computed: {
    zoom(){
      return this.$store.state.carte.zoom;
    },
    currentPosition(){
      return this.$store.state.slider.currentPosition;
    },
    options(){
      let options = this.options_bases
      options.currentPosition = this.currentPosition
      options.onEachFeature = this.onEachFeature
      return options
    },
    geojson_fromES(){
      try {
        let features_fromES = this.$store.state.data.geo.hits.hits;
        let FeatureCollection = {"type":"FeatureCollection","features":[]}
        features_fromES.map((feature) => { FeatureCollection.features.push(feature._source)});
        return FeatureCollection
      } catch(e){console.log(' Carte.vue error',e); return {
        "type":"FeatureCollection","features":[{"type":"Feature","geometry":{"type":"Polygon","coordinates":[[[-0.811195,47.063489],[-0.803104,47.063683],[-0.797096,47.067122]]]},"properties":{"code":"49195"}}]}
       }
    },
    predictions(){
      try {
        let features_fromES = this.$store.state.data.pre.hits.hits;
        return features_fromES.map((feature) => { return feature._source});
      } catch(e){console.log(' Carte.vue error',e); return {}; }
    },
    geojson(){
      let geojson = this.geojson_fromES
      let merged = geojson.features.map((feature) => {
        try {
            feature.properties.prediction = this.predictions.find( prediction => prediction.geo_id ===  feature.properties.code)
            feature.properties.currentPosition = this.currentPosition
        } catch (e) { console.log('ca marche pas ouf CARTE.VUE -> this.predictions.find( prediction => prediction.geo_id ===  feature.properties.code)',e); }
      })
      return geojson
    },

  },
  methods:{
    onEachFeature(feature, layer){
      if (feature.properties && feature.properties.nom) {
          const threePoints = (feature.properties.nom.length > 12) ? "..." : "";
          let prediction
          try {
            let currentPositionFormatted = ('000' + feature.properties.currentPosition).slice(-3)
            prediction = feature.properties.prediction['pre_'+currentPositionFormatted]
          } catch (e) { console.log(e.toString(),'\r\r    \r',feature.properties.nom);
            prediction = 'non disponible'
          }
          layer.bindPopup("<div><i class='icon-ambulance'></i> " + prediction + "</div> <i class='leaflet-title'>" + feature.properties.nom.slice(0, 12) + threePoints +"</i>");
      }
      // layer.on({
      //   click: this.testfct(layer)
      // })
    },
    refreshGeoJson(){
      let map = this.$refs.map.mapObject;
      // we need to split between first load and refresh, since on first load it has to wait for geoson request to finish
      if(this.geojson_layer === undefined) {
        console.log('intial');
        map.removeLayer(this.$refs.firstLoadgeojson.mapObject)
        this.geojson_layer = L.geoJSON(this.geojson, this.options).addTo(map);
      }else{
        console.log('relaod');
        map.removeLayer(this.geojson_layer)
        this.geojson_layer = L.geoJSON(this.geojson, this.options).addTo(map);
      }
    }
  },
  watch: {
    currentPosition() {
      this.refreshGeoJson()
    }
  },
  mounted(){
    this.$store.dispatch('filters_updateGeoAggregation',this.$store.state.filters.currentGeoAggregation);
  }
}
</script>












































































<style scoped>
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


<style>
    /* custom styling for tooltip */

    .custom-popup .leaflet-popup-content-wrapper {
      background:#2c3e50 !important;
      color:#fff;
      font-size:16px;
      line-height:24px;
      }
    .custom-popup .leaflet-popup-content-wrapper{
      color:rgba(255,255,255,0.5);
      border-radius: 3px;
      }
    .custom-popup .leaflet-popup-content{
      margin: 15px 25px;
      padding-top:10px;
      text-align: center;
      }
    .custom-popup .leaflet-popup-tip-container {
      /* width:35px;
      height:15px;
      margin-left:-25px; */
      }
    .custom-popup .leaflet-popup-tip {
      border-left:15px solid transparent;
      border-right:15px solid transparent;
      border-top:15px solid #2c3e50;
      background:#2c3e50;
      margin: -25px 0 0 0;
      height: 10px;
      width: 10px;
    }
    .custom-popup .leaflet-title {
      position: absolute;
      top: 0;
      left: 0;
      padding: 8px 0px 0 4px;
      border: none;
      text-align: left;
      width: 85%;
      height: 20px;
      line-height: 13px;
      font: 10px/8px Tahoma, Verdana, sans-serif;
      color: #c3c3c3;
      text-decoration: none;
      font-style: italic;
      background: transparent;
      overflow: hidden;
      text-overflow: ellipsis;
    }
</style>
