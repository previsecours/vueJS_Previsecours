webpackJsonp([1],{"2bgv":function(e,t){},"3YjR":function(e,t){},"4llj":function(e,t){},"6y46":function(e,t){},BGHQ:function(e,t,n){"use strict";var r=n("bOdI"),i=n.n(r),s=n("/8Lx"),o=n.n(s),a=n("GOQh"),c=n.n(a);t.a={search:g,searchSimpleFilter:function(e,t,n){var r=function(e,t){return{size:arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,query:{match:i()({},e,t)}}}(t,n);return g(e,r)},function_createQuery:function(e,t){var n=void 0;switch(t){case"int":n=f(e);break;case"pre":n=function(e){var t=e.filters.currentDepartment,n=e.filters.currentCategorInter,r=e.filters.currentTimeAggregation,i=e.filters.currentGeoAggregation,s="function_createQueryPre - sdis"+t.toString()+"_"+i+"_"+n+"_"+r;return console.log(s),{query:{match:{prediction_type:s}},size:1e3}}(e);break;case"geo":n=function(e){var t=e.filters.currentDepartment,n=e.filters.currentGeoAggregation,r="function_createQueryGeo - sdis"+t.toString()+"_"+n;return console.log(r),{query:{match:{geotype:n}},size:1e3}}(e);break;default:n=f(e)}return n},function_createQueryLoadCasernes:function(e){return{query:{bool:{must:[{match:{geotype:"cas"}},{match:{"properties.codeDepartement":e}}]}},size:1e3}},function_createQueryPreForExport:function(e){return{query:{regexp:{prediction_type:"sdis"+e+".*"}},size:1e4}},function_createQueryGeoForExport:function(e){return{query:{regexp:{"properties.codeDepartement":e}},size:1e4}}};var u=window.location.protocol,l=window.location.host,d=u+"//"+l+"/api/";console.log("url for elasticsearch config",d);var p=new o.a.Client({host:d,apiVersion:"5.6"});function g(e,t){return c.a.indexes[e]?p.search({index:c.a.indexes[e],body:t}):(console.log("indexes[indexType] problem in SEARCH: ",c.a.indexes[e]),!1)}function f(e){var t=e.filters.currentDepartment,n=e.filters.currentCategorInter,r=e.filters.currentTimeAggregation,i=e.filters.currentGeoAggregation,s="function_createQueryInt - sdis"+t.toString()+"_"+i+"_"+n+"_"+r;return console.log(s),{query:{type:{value:s}},size:1e3}}},DWA8:function(e,t){},GOQh:function(e,t){e.exports={indexes:{int:"interventions",pre:"predictions",geo:"geographies"}}},Hpas:function(e,t,n){"use strict";(function(e){var r=n("MdIv");n.n(r);t.a={components:{LMap:r.LMap,LTileLayer:r.LTileLayer,LGeoJson:r.LGeoJson},data:function(){return{center:L.latLng(48.2603,2.0941),url:"https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",attribution:'<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',options_bases:{style:function(){return{weight:1,color:"#FFFAFA",opacity:.9,dashArray:"2",fillColor:"#e4ce7f",fillOpacity:.5}}},options_casernes:{pointToLayer:function(e,t){var n=1;switch(e.properties.TYP_CS_COD){case"CSP":n=3;break;case"CS":n=2;break;case"CPI":n=1}var r=1+n/3,i=L.icon({iconUrl:"static/caserne.png",iconSize:[10*r,15*r],iconAnchor:[16,37],popupAnchor:[-15,-35]});return L.marker(t,{icon:i})},onEachFeature:function(e,t){t.bindPopup("<div>"+e.properties.NOM+" ("+e.properties.TYP_CS_COD+") </div> <i class='leaflet-title'> groupement "+e.properties.GROUPEMENT+" </i>")}},styleScaleType:"perClass_green2red",geojson_layer:void 0}},computed:{zoom:function(){return this.$store.state.carte.zoom},currentPosition:function(){return this.$store.state.slider.currentPosition},dataHasBeenUpdated:function(){return this.$store.state.dataHasBeenUpdated},showCasernes:function(){return this.$store.state.filters.showCasernes},options:function(){var e=this.options_bases;return e.style=this.getStyle(this.styleScaleType),e.currentPosition=this.currentPosition,e.onEachFeature=this.onEachFeature,e},geojson_fromES:function(){try{var e=this.$store.state.data.geo.hits.hits,t={type:"FeatureCollection",features:[]};return e.map(function(e){t.features.push(e._source)}),t}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[[[-.811195,47.063489],[-.803104,47.063683],[-.797096,47.067122]]]},properties:{code:"49195"}}]}}},geojson_forCasernes:function(){try{var e=this.$store.state.data.cas.hits.hits,t={type:"FeatureCollection",features:[]};return e.map(function(e){t.features.push(e._source)}),t}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{type:"FeatureCollection",features:[]}}},predictions:function(){try{return this.$store.state.data.pre.hits.hits.map(function(e){return e._source})}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{}}},geojson:function(){var e=this,t=this.geojson_fromES;t.features.map(function(t){try{t.properties.prediction=e.predictions.find(function(e){return e.geo_id===t.properties.code}),t.properties.currentPosition=e.currentPosition}catch(e){console.log("ca marche pas ouf CARTE.VUE -> this.predictions.find( prediction => prediction.geo_id ===  feature.properties.code)",e.toString().slice(0,100))}});return t}},methods:{onEachFeature:function(t,n){var r=this;if(t.properties&&t.properties.nom){var i=(screen.width||500)<700?15:50,s=t.properties.nom.length>i?"...":"",o="--",a="non disponible",c="non disponible",u="#d6d6d6";try{var l=t.properties.prediction,d=this.formatCurrentPosition(t.properties.currentPosition);o=l["pre_"+d]||0===l["pre_"+d]?l["pre_"+d]:o,a=l["cla_"+d]||0===l["cla_"+d]?l["cla_"+d]:a,c=l["po_"+d]||0===l["po_"+d]?l["po_"+d]:c,u=this.green2red(a),e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("classeInter,colorClasse",a,u)}catch(e){console.log(e.toString(),"\r\r    \r",t.properties.nom)}var p=String(o),g=p.split(".")&&p.split(".")[0]?p.split(".")[0]:p,f=p.split(".")&&p.split(".")[1]?p.split(".")[1]:"";f=3-g.length>0?"."+f.slice(0,3-g.length):"";var h=this.$store.state.configuration.categorInters.find(function(e){return e.nameCode===r.$store.state.filters.currentCategorInter}).name,m=this.$store.state.configuration.timeAggregations.find(function(e){return e.nameCode===r.$store.state.filters.currentTimeAggregation}).name,v=this.$store.state.configuration.geoAggregations.find(function(e){return e.nameCode===r.$store.state.filters.currentGeoAggregation}).name;n.bindPopup("<div class='flexCombo firstDivRow'><div class='flexCombo secondDivCol'> <span class='predictions flexCombo' style='border-color:"+u+"'> <span class='number'>"+g+" <span class='smaller2'> "+f+"</span> </span> </span> <span class='smaller'>interventions predites</span> <span style='color:"+u+"'> (classe: "+this.int2classe(a)+") </span> </div><div class='flexCombo secondDivCol'> <span> Reference </span> <span>"+c+"</span> <span class='smaller'> (moyenne sur 3ans pour: "+h+",  "+m+",  "+v+") </span> </div><i class='leaflet-title'>"+t.properties.nom.slice(0,i)+s+"</i> </div>")}},refreshGeoJson:function(){var e=this.$refs.map.mapObject;void 0===this.geojson_layer?(e.removeLayer(this.$refs.firstLoadgeojson.mapObject),this.geojson_layer=L.geoJSON(this.geojson,this.options).addTo(e)):(e.removeLayer(this.geojson_layer),this.geojson_layer=L.geoJSON(this.geojson,this.options).addTo(e))},getStyle:function(e){var t=this,n=void 0;switch(e){case"perClass_green2red":var r="#e4ce7f";return function(e){try{var n=e.properties.currentPosition,i=e.properties.prediction;r=t.green2red(i["cla_"+t.formatCurrentPosition(n)])}catch(e){console.log("feature not ready OR bug")}return{weight:1,color:"#505050",opacity:.9,dashArray:"2",fillColor:r,fillOpacity:.5}};default:n=this.options_bases.style}return n},formatCurrentPosition:function(e){return("000"+e).slice(-3)},green2red:function(e){var t=void 0;switch(e){case 1:t="#7fe4a1";break;case 2:t="#02b93f";break;case 3:t="#ffffff";break;case 4:t="#f58888";break;case 5:t="#ff1818";break;default:t="#7fe4a1"}return t},int2classe:function(e){var t=void 0;switch(e){case 1:t="tres faible";break;case 2:t="faible";break;case 3:t="moyenne";break;case 4:t="forte";break;case 5:t="tres forte";break;default:t="moyenne"}return t}},watch:{currentPosition:function(){this.refreshGeoJson()},dataHasBeenUpdated:function(){this.refreshGeoJson()}},mounted:function(){this.$store.dispatch("filters_updateGeoAggregation",this.$store.state.filters.currentGeoAggregation)}}}).call(t,n("W2nU"))},MvTM:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),i=n("Hpas"),s={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"custom-popup",staticStyle:{height:"100%",width:"100%"}},[n("l-map",{ref:"map",staticStyle:{height:"100%"},attrs:{zoom:e.zoom,center:e.center}},[n("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._v(" "),n("l-geo-json",{ref:"firstLoadgeojson",attrs:{geojson:e.geojson,options:e.options}}),e._v(" "),n("l-geo-json",{ref:"loadCasernesgeojson",attrs:{geojson:e.geojson_forCasernes,options:e.options_casernes,visible:e.showCasernes}})],1)],1)},staticRenderFns:[]};var o=function(e){n("DWA8"),n("ivJC")},a=n("VU/8")(i.a,s,!1,o,"data-v-3f34dcc5",null).exports,c=n("pW2n"),u=n.n(c),l=new r.a,d={data:function(){return{selectedOption:{name:""},showMenu:!1,placeholderText:"Please select an item"}},props:{options:{type:[Array,Object]},selected:{},placeholder:[String],iconName:String},mounted:function(){var e=this;this.selectedOption=this.selected,this.placeholder&&(this.placeholderText=this.placeholder),l.$on("i-got-clicked",function(){e.showMenu=!1})},methods:{updateOption:function(e){this.selectedOption=e,this.showMenu=!1,this.$emit("updateOption",this.selectedOption)},toggleMenu:function(){!1===this.showMenu&&l.$emit("i-got-clicked","if you listen to this, please close yourself"),this.showMenu=!this.showMenu}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"btn-group"},[void 0!==e.selectedOption.name?n("li",{staticClass:"dropdown-toggle",on:{click:function(t){e.toggleMenu()}}},[n("font-awesome-icon",{attrs:{icon:this.iconName}}),e._v(" "+e._s(e.selectedOption.name)+"\n    "),n("span",{staticClass:"caret"})],1):e._e(),e._v(" "),void 0===e.selectedOption.name?n("li",{staticClass:"dropdown-toggle",on:{click:function(t){e.toggleMenu()}}},[n("font-awesome-icon",{attrs:{icon:this.iconName}}),e._v(" "+e._s(e.placeholderText)+"\n    "),n("span",{staticClass:"caret"})],1):e._e(),e._v(" "),e.showMenu?n("ul",{staticClass:"dropdown-menu closeDropdownIfOpen"},e._l(e.options,function(t){return n("li",[t.available?e._e():n("a",{staticClass:"disabled"},[e._v("\n                    "+e._s(t.name)+"\n                ")]),e._v(" "),t.available?n("a",{on:{click:function(n){e.updateOption(t)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")]):e._e()])})):e._e()])},staticRenderFns:[]};var g=n("VU/8")(d,p,!1,function(e){n("jVs4")},"data-v-98c5d22c",null).exports,f={components:{dropdown:g},data:function(){return{iconName:"truck"}},computed:{categorInter:function(){return this.$store.state.configuration.categorInters},firstSelected:function(){var e=this;return this.$store.state.configuration.categorInters.find(function(t){return t.nameCode===e.$store.state.filters.currentCategorInter})}},methods:{filters_updateCategory:function(e){this.$store.dispatch("filters_updateCategory",e.nameCode),console.log("action a produire lorsque on selectionne une categorie d intervention de dropdown",e)}}},h={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"filterCategorInter"}},[t("dropdown",{attrs:{options:this.categorInter,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateCategory}})],1)},staticRenderFns:[]};var m={components:{dropdown:g},data:function(){return{iconName:"calendar-alt"}},computed:{timeAggregation:function(){return this.$store.state.configuration.timeAggregations},firstSelected:function(){var e=this;return this.$store.state.configuration.timeAggregations.find(function(t){return t.nameCode===e.$store.state.filters.currentTimeAggregation})}},methods:{filters_updateTimeAggregation:function(e){this.$store.dispatch("filters_updateTimeAggregation",e.nameCode),console.log("action a produire si selection de ",e)}}},v={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"FilterTimeAggregation"}},[t("dropdown",{attrs:{options:this.timeAggregation,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateTimeAggregation}})],1)},staticRenderFns:[]};var _={components:{dropdown:g},data:function(){return{iconName:"map-signs"}},computed:{geoAggregation:function(){return this.$store.state.configuration.geoAggregations},firstSelected:function(){var e=this;return this.$store.state.configuration.geoAggregations.find(function(t){return t.nameCode===e.$store.state.filters.currentGeoAggregation})}},methods:{filters_updateGeoAggregation:function(e){this.$store.dispatch("filters_updateGeoAggregation",e.nameCode),console.log("action a produire lorsque on selectionne une geo aggregation de dropdown",e)}}},j={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"FilterGeoAggregation"}},[t("dropdown",{attrs:{options:this.geoAggregation,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateGeoAggregation}})],1)},staticRenderFns:[]};var y={components:{FilterCategorInter:n("VU/8")(f,h,!1,function(e){n("VglX")},"data-v-93db9622",null).exports,FilterTimeAggregation:n("VU/8")(m,v,!1,function(e){n("rBQb")},"data-v-4122319a",null).exports,FilterGeoAggregation:n("VU/8")(_,j,!1,function(e){n("2bgv")},"data-v-02ed8b86",null).exports},data:function(){return{version:u.a.version}},computed:{hideAllFilters:function(){return this.$store.state.filters.hideAllFilters}}},b={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:!this.hideAllFilters,expression:"!hideAllFilters"}],attrs:{id:"filters"}},[t("FilterCategorInter"),this._v(" "),t("FilterTimeAggregation"),this._v(" "),t("FilterGeoAggregation")],1)},staticRenderFns:[]};var C=n("VU/8")(y,b,!1,function(e){n("Z9cN")},"data-v-2ef48a5e",null).exports,w=n("zF5W"),A=n.n(w),E=(n("4llj"),{data:function(){return{currentTimeAggregationData:1}},computed:{currentTimeAggregation:function(){return this.$store.state.filters.currentTimeAggregation},currentPosition:function(){return this.$store.state.slider.currentPosition},sliderRangeBegin:function(){return 1},sliderRangeEnd:function(){return this.timeAggregationConfiguration.timeRepetition},beginDate:function(){return this.$store.state.slider.begin},timeAggregationConfiguration:function(){return this.$store.getters.slider_timeAggregationConfiguration(this.currentTimeAggregation)}},methods:{formatTooltip:function(e){e-=1;var t=void 0,n=void 0,r=this.timeAggregationConfiguration.timeStepBetweenRepetitions,i=this.$moment(new Date(this.beginDate)).add(e*r.step,r.type).valueOf();switch(this.timeAggregationConfiguration.nameCode){case"j":t={weekday:"long",year:"numeric",month:"long",day:"numeric"},n=new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")";break;case"s":t={weekday:"short",month:"long",day:"numeric",year:"numeric"},n="semaine débutant le "+new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")";break;case"m":t={year:"numeric",month:"long"},n=new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")";break;case"t":t={month:"long",year:"numeric"},n="trimestre débutant en "+new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")";break;case"a":t={year:"numeric"},n=new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")";break;default:t={weekday:"long",year:"numeric",month:"long",day:"numeric"},n=new Date(i).toLocaleDateString("fr-FR",t)+" (nº"+e+")"}return n},updateSlider:function(){this.$refs.slider.noUiSlider.updateOptions({range:{min:this.sliderRangeBegin,max:this.sliderRangeEnd},step:1,start:1})}},watch:{currentTimeAggregation:function(){this.updateSlider()}},mounted:function(){var e=this,t=this;this.$store.dispatch("filters_updateTimeAggregation",this.$store.state.filters.currentTimeAggregation).then(function(){A.a.create(e.$refs.slider,{start:e.sliderRangeBegin,behaviour:"tap-drag",connect:!0,range:{min:e.sliderRangeBegin,max:e.sliderRangeEnd},step:1,tooltips:[{to:e.formatTooltip}],animate:!0}).on("update",function(e){t.$store.commit("slider_updateCurrentPosition",parseInt(e[0]))})})}}),F={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"sliders"},[t("span",[t("div",{ref:"slider",staticClass:"slider"})])])},staticRenderFns:[]};var S=n("VU/8")(E,F,!1,function(e){n("MvTM")},null,null).exports,k={props:{iconName:String}},D={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"btn-group"},[t("li",{staticClass:"dropdown-toggle"},[t("font-awesome-icon",{attrs:{icon:this.iconName}})],1)])},staticRenderFns:[]};var x=n("VU/8")(k,D,!1,function(e){n("e8iV")},"data-v-02c2c223",null).exports,R=n("sTcZ"),O=n.n(R),$={components:{buttonprint:x},data:function(){return{iconName:"print",show:!0}},methods:{clickEvent:function(){this.show=!1;var e=this;O.a.toJpeg(this.$parent.$refs.refForScreenshot,{quality:.99}).then(function(t){var n=document.createElement("a");n.download="previsecours.jpeg",n.href=t,n.click(),e.show=!0}).catch(function(e){console.error("oops, screenshot went wrong!",e)})}}},N={render:function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:"slide-fade"}},[this.show?t("div",{attrs:{id:"ButtonPrint"},on:{click:this.clickEvent}},[t("buttonprint",{attrs:{iconName:this.iconName}})],1):this._e()])},staticRenderFns:[]};var z=n("VU/8")($,N,!1,function(e){n("W3x2")},"data-v-afe6200c",null).exports,P=n("a7Rd"),T=n.n(P),L=n("fZjL"),B=n.n(L),U=n("//Fk"),G=n.n(U),I=n("BGHQ"),q=n("pFYg"),M=n.n(q),V=n("Dd8w"),H=n.n(V),Q=n("aFK5"),W=n.n(Q),J={components:{buttonprint:x},props:{jsonData:{type:Array,required:!0},csvTitle:{type:[String,Number],default:"csv",required:!1},showLabels:{type:Boolean,default:!0,required:!1},labels:{type:Object,required:!1},icon:{type:String,required:!1}},data:function(){return{csvLabels:null,csvData:null}},destroyed:function(){this.csvLabels=null,this.csvData=null},methods:{handleClick:function(){var e=B()(this._events).indexOf("error")>-1,t=B()(this._events).indexOf("success")>-1;if(this.jsonData.length)if(!this.labels||B()(this.labels).length){var n=W()(H()({},this.jsonData[0])),r=this.labels||this.$_createCsvLabelsConf(n);if(this.csvLabels=this.showLabels?this.$_createCsvLabels(r):"",this.csvData=this.$_createCsvContent(this.jsonData,r),"error"!==this.csvLabels&&"error"!==this.csvData){var i=this.csvLabels+this.csvData,s=this.$_downloadCsv("csv-"+this._uid,i,this.csvTitle);s||this.handleError("An error has occured",e),s&&t&&this.$emit("success",!0)}else this.handleError("Error: An error occured while parsing the data.",e)}else this.handleError("Error: Labels are empty",e);else this.handleError("Error: Data are empty",e)},handleError:function(e,t){throw e},$_createCsvLabelsConf:function(e){var t={};return e.map(function(e,n){t[e]={title:e}}),t},$_createCsvLabels:function(e){var t="",n="";try{B()(e).map(function(n,r){t+='"'+e[n].title+'",'}),n+=(t=t.slice(0,-1))+"\r\n"}catch(e){n="error"}finally{return n}},$_createCsvContent:function(e,t){var n="",r="",i="",s=new Array;e.forEach(function(e){e&&s.push(e)});try{s.map(function(e,s){n="",B()(t).map(function(t,r){i=M()(e[t]),n+="number"===i||"float"===i?e[t]+",":'"'+e[t]+'",'}),n=n.slice(0,-1),r+=n+"\r\n"})}catch(e){r="error"}finally{return r}},$_downloadCsv:function(e,t,n){try{var r="data:text/csv;charset=utf-8,"+encodeURI(t),i=document.createElement("a");return i.id="csv-"+e,i.href=r,document.body.appendChild(i),document.getElementById(i.id).style.visibility="hidden",document.getElementById(i.id).download=n+".csv",document.body.appendChild(i),document.getElementById(i.id).click(),setTimeout(function(){document.body.removeChild(i)}),!0}catch(e){return!1}}}},X={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{attrs:{id:"json-to-csv-"+this._uid},on:{click:this.handleClick}},[t("buttonprint",{attrs:{iconName:this.icon}})],1)},staticRenderFns:[]},Z={components:{JsonToCsv:n("VU/8")(J,X,!1,null,null,null).exports},data:function(){return{iconName:"database",data:[]}},mounted:function(){this.getData()},methods:{getData:function(){console.log("vue component trigggering loadDataForExport");var e=I.a.function_createQueryPreForExport(this.$store.state.filters.currentDepartment),t=I.a.function_createQueryGeoForExport(this.$store.state.filters.currentDepartment),n=I.a.search("pre",e),r=I.a.search("geo",t),i=this;G.a.all([n,r].map(function(e){return e.catch(function(e){return e})})).then(function(e){var t=e[0].hits.hits,n=e[1].hits.hits,r=t.map(function(e){try{var t=n.find(function(t){return e._source.geo_id===t._source.properties.code})._source;e._source.nom=t.properties.NOM?t.properties.NOM:t.properties.nom,e._source.maille_geographique=i.rename(t.geotype,"maille_geographique"),e._source.hasOwnProperty("prediction_type")&&(e._source.maille_temporelle=i.rename(i.getFreqAndCat(e._source.prediction_type)[0],"maille_temporelle"),e._source.categorie=i.rename(i.getFreqAndCat(e._source.prediction_type)[1],"categorie"),delete e._source.prediction_type),e._source.hasOwnProperty("pre_001_is")&&(e._source.date_de_reference=i.rename(e._source.pre_001_is,"pre_001_is"),delete e._source.pre_001_is);var r=B()(e._source);return T()(r),r.forEach(function(t){i.rename(t,"label")!==t&&(e._source[i.rename(t,"label")]=e._source[t],delete e._source[t])}),e._source}catch(e){console.log("pb avec le mapping geo_id = code dans l export de data",e.toString().slice(0,100))}});i.data=r}).catch(function(e){return console.log("error is ",e)})},rename:function(e,t){if("maille_geographique"===t)switch(e){case"com":return"commune";case"zdc":return"zone de couverture";case"dpt":return"departement";default:return"commune"}else if("label"===t){var n=e.split("_")?e.split("_")[0]:"",r=e.split("_")?e.split("_")[1]:"";switch(n){case"pre":return"Prediction "+r;case"cla":return"Classe "+r;case"po":return"Reference "+r;default:return e}}else{if("pre_001_is"===t)return"Le debut de la premiere iteration est le "+e;if("maille_temporelle"===t)switch(e){case"j":return"quotidien";case"s":return"hebdomadaire";case"m":return"mensuel";case"t":return"trimestriel";case"a":return"annuel";default:return e}else if("categorie"===t)switch(e){case"suap":return"SUAP: Secours d'urgence aux personnes";case"incn":return"Incendies en milieu naturel";case"incu":return"Incendies en milieu urbain";case"acci":return"Accidents de la route";case"coia":return"Incendies et Accidents";default:return e}}return e},getFreqAndCat:function(e){var t=e.split("_")&&e.split("_")[2]?e.split("_")[2]:"";return[e.split("_")&&e.split("_")[3]?e.split("_")[3]:"",t]}}},Y={render:function(){var e=this.$createElement;return(this._self._c||e)("JsonToCsv",{attrs:{id:"ButtonExport","json-data":this.data,"csv-title":"previsecours_predictions",icon:this.iconName}})},staticRenderFns:[]};var K={components:{buttonprint:x},data:function(){return{iconName:"building"}},methods:{clickEvent:function(){this.$store.commit("toogleCasernes")}},mounted:function(){this.$store.dispatch("loadCasernes")}},ee={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"ButtonCasernes"},on:{click:this.clickEvent}},[t("buttonprint",{attrs:{iconName:this.iconName}})],1)},staticRenderFns:[]};var te={components:{Carte:a,Filters:C,Slider:S,ButtonPrint:z,ButtonExport:n("VU/8")(Z,Y,!1,function(e){n("6y46")},null,null).exports,ButtonCasernes:n("VU/8")(K,ee,!1,function(e){n("3YjR")},"data-v-4a148632",null).exports}},ne={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{ref:"refForScreenshot",staticStyle:{width:"100%",height:"100%",margin:"0px"}},[t("Carte"),this._v(" "),t("Filters"),this._v(" "),t("Slider"),this._v(" "),t("ButtonPrint"),this._v(" "),t("ButtonExport"),this._v(" "),t("ButtonCasernes")],1)},staticRenderFns:[]},re=n("VU/8")(te,ne,!1,null,null,null).exports,ie=n("wtEF"),se=n("/ocq");r.a.use(se.a);var oe=new se.a({routes:[{path:"/",name:"Home"}]}),ae=n("QxPg"),ce=n("1P+R"),ue=n("mZf6"),le=n.n(ue),de=n("U0v6"),pe=n("2xhc");r.a.config.productionTip=!1,ae.a.library.add(ce.a,le.a),r.a.component("font-awesome-icon",de.FontAwesomeIcon),r.a.use(pe.a),new r.a({store:ie.a,router:oe,el:"#previsecoursMainApp",components:{App:re},template:"<App/>"})},VglX:function(e,t){},W3x2:function(e,t){},Z9cN:function(e,t){},e8iV:function(e,t){},ivJC:function(e,t){},jVs4:function(e,t){},pW2n:function(e,t){e.exports={version:.1}},rBQb:function(e,t){},uslO:function(e,t,n){var r={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(e){return n(s(e))}function s(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(r)},i.resolve=s,e.exports=i,i.id="uslO"},wtEF:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return l});var r=n("//Fk"),i=n.n(r),s=n("7+uW"),o=n("NYxO"),a=n("BGHQ"),c=n("GOQh"),u=n.n(c);s.a.use(o.a);var l=new o.a.Store({state:{filters:{hideAllFilters:!1,currentCategorInter:"suap",currentTimeAggregation:"s",currentGeoAggregation:"com",currentDepartment:91,showCasernes:!0},carte:{zoom:10},data:{geo:{},int:{},pre:{},cas:{}},dataHasBeenUpdated:0,slider:{begin:"",currentPosition:1},configuration:{categorInters:[{name:"SUAP",nameCode:"suap",description:"Secours a personne",position:1,show:!0,available:!0},{name:"Accident",nameCode:"acci",description:"Accident de la route",position:2,show:!0,available:!0},{name:"Incendie Urb",nameCode:"incu",description:"Incendie en milieu urbain",position:3,show:!0,available:!0},{name:"Incendie Nat",nameCode:"incn",description:"Incendie en milieu naturel",position:4,show:!0,available:!0},{name:"Incendie & Accident",nameCode:"coia",description:"Incendie (naturel et urbain) et accident",position:5,show:!0,available:!1}],timeAggregations:[{name:"jour",nameCode:"j",description:"aggregation par jours",timeRepetition:5,timeStepBetweenRepetitions:{type:"days",step:1},position:1,show:!0,available:!1},{name:"semaine",nameCode:"s",description:"aggregation par semaines",timeRepetition:36,timeStepBetweenRepetitions:{type:"days",step:7},position:2,show:!0,available:!0},{name:"mois",nameCode:"m",description:"aggregation par mois",timeRepetition:12,timeStepBetweenRepetitions:{type:"months",step:1},position:3,show:!0,available:!1},{name:"trimestre",nameCode:"t",description:"aggregation par trimestres",timeRepetition:4,timeStepBetweenRepetitions:{type:"months",step:3},position:4,show:!0,available:!1},{name:"an",nameCode:"a",description:"aggregation par ans",timeRepetition:3,timeStepBetweenRepetitions:{type:"months",step:12},position:5,show:!0,available:!1}],geoAggregations:[{name:"departement",nameCode:"dpt",description:"aggregation par departement",position:1,show:!0,available:!1},{name:"zone de couverture",nameCode:"zdc",description:"aggregation par zone de couverture",position:2,show:!0,available:!0},{name:"commune",nameCode:"com",description:"aggregation par commune",position:3,show:!0,available:!0}]}},getters:{slider_timeAggregationConfiguration:function(e){return function(t){var n=void 0;try{if(!(n=e.configuration.timeAggregations.find(function(e){return e.nameCode===t})))throw"timeAggregation not defined for: "+t}catch(e){return void console.log("error",e)}return n}}},mutations:{filters_updateCategory:function(e,t){e.filters.currentCategorInter=t},filters_updateGeoAggregation:function(e,t){e.filters.currentGeoAggregation=t},filters_updateTimeAggregation:function(e,t){e.filters.currentTimeAggregation=t},reloadData:function(t,n){e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("result newData.elasticsearchResult",n.elasticsearchResult),t.data[n.dataSubset]=n.elasticsearchResult,t.dataHasBeenUpdated+=1},slider_updateDateBegin:function(e,t){e.slider.begin=t},slider_updateCurrentPosition:function(e,t){e.slider.currentPosition=t},toogleCasernes:function(e){e.filters.showCasernes=!e.filters.showCasernes}},actions:{filters_updateCategory:function(e,t){e.commit("filters_updateCategory",t),e.dispatch("reloadData",["pre"])},filters_updateGeoAggregation:function(e,t){e.commit("filters_updateGeoAggregation",t),e.dispatch("reloadData",["geo"])},filters_updateTimeAggregation:function(e,t){return new i.a(function(n,r){e.commit("filters_updateTimeAggregation",t),e.dispatch("reloadData",["pre"]).then(function(){try{var t=e.state.data.pre.hits.hits[0]._source.pre_001_is;e.commit("slider_updateDateBegin",t),n()}catch(e){console.log("problem with state.data.pre.hits.hits[0]._source.pre_001_is -> ",e)}})})},getNewData:function(t,n){var r=a.a.function_createQuery(t.state,n);return e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log(r,n),a.a.search(n,r)},reloadData:function(e,t){return new i.a(function(n,r){Array.isArray(t)?t.forEach(function(r,i){"string"==typeof r&&"string"==typeof u.a.indexes[r]?e.dispatch("getNewData",r).then(function(s){var o={dataSubset:r,elasticsearchResult:s};e.commit("reloadData",o),i===t.length-1&&n()}):console.log("dataSubset: ",r," needs to be part of the configuration json, like int or geo")}):console.log("dataSubsets needs to be an array of string")})},loadCasernes:function(e){return console.log("on est dans toogleCasernes"),new i.a(function(t,n){var r=a.a.function_createQueryLoadCasernes(e.state.filters.currentDepartment);a.a.search("geo",r).then(function(n){var r={dataSubset:"cas",elasticsearchResult:n};e.commit("reloadData",r),t()})})}}})}).call(t,n("W2nU"))}},["NHnr"]);
//# sourceMappingURL=app.48b17b839f8c5b88b008.js.map