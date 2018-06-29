# vuejs_previsecours

> Front app for previsecours project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
# port can be changed in webpack.config.js , devServer section
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

## Fill the ES database with some dataset

``` bash
curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@PATHTOFOLDER/vueJS_Previsecours/src/assets/testSet_forElasticSearch.json";
```


fake some data prediction so that is looks cool:
``` bash
mlr --json --ojson put -S 'if(is_not_null($cla_001)){ $cla_003 = urandint(1,5); $cla_002 = urandint(1,5); $cla_001 = urandint(1,5); $cla_004 = urandint(1,5); $cla_005 = urandint(1,5); $geo_id = "&&&" . string($geo_id)  }' dummyPredictions_forElasticSearch.json > dummyPredictions_forElasticSearch2.json
```
ne pas oublier de suppr les &&& !!!



Pour la preparation du geojson departements avant insert en bulk: penser a remplacer les "CODE_DEPT" par "code"

Pour la preparation du geojson zones de couverture avant insert en bulk: penser a remplacer les "OBJECTID" qui vient du systeme SDIS91 par "code" et "CS_COD" en "nom"
``` bash
awk '{gsub("CS_COD", "nom", $0); print}' zoneDeCouvertureGeometry_forElasticSearch.json > zoneDeCouvertureGeometry_forElasticSearch_modified.json
```
penser aussi a ajouter "codeDepartement":"91" dans les geometries
