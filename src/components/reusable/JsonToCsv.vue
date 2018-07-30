<template>
  <span v-on:click="handleClick" :id="'json-to-csv-' + _uid">
    <buttonprint v-bind:iconName="icon"></buttonprint>
  </span>
</template>

<script>
import buttonprint from './Button.vue'

export default {
  components: {
    buttonprint,
  },
  props: {
    jsonData: {
      type: Array,
      required: true
    },
    csvTitle: {
      type: [String, Number],
      default: 'csv',
      required: false
    },
    showLabels: {
      type: Boolean,
      default: true,
      required: false
    },
    labels: {
      type: Object,
      required: false
    },
    icon: {
      type: String,
      required: false
    },
  },
  data: () => ({
    csvLabels: null,
    csvData: null,
  }),
  destroyed () {
    this.csvLabels = null
    this.csvData = null
  },
  methods: {
    handleClick () {
      let hasErrorEvent = (Object.keys(this._events).indexOf('error') > -1)
      let hasSuccessEvent = (Object.keys(this._events).indexOf('success') > -1)
      if (!this.jsonData.length) {
        this.handleError(`Error: Data are empty`, hasErrorEvent)
        return
      }
      if (this.labels && !Object.keys(this.labels).length) {
        this.handleError(`Error: Labels are empty`, hasErrorEvent)
        return
      }
      let labels = Object.getOwnPropertyNames({ ...this.jsonData[0] })
      let labelsConf = this.labels || this.$_createCsvLabelsConf(labels)
      this.csvLabels = this.showLabels ? this.$_createCsvLabels(labelsConf) : ''
      this.csvData = this.$_createCsvContent(this.jsonData, labelsConf)
      console.log('this.csvLabels:',this.csvLabels ,' -- this.csvData:',this.csvData);
      if (this.csvLabels === 'error' || this.csvData === 'error') {
        this.handleError(`Error: An error occured while parsing the data.`, hasErrorEvent)
        return
      }
      let content = this.csvLabels + this.csvData
      let f = this.$_downloadCsv(`csv-${this._uid}`, content, this.csvTitle)
      if (!f) this.handleError(`An error has occured`, hasErrorEvent)
      if (f && hasSuccessEvent) this.$emit('success', true)
    },
    handleError (msg, hasErrorEvent) {
      throw msg
      if (hasErrorEvent) this.$emit('error', msg)
    },
    $_createCsvLabelsConf (arr) {
      let conf = {}

      arr.map(function (m, i) {
        conf[m] = { title: m }
      })

      return conf
    },
    $_createCsvLabels (labels) {
      let row = ''
      let c = ''

      try {
        Object.keys(labels).map(function (m, i) {
          row += '"' + labels[m].title + '",'
        })

        row = row.slice(0, -1)

        c += row + '\r\n'
      } catch (err) {
        c = 'error'
      } finally {
        return c
      }
    },
    $_createCsvContent (arr, labels) {
      let row = ''
      let c = ''
      let type = ''

      try {
        arr.map(function (m, i) {
          row = ''

          Object.keys(labels).map(function (k, s) {
            type = typeof m[k]
            if (type === 'number' || type === 'float') {
              row += m[k] + ','
            } else {
              row += '"' + m[k] + '",'
            }
          })

          row = row.slice(0, -1)

          c += row + '\r\n'
        })
      } catch (err) {
        c = 'error'
      } finally {
        return c
      }
    },
    $_downloadCsv (uid, csv, title) {
      try {
        let uri = 'data:text/csv;charset=utf-8,' + encodeURI(csv)

        let link = document.createElement('a')

        link.id = 'csv-' + uid
        link.href = uri

        document.body.appendChild(link)

        document.getElementById(link.id).style.visibility = 'hidden'
        document.getElementById(link.id).download = title + '.csv'

        document.body.appendChild(link)
        document.getElementById(link.id).click()

        setTimeout(function () {
          document.body.removeChild(link)
        })
        return true
      } catch (err) {
        return false
      }
    },
  }
}
</script>
