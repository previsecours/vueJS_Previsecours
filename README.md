# vuejs_previsecours
> Front app for previsecours project

## Build Setup
``` bash
# install dependencies
npm install
```

## Run
``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Fill the ES database with some dataset
``` bash
curl -s -H "Content-Type: application/x-ndjson" -XPOST localhost:9200/_bulk --data-binary "@PATHTOFOLDER/vueJS_Previsecours/src/assets/testSet_forElasticSearch.json";
```


fake some data prediction so that is looks cool:
``` bash
mlr --json --ojson put -S 'if(is_not_null($cla_001)){ $cla_003 = urandint(1,5); $cla_002 = urandint(1,5); $cla_001 = urandint(1,5); $cla_004 = urandint(1,5); $cla_005 = urandint(1,5); $geo_id = "&&&" . string($geo_id)  }' dummyPredictions_forElasticSearch.json > dummyPredictions_forElasticSearch2.json
```
