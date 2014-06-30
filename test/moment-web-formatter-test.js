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

  should("not format undefined date when formatting to RFC 822 string", function() {
    var str = formatter.formatMomentToRFC822DateString(undefined);

    expect(str).to.be.undefined;
  });

  should("format date matching RFC 822 string", function() {
    var datetime = formatter.formatMomentToRFC822DateString(ts);

    expect(datetime).to.equal("Fri, 27 Jun 2014 10:38:16 GMT");
  });

  should("not format undefined date when formatting to RFC 3339 string", function() {
    var str = formatter.formatMomentToRFC3339DateString(undefined);

    expect(str).to.be.undefined;
  });

  should("format date matching RFC 3339 string", function() {
    var datetime = formatter.formatMomentToRFC3339DateString(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });

  should("not format undefined date when formatting to ISO 8601 string", function() {
    var str = formatter.formatMomentToISO8601DateString(undefined);

    expect(str).to.be.undefined;
  });

  should("format date matching ISO 8601 string", function() {
    var datetime = formatter.formatMomentToISO8601DateString(ts);

    expect(datetime).to.equal("2014-06-27T20:38:16.000+10:00");
  });

  should("return undefined when parsing undefined RFC 822 string", function() {
    var datetime = formatter.parseRFC822DateStringToMoment(undefined);

    expect(datetime).to.be.undefined;
  });

  should("parse date matching RFC 822 format", function() {
    var datetime = formatter.parseRFC822DateStringToMoment("Fri, 27 Jun 2014 10:38:16 GMT");

    expect(datetime.toString()).to.equal(ts.local().toString());
  });

  should("return undefined when parsing undefined ISO 8601 string", function() {
    var datetime = formatter.parseISO8601DateStringToMoment(undefined);

    expect(datetime).to.be.undefined;
  });

  should("parse date matching ISO 8601 format", function() {
    var datetime = formatter.parseISO8601DateStringToMoment("2014-06-27T20:38:16.000+10:00");

    expect(datetime.toString()).to.equal(ts.local().toString());
  });

  should("return undefined when parsing undefined RFC 3339 string", function() {
    var datetime = formatter.parseRFC3339DateStringToMoment(undefined);

    expect(datetime).to.be.undefined;
  });

  should("parse date matching RFC 3339 format", function() {
    var datetime = formatter.parseRFC3339DateStringToMoment("2014-06-27T20:38:16.000+10:00");

    expect(datetime.toString()).to.equal(ts.local().toString());
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