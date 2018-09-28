module.exports = {
  methods: {
    green2red(i) {
      let res
      switch (i) {
        case 1:
          res = '#316f6b'
          break;
        case 2:
          res = '#4ba29b'
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
          res = '#316f6b'
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
          res = 'tres forte'
          break;
        default:
          res = 'moyenne'
      }
      return res
    }
  }
}
