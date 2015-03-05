"use strict";

var newMoment = require("moment");

module.exports = (function() {
  var rfc339Format = "ddd, DD MMM YYYY HH:mm:ss";

  return {
    formatMomentToRFC822DateString: function(moment) {
      if (!moment) {
        return moment;
      }

      return newMoment(moment).utc().format(rfc339Format) + " GMT";
    },

    formatMomentToISO8601DateString: function(moment) {
      if (!moment) {
        return moment;
      }

      return moment.format("YYYY-MM-DDTHH:mm:ss.SSSZ");
    },

    formatMomentToRFC3339DateString: function(moment) {
      if (!moment) {
        return moment;
      }

      return this.formatMomentToISO8601DateString(moment);
    },

    parseRFC822DateStringToMoment: function(str) {
      if (!str) {
        return str;
      }

      var ts = newMoment.utc(str, rfc339Format + " GMT");

      return ts.local();
    },

    parseISO8601DateStringToMoment: function(str) {
      if (!str) {
        return str;
      }

      var ts = newMoment.utc(str, newMoment.ISO_8601);

      return ts.local();
    },

    parseRFC3339DateStringToMoment: function(str) {
      return this.parseISO8601DateStringToMoment(str);
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
}());