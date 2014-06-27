"use strict";

var newMoment = require("moment");

module.exports = {
  formatMomentToRFC822DateString: function(moment) {
    return newMoment(moment).utc().format("ddd, DD MMM YYYY HH:mm:ss") + " GMT";
  },
  formatMomentToISO8601DateString: function(moment) {
    return moment.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
  },
  formatMomentToRFC3339DateString: function(moment) {
    return this.formatMomentToISO8601DateString(moment);
  }
};