webpackJsonp([1],{"+EjN":function(e,t){},"+j2C":function(e,t){},"/Dz2":function(e,t){},"3YjR":function(e,t){},"4llj":function(e,t){},"8YPl":function(e,t){},BGHQ:function(e,t,n){"use strict";var r=n("bOdI"),i=n.n(r),o=n("/8Lx"),s=n.n(o),a=n("GOQh"),c=n.n(a);t.a={search:f,searchSimpleFilter:function(e,t,n){var r=function(e,t){return{size:arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e3,query:{match:i()({},e,t)}}}(t,n);return f(e,r)},function_createQuery:function(e,t){var n=void 0;switch(t){case"int":n=g(e);break;case"pre":n=function(e){var t=e.filters.currentDepartment,n=e.filters.currentCategorInter,r=e.filters.currentTimeAggregation,i=e.filters.currentGeoAggregation,o="function_createQueryPre - sdis"+t.toString()+"_"+i+"_"+n+"_"+r;return console.log(o),{query:{match:{prediction_type:o}},size:1e3}}(e);break;case"geo":n=function(e){var t=e.filters.currentDepartment,n=e.filters.currentGeoAggregation,r="function_createQueryGeo - sdis"+t.toString()+"_"+n;return console.log(r),{query:{match:{geotype:n}},size:1e3}}(e);break;default:n=g(e)}return n},function_createQueryLoadCasernes:function(e){return{query:{bool:{must:[{match:{geotype:"cas"}},{match:{"properties.codeDepartement":e}}]}},size:1e3}},function_createQueryPreForExport:function(e){return{query:{regexp:{prediction_type:"sdis"+e+".*"}},size:1e4}},function_createQueryGeoForExport:function(e){return{query:{regexp:{"properties.codeDepartement":e}},size:1e4}},function_createQueryPreForExportLastUpdate:function(e){return{query:{regexp:{documentName:e}},size:1}}};var u=window.location.protocol,l=window.location.host,d=u+"//"+l+"/api/";console.log("url for elasticsearch config",d);var p=new s.a.Client({host:d,apiVersion:"5.6"});function f(e,t){return c.a.indexes[e]?p.search({index:c.a.indexes[e],body:t}):(console.log("indexes[indexType] problem in SEARCH: ",c.a.indexes[e]),!1)}function g(e){var t=e.filters.currentDepartment,n=e.filters.currentCategorInter,r=e.filters.currentTimeAggregation,i=e.filters.currentGeoAggregation,o="function_createQueryInt - sdis"+t.toString()+"_"+i+"_"+n+"_"+r;return console.log(o),{query:{type:{value:o}},size:1e3}}},BxpT:function(e,t){},GOQh:function(e,t){e.exports={indexes:{int:"interventions",pre:"predictions",geo:"geographies",doc:"documents"}}},Hpas:function(e,t,n){"use strict";(function(e){var r=n("MdIv"),i=(n.n(r),n("ceK1")),o=n.n(i);t.a={components:{LMap:r.LMap,LTileLayer:r.LTileLayer,LGeoJson:r.LGeoJson},mixins:[o.a],data:function(){return{center:L.latLng(48.5472,2.276),url:"https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}{r}.png",attribution:'<a href="https://wikimediafoundation.org/wiki/Maps_Terms_of_Use">Wikimedia</a>',options_bases:{style:function(){return{weight:1,color:"#FFFAFA",opacity:.9,dashArray:"2",fillColor:"#e4ce7f",fillOpacity:.5}}},options_casernes:{pointToLayer:function(e,t){var n=1;switch(e.properties.TYP_CS_COD){case"CSP":n=3;break;case"CS":n=2;break;case"CPI":n=1}var r=1+n/3,i=L.icon({iconUrl:"static/caserne.png",iconSize:[10*r,15*r],iconAnchor:[16,37],popupAnchor:[-15,-35]});return L.marker(t,{icon:i})},onEachFeature:function(e,t){t.bindPopup("<div>"+e.properties.NOM+" ("+e.properties.TYP_CS_COD+") </div> <i class='leaflet-title'> groupement "+e.properties.GROUPEMENT+" </i>")}},styleScaleType:"perClass_green2red",geojson_layer:void 0}},computed:{zoom:function(){return this.$store.state.carte.zoom},currentPosition:function(){return this.$store.state.slider.currentPosition},dataHasBeenUpdated:function(){return this.$store.state.dataHasBeenUpdated},showCasernes:function(){return this.$store.state.filters.showCasernes},options:function(){var e=this.options_bases;return e.style=this.getStyle(this.styleScaleType),e.currentPosition=this.currentPosition,e.onEachFeature=this.onEachFeature,e},geojson_fromES:function(){try{var e=this.$store.state.data.geo.hits.hits,t={type:"FeatureCollection",features:[]};return e.map(function(e){t.features.push(e._source)}),t}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{type:"FeatureCollection",features:[{type:"Feature",geometry:{type:"Polygon",coordinates:[[[-.811195,47.063489],[-.803104,47.063683],[-.797096,47.067122]]]},properties:{code:"49195"}}]}}},geojson_forCasernes:function(){try{var e=this.$store.state.data.cas.hits.hits,t={type:"FeatureCollection",features:[]};return e.map(function(e){t.features.push(e._source)}),t}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{type:"FeatureCollection",features:[]}}},predictions:function(){try{return this.$store.state.data.pre.hits.hits.map(function(e){return e._source})}catch(e){return console.log(" Carte.vue error",e.toString().slice(0,100)),{}}},geojson:function(){var e=this,t=this.geojson_fromES;t.features.map(function(t){try{t.properties.prediction=e.predictions.find(function(e){return e.geo_id===t.properties.code}),t.properties.currentPosition=e.currentPosition}catch(e){console.log("ca marche pas ouf CARTE.VUE -> this.predictions.find( prediction => prediction.geo_id ===  feature.properties.code)",e.toString().slice(0,100))}});return t}},methods:{onEachFeature:function(t,n){var r=this;if(t.properties&&t.properties.nom){var i=(screen.width||500)<700?15:50,o=t.properties.nom.length>i?"...":"",s="--",a="non disponible",c="non disponible",u="#d6d6d6";try{var l=t.properties.prediction,d=this.formatCurrentPosition(t.properties.currentPosition);s=l["pre_"+d]||0===l["pre_"+d]?l["pre_"+d]:s,a=l["cla_"+d]||0===l["cla_"+d]?l["cla_"+d]:a,c=l["po_"+d]||0===l["po_"+d]?l["po_"+d]:c,u=this.green2red(a),e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("classeInter,colorClasse",a,u)}catch(e){console.log(e.toString(),"\r\r    \r",t.properties.nom)}var p=String(s),f=p.split(".")&&p.split(".")[0]?p.split(".")[0]:p,g=(f=parseInt(f).toString())&&f>=1e3?"isAbove1000":"",m=p.split(".")&&p.split(".")[1]?p.split(".")[1]:"0";m=3-f.length>0?"."+m.slice(0,3-f.length):"";var h=this.$store.state.configuration.categorInters.find(function(e){return e.nameCode===r.$store.state.filters.currentCategorInter}).name,v=this.$store.state.configuration.timeAggregations.find(function(e){return e.nameCode===r.$store.state.filters.currentTimeAggregation}).name,_=this.$store.state.configuration.geoAggregations.find(function(e){return e.nameCode===r.$store.state.filters.currentGeoAggregation}).name;n.bindPopup("<div class='flexCombo firstDivRow'><div class='flexCombo secondDivCol'> <span class='predictions flexCombo "+g+"' style='border-color:"+u+"'> <span class='number'>"+f+" <span class='smaller2'> "+m+"</span> </span> </span> <span class='smaller'>interventions predites</span> <span style='color:"+u+"'> (classe: "+this.int2classe(a)+") </span> </div><div class='flexCombo secondDivCol'> <span> Reference </span> <span>"+c+"</span> <span class='smaller'> (moyenne sur 3ans pour: "+h+",  "+v+",  "+_+") </span> </div><i class='leaflet-title'>"+t.properties.nom.slice(0,i)+o+"</i> </div>")}},refreshGeoJson:function(){var e=this.$refs.map.mapObject;void 0===this.geojson_layer?(e.removeLayer(this.$refs.firstLoadgeojson.mapObject),this.geojson_layer=L.geoJSON(this.geojson,this.options).addTo(e)):(e.removeLayer(this.geojson_layer),this.geojson_layer=L.geoJSON(this.geojson,this.options).addTo(e))},getStyle:function(e){var t=this,n=void 0;switch(e){case"perClass_green2red":var r="#e4ce7f";return function(e){try{var n=e.properties.currentPosition,i=e.properties.prediction;r=t.green2red(i["cla_"+t.formatCurrentPosition(n)])}catch(e){console.log("feature not ready OR bug")}return{weight:1,color:"#505050",opacity:.9,dashArray:"2",fillColor:r,fillOpacity:.5}};default:n=this.options_bases.style}return n},formatCurrentPosition:function(e){return("000"+e).slice(-3)}},watch:{currentPosition:function(){this.refreshGeoJson()},dataHasBeenUpdated:function(){this.refreshGeoJson()}},mounted:function(){this.$store.dispatch("filters_updateGeoAggregation",this.$store.state.filters.currentGeoAggregation)}}}).call(t,n("W2nU"))},IqXX:function(e,t){},KEx8:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("7+uW"),i=n("Hpas"),o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"custom-popup",staticStyle:{height:"100%",width:"100%"}},[n("l-map",{ref:"map",staticStyle:{height:"100%"},attrs:{zoom:e.zoom,center:e.center}},[n("l-tile-layer",{attrs:{url:e.url,attribution:e.attribution}}),e._v(" "),n("l-geo-json",{ref:"firstLoadgeojson",attrs:{geojson:e.geojson,options:e.options}}),e._v(" "),n("l-geo-json",{ref:"loadCasernesgeojson",attrs:{geojson:e.geojson_forCasernes,options:e.options_casernes,visible:e.showCasernes}})],1)],1)},staticRenderFns:[]};var s=function(e){n("z4z5"),n("P/1S")},a=n("VU/8")(i.a,o,!1,s,"data-v-57257fe7",null).exports,c=n("pW2n"),u=n.n(c),l=new r.a,d={data:function(){return{selectedOption:{name:""},showMenu:!1,placeholderText:"Please select an item"}},props:{options:{type:[Array,Object]},selected:{},placeholder:[String],iconName:String},mounted:function(){var e=this;this.selectedOption=this.selected,this.placeholder&&(this.placeholderText=this.placeholder),l.$on("i-got-clicked",function(){e.showMenu=!1})},methods:{updateOption:function(e){this.selectedOption=e,this.showMenu=!1,this.$emit("updateOption",this.selectedOption)},toggleMenu:function(){!1===this.showMenu&&l.$emit("i-got-clicked","if you listen to this, please close yourself"),this.showMenu=!this.showMenu}}},p={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"btn-group"},[void 0!==e.selectedOption.name?n("li",{staticClass:"dropdown-toggle",on:{click:function(t){e.toggleMenu()}}},[n("font-awesome-icon",{attrs:{icon:this.iconName}}),e._v(" "+e._s(e.selectedOption.name)+"\n    "),n("span",{staticClass:"caret"})],1):e._e(),e._v(" "),void 0===e.selectedOption.name?n("li",{staticClass:"dropdown-toggle",on:{click:function(t){e.toggleMenu()}}},[n("font-awesome-icon",{attrs:{icon:this.iconName}}),e._v(" "+e._s(e.placeholderText)+"\n    "),n("span",{staticClass:"caret"})],1):e._e(),e._v(" "),e.showMenu?n("ul",{staticClass:"dropdown-menu closeDropdownIfOpen"},e._l(e.options,function(t){return n("li",[t.available?e._e():n("a",{staticClass:"disabled"},[e._v("\n                    "+e._s(t.name)+"\n                ")]),e._v(" "),t.available?n("a",{on:{click:function(n){e.updateOption(t)}}},[e._v("\n                    "+e._s(t.name)+"\n                ")]):e._e()])})):e._e()])},staticRenderFns:[]};var f=n("VU/8")(d,p,!1,function(e){n("jVs4")},"data-v-98c5d22c",null).exports,g={components:{dropdown:f},data:function(){return{iconName:"truck"}},computed:{categorInter:function(){return this.$store.state.configuration.categorInters},firstSelected:function(){var e=this;return this.$store.state.configuration.categorInters.find(function(t){return t.nameCode===e.$store.state.filters.currentCategorInter})}},methods:{filters_updateCategory:function(e){this.$store.dispatch("filters_updateCategory",e.nameCode),this.mixpanel("Click - Button Filtre categorie intervention")}}},m={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"filterCategorInter"}},[t("dropdown",{attrs:{options:this.categorInter,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateCategory}})],1)},staticRenderFns:[]};var h={components:{dropdown:f},data:function(){return{iconName:"calendar-alt"}},computed:{timeAggregation:function(){return this.$store.state.configuration.timeAggregations},firstSelected:function(){var e=this;return this.$store.state.configuration.timeAggregations.find(function(t){return t.nameCode===e.$store.state.filters.currentTimeAggregation})}},methods:{filters_updateTimeAggregation:function(e){this.$store.dispatch("filters_updateTimeAggregation",e.nameCode),this.mixpanel("Click - Button Filtre temporel")}}},v={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"FilterTimeAggregation"}},[t("dropdown",{attrs:{options:this.timeAggregation,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateTimeAggregation}})],1)},staticRenderFns:[]};var _={components:{dropdown:f},data:function(){return{iconName:"map-signs"}},computed:{geoAggregation:function(){return this.$store.state.configuration.geoAggregations},firstSelected:function(){var e=this;return this.$store.state.configuration.geoAggregations.find(function(t){return t.nameCode===e.$store.state.filters.currentGeoAggregation})}},methods:{filters_updateGeoAggregation:function(e){this.$store.dispatch("filters_updateGeoAggregation",e.nameCode),this.mixpanel("Click - Button Filtre geographique")}}},b={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"FilterGeoAggregation"}},[t("dropdown",{attrs:{options:this.geoAggregation,selected:this.firstSelected,iconName:this.iconName},on:{updateOption:this.filters_updateGeoAggregation}})],1)},staticRenderFns:[]};var j={components:{FilterCategorInter:n("VU/8")(g,m,!1,function(e){n("+j2C")},"data-v-7ec2b266",null).exports,FilterTimeAggregation:n("VU/8")(h,v,!1,function(e){n("+EjN")},"data-v-c32670dc",null).exports,FilterGeoAggregation:n("VU/8")(_,b,!1,function(e){n("zGBJ")},"data-v-461f5cb0",null).exports},data:function(){return{version:u.a.version}},computed:{hideAllFilters:function(){return this.$store.state.filters.hideAllFilters}}},y={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{directives:[{name:"show",rawName:"v-show",value:!this.hideAllFilters,expression:"!hideAllFilters"}],attrs:{id:"filters"}},[t("FilterCategorInter"),this._v(" "),t("FilterTimeAggregation"),this._v(" "),t("FilterGeoAggregation")],1)},staticRenderFns:[]};var C=n("VU/8")(j,y,!1,function(e){n("Z9cN")},"data-v-2ef48a5e",null).exports,w=n("Txoc"),E={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sliders"},[n("span",{staticClass:"aroundSlider"},[n("span",{staticClass:"btnSliderSpan btnSliderSpanMinus",on:{click:function(t){e.mixpanel("Click - Slider minus -")}}},[n("button",{ref:"minus"},[e._v("-")])]),e._v(" "),n("div",{ref:"slider",staticClass:"slider",on:{click:function(t){e.mixpanel("Click - Slider Srolling")}}}),e._v(" "),n("span",{staticClass:"btnSliderSpan btnSliderSpanPlus",on:{click:function(t){e.mixpanel("Click - Slider plus +")}}},[n("button",{ref:"plus"},[e._v("+")])])])])},staticRenderFns:[]};var k=function(e){n("KEx8")},S=n("VU/8")(w.a,E,!1,k,null,null).exports,x={props:{iconName:String}},A={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"btn-group"},[t("li",{staticClass:"dropdown-toggle"},[t("font-awesome-icon",{attrs:{icon:this.iconName}})],1)])},staticRenderFns:[]};var D=n("VU/8")(x,A,!1,function(e){n("e8iV")},"data-v-02c2c223",null).exports,F=n("sTcZ"),O=n.n(F),$={components:{buttonprint:D},data:function(){return{iconName:"print",show:!0}},methods:{clickEvent:function(){this.show=!1;var e=this;O.a.toJpeg(this.$parent.$refs.refForScreenshot,{quality:.99}).then(function(t){var n=document.createElement("a");n.download="previsecours.jpeg",n.href=t,n.click(),e.show=!0}).catch(function(e){console.error("oops, screenshot went wrong!",e)})}}},P={render:function(){var e=this.$createElement,t=this._self._c||e;return t("transition",{attrs:{name:"slide-fade"}},[this.show?t("div",{attrs:{id:"ButtonPrint"},on:{click:this.clickEvent}},[t("buttonprint",{attrs:{iconName:this.iconName}})],1):this._e()])},staticRenderFns:[]};var R=n("VU/8")($,P,!1,function(e){n("W3x2")},"data-v-afe6200c",null).exports,N=n("a7Rd"),z=n.n(N),T=n("fZjL"),B=n.n(T),U=n("//Fk"),L=n.n(U),I=n("BGHQ"),G=n("pFYg"),M=n.n(G),q=n("Dd8w"),V=n.n(q),H=n("aFK5"),Q=n.n(H),Y={components:{buttonprint:D},props:{jsonData:{type:Array,required:!0},csvTitle:{type:[String,Number],default:"csv",required:!1},showLabels:{type:Boolean,default:!0,required:!1},labels:{type:Object,required:!1},icon:{type:String,required:!1}},data:function(){return{csvLabels:null,csvData:null}},destroyed:function(){this.csvLabels=null,this.csvData=null},methods:{handleClick:function(){var e=B()(this._events).indexOf("error")>-1,t=B()(this._events).indexOf("success")>-1;if(this.jsonData.length)if(!this.labels||B()(this.labels).length){var n=Q()(V()({},this.jsonData[0])),r=this.labels||this.$_createCsvLabelsConf(n);if(this.csvLabels=this.showLabels?this.$_createCsvLabels(r):"",this.csvData=this.$_createCsvContent(this.jsonData,r),"error"!==this.csvLabels&&"error"!==this.csvData){var i=this.csvLabels+this.csvData,o=this.$_downloadCsv("csv-"+this._uid,i,this.csvTitle);o||this.handleError("An error has occured",e),o&&t&&this.$emit("success",!0)}else this.handleError("Error: An error occured while parsing the data.",e)}else this.handleError("Error: Labels are empty",e);else this.handleError("Error: Data are empty",e)},handleError:function(e,t){throw e},$_createCsvLabelsConf:function(e){var t={};return e.map(function(e,n){t[e]={title:e}}),t},$_createCsvLabels:function(e){var t="",n="";try{B()(e).map(function(n,r){t+='"'+e[n].title+'",'}),n+=(t=t.slice(0,-1))+"\r\n"}catch(e){n="error"}finally{return n}},$_createCsvContent:function(e,t){var n="",r="",i="",o=new Array;e.forEach(function(e){e&&o.push(e)});try{o.map(function(e,o){n="",B()(t).map(function(t,r){i=M()(e[t]),n+="number"===i||"float"===i?e[t]+",":'"'+e[t]+'",'}),n=n.slice(0,-1),r+=n+"\r\n"})}catch(e){r="error"}finally{return r}},$_downloadCsv:function(e,t,n){try{var r="data:text/csv;charset=utf-8,"+encodeURI(t),i=document.createElement("a");return i.id="csv-"+e,i.href=r,document.body.appendChild(i),document.getElementById(i.id).style.visibility="hidden",document.getElementById(i.id).download=n+".csv",document.body.appendChild(i),document.getElementById(i.id).click(),setTimeout(function(){document.body.removeChild(i)}),!0}catch(e){return!1}}}},J={render:function(){var e=this.$createElement,t=this._self._c||e;return t("span",{attrs:{id:"json-to-csv-"+this._uid},on:{click:this.handleClick}},[t("buttonprint",{attrs:{iconName:this.icon}})],1)},staticRenderFns:[]},W=n("VU/8")(Y,J,!1,null,null,null).exports,X={components:{JsonToCsv:W},data:function(){return{iconName:"database",data:[]}},mounted:function(){this.getData()},methods:{getData:function(){var e=I.a.function_createQueryPreForExport(this.$store.state.filters.currentDepartment),t=I.a.function_createQueryGeoForExport(this.$store.state.filters.currentDepartment),n=I.a.search("pre",e),r=I.a.search("geo",t),i=this;L.a.all([n,r].map(function(e){return e.catch(function(e){return e})})).then(function(e){var t=e[0].hits.hits,n=e[1].hits.hits,r=t.map(function(e){try{var t=n.find(function(t){return e._source.geo_id===t._source.properties.code})._source;e._source.nom=t.properties.NOM?t.properties.NOM:t.properties.nom,e._source.maille_geographique=i.rename(t.geotype,"maille_geographique"),e._source.hasOwnProperty("prediction_type")&&(e._source.maille_temporelle=i.rename(i.getFreqAndCat(e._source.prediction_type)[0],"maille_temporelle"),e._source.categorie=i.rename(i.getFreqAndCat(e._source.prediction_type)[1],"categorie"),delete e._source.prediction_type),e._source.hasOwnProperty("pre_001_is")&&(e._source.date_de_reference=i.rename(e._source.pre_001_is,"pre_001_is"),delete e._source.pre_001_is);var r=B()(e._source);return z()(r),r.forEach(function(t){i.rename(t,"label")!==t&&(e._source[i.rename(t,"label")]=e._source[t],delete e._source[t])}),e._source}catch(e){console.log("pb avec le mapping geo_id = code dans l export de data",e.toString().slice(0,100))}});i.data=r}).catch(function(e){return console.log("error is ",e)})},rename:function(e,t){if("maille_geographique"===t)switch(e){case"com":return"commune";case"zdc":return"zone de couverture";case"dpt":return"departement";default:return"commune"}else if("label"===t){var n=e.split("_")?e.split("_")[0]:"",r=e.split("_")?e.split("_")[1]:"";switch(n){case"pre":return"Prediction "+r;case"cla":return"Classe "+r;case"po":return"Reference "+r;default:return e}}else{if("pre_001_is"===t)return"Le debut de la premiere iteration est le "+e;if("maille_temporelle"===t)switch(e){case"j":return"quotidien";case"s":return"hebdomadaire";case"m":return"mensuel";case"t":return"trimestriel";case"a":return"annuel";default:return e}else if("categorie"===t)switch(e){case"suap":return"SUAP: Secours d'urgence aux personnes";case"incn":return"Incendies en milieu naturel";case"incu":return"Incendies en milieu urbain";case"acci":return"Accidents de la route";case"coia":return"Incendies et Accidents";default:return e}}return e},getFreqAndCat:function(e){var t=e.split("_")&&e.split("_")[2]?e.split("_")[2]:"";return[e.split("_")&&e.split("_")[3]?e.split("_")[3]:"",t]}}},K={render:function(){var e=this.$createElement;return(this._self._c||e)("JsonToCsv",{attrs:{id:"ButtonExport","json-data":this.data,"csv-title":"previsecours_predictions",icon:this.iconName}})},staticRenderFns:[]};var Z=n("VU/8")(X,K,!1,function(e){n("BxpT")},null,null).exports,ee={components:{buttonprint:D},data:function(){return{iconName:"building"}},methods:{clickEvent:function(){this.$store.commit("toogleCasernes")}},mounted:function(){this.$store.dispatch("loadCasernes")}},te={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"ButtonCasernes"},on:{click:this.clickEvent}},[t("buttonprint",{attrs:{iconName:this.iconName}})],1)},staticRenderFns:[]};var ne=n("VU/8")(ee,te,!1,function(e){n("3YjR")},"data-v-4a148632",null).exports,re=n("ceK1"),ie={mixins:[n.n(re).a],data:function(){return{hideOrnot:!0}},computed:{arrayLegende:function(){for(var e=[],t=1;t<=5;t++)e.push({color:this.green2red(t),classe:this.int2classe(t)});return console.log(e),e}}},oe={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"legende"}},[n("h3",[e._v("Echelle de couleur")]),e._v(" "),n("h5",[e._v("relatif aux nombres d'interventions predites")]),e._v(" "),n("ul",e._l(e.arrayLegende,function(t){return n("li",{style:{backgroundColor:t.color}},[e._v("\n        "+e._s(t.classe)+"\n    ")])}))])},staticRenderFns:[]};var se={components:{JsonToCsv:W},data:function(){return{iconName:"calendar",data:[]}},mounted:function(){this.getData()},methods:{getData:function(){var e=I.a.function_createQueryPreForExportLastUpdate("featureslastupdate"),t=I.a.search("doc",e),n=this;L.a.all([t].map(function(e){return e.catch(function(e){return e})})).then(function(e){var t=e[0].hits.hits.map(function(e){try{return e._source.Derniere_date_disponible=e._source.lastDateIs,e._source.Facteur=e._source.facteur,delete e._source.documentName,delete e._source.updatedat,delete e._source.lastDateIs,delete e._source.facteur,e._source}catch(e){console.log("pb avec le mapping geo_id = code dans l export de data",e.toString().slice(0,100))}});n.data=t}).catch(function(e){return console.log("error is ",e)})}}},ae={render:function(){var e=this.$createElement,t=this._self._c||e;return t("div",{attrs:{id:"buttonGetLastUpdate"}},[t("h5",[this._v("Indicateurs de mise a jour des facteurs")]),this._v(" "),t("JsonToCsv",{attrs:{id:"ButtonExport2","json-data":this.data,"csv-title":"previsecours_last_update",icon:this.iconName}})],1)},staticRenderFns:[]};var ce={components:{legende:n("VU/8")(ie,oe,!1,function(e){n("/Dz2")},null,null).exports,buttonGetLastUpdate:n("VU/8")(se,ae,!1,function(e){n("8YPl")},null,null).exports},data:function(){return{appear:!1}}},ue={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"information"},on:{click:function(t){e.appear=!e.appear}}},[n("i",{staticClass:"fa fa-info"}),e._v(" "),e.appear?n("legende"):e._e(),e._v(" "),e.appear?n("buttonGetLastUpdate"):e._e()],1)},staticRenderFns:[]};var le={components:{Carte:a,Filters:C,Slider:S,ButtonPrint:R,ButtonExport:Z,ButtonCasernes:ne,Information:n("VU/8")(ce,ue,!1,function(e){n("IqXX")},"data-v-0b01818c",null).exports}},de={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"refForScreenshot",staticStyle:{width:"100%",height:"100%",margin:"0px"}},[n("Carte"),e._v(" "),n("Filters"),e._v(" "),n("Slider"),e._v(" "),n("ButtonPrint",{nativeOn:{click:function(t){e.mixpanel("Click - Button Print Screenshot")}}}),e._v(" "),n("ButtonExport",{nativeOn:{click:function(t){e.mixpanel("Click - Button Export CSV")}}}),e._v(" "),n("ButtonCasernes",{nativeOn:{click:function(t){e.mixpanel("Click - Button Casernes on/off")}}}),e._v(" "),n("Information",{nativeOn:{click:function(t){e.mixpanel("Click - Button Information")}}})],1)},staticRenderFns:[]},pe=n("VU/8")(le,de,!1,null,null,null).exports,fe=n("wtEF"),ge=n("/ocq");r.a.use(ge.a);var me=new ge.a({routes:[{path:"/",name:"Home"}]}),he=n("QxPg"),ve=n("1P+R"),_e=n("mZf6"),be=n.n(_e),je=n("U0v6"),ye=n("2xhc"),Ce=function(e){return{onUserClick:function(t){!0===t?e.trackEvent({action:"User click"}):"string"==typeof t?e.trackEvent({action:t}):e.trackEvent({action:"Fatal error in mixpanel reporting"})}}},we=n("aIZp"),Ee=n.n(we),ke={install:function(e,t){e.use(Ee.a,{modules:{mixpanel:{token:"7bb4203f0d0117ca1b4386b440ab6bca"}},routing:{vueRouter:me,preferredProperty:"name",ignoredViews:[],ignoredModules:["ga","facebook","segment","mparticle"]}},Ce),e.mixin({created:function(){console.log("mixin created")},methods:{mixpanel:function(e){this.$mam.onUserClick(e)}}})}},Se=ke;r.a.config.productionTip=!1,he.a.library.add(ve.a,be.a),r.a.component("font-awesome-icon",je.FontAwesomeIcon),r.a.use(ye.a),r.a.use(Se),new r.a({store:fe.a,router:me,el:"#previsecoursMainApp",components:{App:pe},template:"<App/>"})},"P/1S":function(e,t){},Txoc:function(e,t,n){"use strict";(function(e){var r=n("zF5W"),i=n.n(r),o=n("4llj");n.n(o);t.a={data:function(){return{currentTimeAggregationData:1}},computed:{currentTimeAggregation:function(){return this.$store.state.filters.currentTimeAggregation},currentPosition:function(){return this.$store.state.slider.currentPosition},sliderRangeBegin:function(){return 1},sliderRangeEnd:function(){return this.timeAggregationConfiguration.timeRepetition},sliderStartPosition:function(){return this.getTodayCorrespondingValue()},beginDate:function(){return this.$store.state.slider.begin},timeAggregationConfiguration:function(){return this.$store.getters.slider_timeAggregationConfiguration(this.currentTimeAggregation)}},methods:{formatTooltip:function(e){var t=(e=Math.round(e))-1,n=void 0,r=void 0,i=this.timeAggregationConfiguration.timeStepBetweenRepetitions,o=this.$moment(new Date(this.beginDate)).add(t*i.step,i.type).valueOf();switch(this.timeAggregationConfiguration.nameCode){case"j":n={weekday:"long",year:"numeric",month:"long",day:"numeric"},r=new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")";break;case"s":n={weekday:"short",month:"long",day:"numeric",year:"numeric"},r="semaine débutant le "+new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")";break;case"m":n={year:"numeric",month:"long"},r=new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")";break;case"t":n={month:"long",year:"numeric"},r="trimestre débutant en "+new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")";break;case"a":n={year:"numeric"},r=new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")";break;default:n={weekday:"long",year:"numeric",month:"long",day:"numeric"},r=new Date(o).toLocaleDateString("fr-FR",n)+" (nº"+e+")"}return r},getTodayCorrespondingValue:function(){try{var t=this.timeAggregationConfiguration.timeStepBetweenRepetitions,n=this.$moment(new Date(this.beginDate)),r=this.$moment(new Date(this.beginDate)).add(this.sliderRangeEnd*t.step,t.type),i=this.timeAggregationConfiguration.nameCode,o=this.$moment(),s=void 0;if(e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&(console.log("this.beginDate: ",this.$store.state.slider.begin),console.log("timeFromDateBegin: ",n.format("Do MMM YYYY")),console.log("timeFromDateEnd:   ",r.format("Do MMM YYYY")),console.log("timeNow:           ",o.format("Do MMM YYYY"))),!this.$moment(o).isBetween(n,r))return e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("not in between"),1;switch(i){case"j":s=o.diff(n,"days");break;case"s":s=o.diff(n,"weeks");break;case"m":s=o.diff(n,"months");break;case"t":s=o.diff(n,"months")/3;break;case"a":s=o.diff(n,"years");break;default:s=o.diff(n,"weeks")}return s=Math.round(s)+1,e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("todayCorrespondingValue",s,"for nameCode type: ",i),s}catch(e){return console.log(e),1}},updateSlider:function(){this.$refs.slider.noUiSlider.updateOptions({range:{min:this.sliderRangeBegin,max:this.sliderRangeEnd},step:1,start:1})},setSliderMinusOne:function(){var e=parseInt(this.$refs.slider.noUiSlider.get());e>0&&e--,this.$store.commit("slider_updateCurrentPosition",e),this.$refs.slider.noUiSlider.set(e)},setSliderPlusOne:function(){var e=parseInt(this.$refs.slider.noUiSlider.get());e<this.sliderRangeEnd&&e++,this.$store.commit("slider_updateCurrentPosition",e),this.$refs.slider.noUiSlider.set(e)}},watch:{currentTimeAggregation:function(){this.updateSlider()}},mounted:function(){var e=this,t=this;this.$store.dispatch("filters_updateTimeAggregation",this.$store.state.filters.currentTimeAggregation).then(function(){i.a.create(e.$refs.slider,{start:e.sliderStartPosition,behaviour:"tap-drag",connect:!0,range:{min:e.sliderRangeBegin,max:e.sliderRangeEnd},step:1,tooltips:[{to:e.formatTooltip}],animate:!0}).on("update",function(e){t.$store.commit("slider_updateCurrentPosition",parseInt(e[0]))}),e.$refs.minus.addEventListener("click",function(){t.setSliderMinusOne()}),e.$refs.plus.addEventListener("click",function(){t.setSliderPlusOne()})})}}}).call(t,n("W2nU"))},W3x2:function(e,t){},Z9cN:function(e,t){},ceK1:function(e,t){e.exports={methods:{green2red:function(e){var t=void 0;switch(e){case 1:t="#02b93f";break;case 2:t="#7fe4a1";break;case 3:t="#ffffff";break;case 4:t="#f58888";break;case 5:t="#ff1818";break;default:t="#7fe4a1"}return t},int2classe:function(e){var t=void 0;switch(e){case 1:t="tres faible";break;case 2:t="faible";break;case 3:t="moyenne";break;case 4:t="forte";break;case 5:t="tres forte";break;default:t="moyenne"}return t}}}},e8iV:function(e,t){},jVs4:function(e,t){},pW2n:function(e,t){e.exports={version:.1}},uslO:function(e,t,n){var r={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(e){return n(o(e))}function o(e){var t=r[e];if(!(t+1))throw new Error("Cannot find module '"+e+"'.");return t}i.keys=function(){return Object.keys(r)},i.resolve=o,e.exports=i,i.id="uslO"},wtEF:function(e,t,n){"use strict";(function(e){n.d(t,"a",function(){return l});var r=n("//Fk"),i=n.n(r),o=n("7+uW"),s=n("NYxO"),a=n("BGHQ"),c=n("GOQh"),u=n.n(c);o.a.use(s.a);var l=new s.a.Store({state:{filters:{hideAllFilters:!1,currentCategorInter:"suap",currentTimeAggregation:"s",currentGeoAggregation:"com",currentDepartment:91,showCasernes:!0},carte:{zoom:10},data:{geo:{},int:{},pre:{},cas:{}},dataHasBeenUpdated:0,slider:{begin:"",currentPosition:1},configuration:{categorInters:[{name:"SUAP",nameCode:"suap",description:"Secours a personne",position:1,show:!0,available:!0},{name:"Accident",nameCode:"acci",description:"Accident de la route",position:2,show:!0,available:!0},{name:"Incendie Urb",nameCode:"incu",description:"Incendie en milieu urbain",position:3,show:!0,available:!0},{name:"Incendie Nat",nameCode:"incn",description:"Incendie en milieu naturel",position:4,show:!0,available:!0},{name:"Incendie & Accident",nameCode:"coia",description:"Incendie (naturel et urbain) et accident",position:5,show:!0,available:!0}],timeAggregations:[{name:"jour",nameCode:"j",description:"aggregation par jours",timeRepetition:7,timeStepBetweenRepetitions:{type:"days",step:1},position:1,show:!0,available:!1},{name:"semaine",nameCode:"s",description:"aggregation par semaines",timeRepetition:52,timeStepBetweenRepetitions:{type:"days",step:7},position:2,show:!0,available:!0},{name:"mois",nameCode:"m",description:"aggregation par mois",timeRepetition:12,timeStepBetweenRepetitions:{type:"months",step:1},position:3,show:!0,available:!1},{name:"trimestre",nameCode:"t",description:"aggregation par trimestres",timeRepetition:4,timeStepBetweenRepetitions:{type:"months",step:3},position:4,show:!0,available:!1},{name:"an",nameCode:"a",description:"aggregation par ans",timeRepetition:3,timeStepBetweenRepetitions:{type:"months",step:12},position:5,show:!0,available:!1}],geoAggregations:[{name:"departement",nameCode:"dpt",description:"aggregation par departement",position:1,show:!0,available:!1},{name:"zone de couverture",nameCode:"zdc",description:"aggregation par zone de couverture",position:2,show:!0,available:!0},{name:"commune",nameCode:"com",description:"aggregation par commune",position:3,show:!0,available:!0}]}},getters:{slider_timeAggregationConfiguration:function(e){return function(t){var n=void 0;try{if(!(n=e.configuration.timeAggregations.find(function(e){return e.nameCode===t})))throw"timeAggregation not defined for: "+t}catch(e){return void console.log("error",e)}return n}}},mutations:{filters_updateCategory:function(e,t){e.filters.currentCategorInter=t},filters_updateGeoAggregation:function(e,t){e.filters.currentGeoAggregation=t},filters_updateTimeAggregation:function(e,t){e.filters.currentTimeAggregation=t},reloadData:function(t,n){e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log("result newData.elasticsearchResult",n.elasticsearchResult),t.data[n.dataSubset]=n.elasticsearchResult,t.dataHasBeenUpdated+=1},slider_updateDateBegin:function(e,t){e.slider.begin=t},slider_updateCurrentPosition:function(e,t){e.slider.currentPosition=t},toogleCasernes:function(e){e.filters.showCasernes=!e.filters.showCasernes}},actions:{filters_updateCategory:function(e,t){e.commit("filters_updateCategory",t),e.dispatch("reloadData",["pre"])},filters_updateGeoAggregation:function(e,t){e.commit("filters_updateGeoAggregation",t),e.dispatch("reloadData",["geo"]),e.dispatch("reloadData",["pre"])},filters_updateTimeAggregation:function(e,t){return new i.a(function(n,r){e.commit("filters_updateTimeAggregation",t),e.dispatch("reloadData",["pre"]).then(function(){try{var t=e.state.data.pre.hits.hits[0]._source.pre_001_is;e.commit("slider_updateDateBegin",t),n()}catch(e){console.log("problem with state.data.pre.hits.hits[0]._source.pre_001_is -> ",e)}})})},getNewData:function(t,n){var r=a.a.function_createQuery(t.state,n);return e&&Object({NODE_ENV:"production",ES_PATH:"/api/",DEBUG_MODE:!0})&&console.log(r,n),a.a.search(n,r)},reloadData:function(e,t){return new i.a(function(n,r){Array.isArray(t)?t.forEach(function(r,i){"string"==typeof r&&"string"==typeof u.a.indexes[r]?e.dispatch("getNewData",r).then(function(o){var s={dataSubset:r,elasticsearchResult:o};e.commit("reloadData",s),i===t.length-1&&n()}):console.log("dataSubset: ",r," needs to be part of the configuration json, like int or geo")}):console.log("dataSubsets needs to be an array of string")})},loadCasernes:function(e){return console.log("on est dans toogleCasernes"),new i.a(function(t,n){var r=a.a.function_createQueryLoadCasernes(e.state.filters.currentDepartment);a.a.search("geo",r).then(function(n){var r={dataSubset:"cas",elasticsearchResult:n};e.commit("reloadData",r),t()})})}}})}).call(t,n("W2nU"))},z4z5:function(e,t){},zGBJ:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.8b0fa1837ed150fed171.js.map