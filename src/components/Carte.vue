<template>
<div style="height: 100%; width: 100%;" class="custom-popup">
  <l-map style="height: 100%" :zoom="zoom" :center="center" ref="map">
    <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    <l-geo-json ref='firstLoadgeojson' :geojson="geojson" :options="options"></l-geo-json>
    <l-geo-json ref='loadCasernesgeojson' :geojson="geojson_forCasernes" :options="options_casernes" :visible="showCasernes"></l-geo-json>
  </l-map>
</div>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LGeoJson
} from 'vue2-leaflet'

// we define the main vue js script
export default {
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
  },
  data() {
    return {
      //map
      center: L.latLng(48.2603, 2.0941),
      //tile layer
      url: 'https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png',
      attribution: '<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',
      //other map component


      //pour les goejson
      options_bases: {
        style: function() {
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
      options_casernes: {
        pointToLayer: function (feature, latlng) {
          let importanceDuCentre = 1;
          switch (feature.properties.TYP_CS_COD) {
            case 'CSP':
              importanceDuCentre = 3
              break;
            case 'CS':
              importanceDuCentre = 2
              break;
            case 'CPI':
              importanceDuCentre = 1
              break;
          }
          let sizeMultiplier = 1 + importanceDuCentre / 3

          let caserneIcon = L.icon({
            iconUrl: 'static/caserne.png',
            iconSize: [10 * sizeMultiplier, 15 * sizeMultiplier],
            iconAnchor: [16, 37],
            popupAnchor: [-15, -35]
          });
          return L.marker(latlng, {icon: caserneIcon });
        },
        onEachFeature: (feature, layer) =>  {

          layer.bindPopup("<div>"+feature.properties.NOM+" ("+feature.properties.TYP_CS_COD+") </div> <i class='leaflet-title'> groupement "+feature.properties.GROUPEMENT+" </i>");
        }
      },
      styleScaleType: 'perClass_green2red',
      geojson_layer: undefined,
    }
  },
  computed: {
    zoom() {
      return this.$store.state.carte.zoom;
    },
    currentPosition() {
      return this.$store.state.slider.currentPosition;
    },
    dataHasBeenUpdated() {
      return this.$store.state.dataHasBeenUpdated;
    },
    showCasernes() {
      return this.$store.state.filters.showCasernes;
    },
    options() {
      let options = this.options_bases
      options.style = this.getStyle(this.styleScaleType)
      options.currentPosition = this.currentPosition
      options.onEachFeature = this.onEachFeature
      return options
    },
    geojson_fromES() {
      try {
        let features_fromES = this.$store.state.data.geo.hits.hits;
        let FeatureCollection = {
          "type": "FeatureCollection",
          "features": []
        }
        features_fromES.map((feature) => {
          FeatureCollection.features.push(feature._source)
        });
        return FeatureCollection
      } catch (e) {
        console.log(' Carte.vue error', e.toString().slice(0,100));
        return {
          "type": "FeatureCollection",
          "features": [{
            "type": "Feature",
            "geometry": {
              "type": "Polygon",
              "coordinates": [
                [
                  [-0.811195, 47.063489],
                  [-0.803104, 47.063683],
                  [-0.797096, 47.067122]
                ]
              ]
            },
            "properties": {
              "code": "49195"
            }
          }]
        }
      }
    },
    geojson_forCasernes() {
      try {
        let features_fromES = this.$store.state.data.cas.hits.hits;
        let FeatureCollection = {
          "type": "FeatureCollection",
          "features": []
        }
        features_fromES.map((feature) => {
          FeatureCollection.features.push(feature._source)
        });
        return FeatureCollection
      } catch (e) {
        console.log(' Carte.vue error', e.toString().slice(0,100));
        return {
          "type": "FeatureCollection",
          "features": []
        }
      }
    },
    predictions() {
      try {
        let features_fromES = this.$store.state.data.pre.hits.hits;
        return features_fromES.map((feature) => {
          return feature._source
        });
      } catch (e) {
        console.log(' Carte.vue error', e.toString().slice(0,100));
        return {};
      }
    },
    geojson() {
      let geojson = this.geojson_fromES
      let merged = geojson.features.map((feature) => {
        try {
          feature.properties.prediction = this.predictions.find(prediction => prediction.geo_id === feature.properties.code)
          feature.properties.currentPosition = this.currentPosition
        } catch (e) {
          console.log('ca marche pas ouf CARTE.VUE -> this.predictions.find( prediction => prediction.geo_id ===  feature.properties.code)', e.toString().slice(0,100));
        }
      })
      return geojson
    },

  },
  methods: {
    onEachFeature(feature, layer) {
      if (feature.properties && feature.properties.nom) {
        const threePoints = (feature.properties.nom.length > 12) ? "..." : "";
        let predictionInter = 'non disponible',
          classeInter = 'non disponible',
          moy3ansInter = 'non disponible'
        try {
          let pre = feature.properties.prediction
          let pos = this.formatCurrentPosition(feature.properties.currentPosition)
          predictionInter = pre['pre_' + pos] || predictionInter
          classeInter = pre['cla_' + pos] || classeInter
          moy3ansInter = pre['po_' + pos] || moy3ansInter
        } catch (e) {
          console.log(e.toString(), '\r\r    \r', feature.properties.nom);
        }
        layer.bindPopup("<div>" + predictionInter + " interventions predites <p> <p>Reference pour cette periode: "+ moy3ansInter +" </p> classe: " + this.int2classe(classeInter) + " </p></div> <i class='leaflet-title'>" + feature.properties.nom.slice(0, 12) +
          threePoints + "</i>");
      }
      // layer.on({
      //   click: this.testfct(layer)
      // })
    },
    refreshGeoJson() {
      let map = this.$refs.map.mapObject;
      // we need to split between first load and refresh, since on first load it has to wait for geoson request to finish
      if (this.geojson_layer === undefined) {
        map.removeLayer(this.$refs.firstLoadgeojson.mapObject)
        this.geojson_layer = L.geoJSON(this.geojson, this.options).addTo(map);
      } else {
        map.removeLayer(this.geojson_layer)
        this.geojson_layer = L.geoJSON(this.geojson, this.options).addTo(map);
      }
    },
    getStyle(style) {
      let styleFct
      switch (style) {
        case 'perClass_green2red':
          let color = '#e4ce7f'
          return (feature) => {
            try {
              let pos = feature.properties.currentPosition
              let pre = feature.properties.prediction
              color = this.green2red(pre['cla_' + this.formatCurrentPosition(pos)])
            } catch (e) {
              console.log('feature not ready OR bug');
            }
            return {
              weight: 1,
              color: '#FFFAFA',
              opacity: 0.9,
              dashArray: '2',
              fillColor: color,
              fillOpacity: 0.5
            }
          }
          break;
        default:
          styleFct = this.options_bases.style
      }
      return styleFct
    },
    //Here we set up small function that are helpers to other functions
    formatCurrentPosition(currentPosition) {
      return ('000' + currentPosition).slice(-3)
    },
    green2red(i) {
      let res
      switch (i) {
        case 1:
          res = '#7fe4a1'
          break;
        case 2:
          res = '#02b93f'
          break;
        case 3:
          res = '#ffffff'
          break;
        case 4:
          res = '#f58888'
          break;
        case 5:
          res = '#ff1818'
          break;
        default:
          res = '#7fe4a1'
      }
      return res
    },
    int2classe(i) {
      let res
      switch (i) {
        case 1:
          res = 'tres faible'
          break;
        case 2:
          res = 'faible'
          break;
        case 3:
          res = 'moyenne'
          break;
        case 4:
          res = 'forte'
          break;
        case 5:
          res = 'exceptionelle'
          break;
        default:
          res = 'moyenne'
      }
      return res
    }
  },
  watch: {
    currentPosition() {
      this.refreshGeoJson()
    },
    dataHasBeenUpdated() {
      this.refreshGeoJson()
    }
  },
  mounted() {
    this.$store.dispatch('filters_updateGeoAggregation', this.$store.state.filters.currentGeoAggregation);
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
  float: left;
  width: 208px;
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
  background: #2c3e50 !important;
  color: #fff;
  font-size: 16px;
  line-height: 24px;
}

.custom-popup .leaflet-popup-content-wrapper {
  color: rgba(255, 255, 255, 0.5);
  border-radius: 3px;
}

.custom-popup .leaflet-popup-content {
  margin: 15px 25px;
  padding-top: 10px;
  text-align: center;
}

.custom-popup .leaflet-popup-tip-container {
  /* width:35px;
      height:15px;
      margin-left:-25px; */
}

.custom-popup .leaflet-popup-tip {
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 15px solid #2c3e50;
  background: #2c3e50;
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
