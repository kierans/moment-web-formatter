/*jshint expr: true*/

"use strict";

var moment = require("moment");

var formatter = require("../moment-web-formatter");

//noinspection JSUnresolvedVariable
var chai = require("chai"),
    expect = chai.expect,
    should = require("mocha-should");

describe("Moment Web Formatter tests", function() {
  // Fri 27/6/2014 2038
  var ts = moment.unix(1403865496);

  var handlebarsConfig = {};
  formatter.createHandlebarsHelpers(handlebarsConfig);

  should("format date matching RFC 822 string", function() {
    var datetime = formatter.formatMomentToRFC822DateString(ts);

    expect(datetime).to.equal("Fri, 27 Jun 2014 10:38:16 GMT");
  });

  should("format date matching RFC 3339 string", function() {
    var datetime = formatter.formatMomentToRFC3339DateString(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });

  should("format date matching ISO 8601 string", function() {
    var datetime = formatter.formatMomentToISO8601DateString(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });

  should("add handlebars helper RFC 822 string", function() {
    var datetime = handlebarsConfig.helpers.rfc822Date(ts);

    expect(datetime).to.equal("Fri, 27 Jun 2014 10:38:16 GMT");
  });

  should("format date matching RFC 3339 string", function() {
    var datetime = handlebarsConfig.helpers.iso8601Date(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });

  should("format date matching ISO 8601 string", function() {
    var datetime = handlebarsConfig.helpers.rfc3339Date(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });
});