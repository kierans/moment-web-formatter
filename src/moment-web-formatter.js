"use strict";

var newMoment = require("moment");

module.exports = (function() {
  var rfc339Format = "ddd, DD MMM YYYY HH:mm:ss";
  var iso8601Format = "YYYY-MM-DDTHH:mm:ss.SSSZ";

  /**
   * Defaults strict mode to true.
   * @constructor
   */
  function Formatter() {
    this.strict = true;
  }

  function checkResult(moment, str) {
    if (!moment.isValid()) {
      throw new Error("'" + str + "' not valid");
    }

    return moment.local();
  }

  Formatter.prototype.formatMomentToRFC822DateString = function(moment) {
    if (!moment) {
      return moment;
    }

    return newMoment(moment).utc().format(rfc339Format) + " GMT";
  };

  Formatter.prototype.formatMomentToISO8601DateString = function(moment) {
    if (!moment) {
      return moment;
    }

    return moment.format(iso8601Format);
  };

  Formatter.prototype.formatMomentToRFC3339DateString = function(moment) {
    if (!moment) {
      return moment;
    }

    return this.formatMomentToISO8601DateString(moment);
  };

  /**
   * @throws If the parsed date is invalid, and strict mode is on
   */
  Formatter.prototype.parseRFC822DateStringToMoment = function(str) {
    if (!str) {
      return str;
    }

    var noGMTStr = str.replace(/GMT/, "").trim();
    var ts = newMoment.utc(noGMTStr, rfc339Format, this.strict);

    return checkResult(ts);
  };

  /**
   * @throws If the parsed date is invalid, and strict mode is on
   */
  Formatter.prototype.parseISO8601DateStringToMoment = function(str) {
    if (!str) {
      return str;
    }

    var ts = newMoment.utc(str, newMoment.ISO_8601, this.strict);

    return checkResult(ts);
  };

  /**
   * @throws If the parsed date is invalid, and strict mode is on
   */
  Formatter.prototype.parseRFC3339DateStringToMoment = function(str) {
    return this.parseISO8601DateStringToMoment(str);
  };

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
  Formatter.prototype.createHandlebarsHelpers = function(handlebarsConfig) {
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
  };

  /**
   * Controls the strict mode of Moment.  Non deterministic behaviour may arise if strict mode is disabled.
   */
  Formatter.prototype.setStrict = function(isStrict) {
    this.strict = isStrict;
  };

  Formatter.prototype.isStrict = function() {
    return this.strict;
  };

  return Formatter;
}());