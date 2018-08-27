export default function (multianalytics) {
  return {
    onUserClick (input) {
      if (input === true) {
        multianalytics.trackEvent({action: 'User click'})
      } else if (typeof input === 'string') {
        multianalytics.trackEvent({action: input})
      } else {
        multianalytics.trackEvent({action: 'Fatal error in mixpanel reporting'})
      }
    }
  }
}
