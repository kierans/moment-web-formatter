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
  },

  /**
   * Registers the following handlebars helper functions
   * <ul>
   *   <li>rfc822Date</li>
   *   <li>iso8601Date</li>
   *   <li>rfc3339Date</li>
   * </ul>
   *
   * @param handlebarsConfig A config object for use with express3-handlebars
   */
  createHandlebarsHelpers: function(handlebarsConfig) {
    var self = this;
    var helpers = handlebarsConfig.helpers = handlebarsConfig.helpers || {};

    helpers.rfc822Date = function(moment) {
      return self.formatMomentToRFC822DateString(moment);
    };

    helpers.iso8601Date = function(moment) {
      return self.formatMomentToISO8601DateString(moment);
    };

    helpers.rfc3339Date = function(moment) {
      return self.formatMomentToRFC3339DateString(moment);
    };
  }
};