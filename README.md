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
