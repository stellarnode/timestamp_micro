'use strict';

var AJAXRequest = require('ajax-request');
var url = require('url');
var Counters = require('../models/counters');
var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
              'August', 'September', 'October', 'November', 'December'];

function TimeStamp() {

    function updateRequestCounter() {

    }

    function getSunriseSunset() {

    }

    function getTimeZone() {

    }

    function resolveUrlStr(req) {
        var reqUrl = url.parse(req.url).pathname;
        var toCut = /\/api\/timestamp\//i;

        if (toCut.test(reqUrl)) {
            reqUrl = decodeURIComponent(reqUrl.replace(toCut, ""));
        }

        return reqUrl;
    }

    function populateObj(reqUrl, out) {
        var d = new Date(reqUrl);
        out.unix = d.getTime();
        out.natural = months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
        out.dateString = d.toString();
        return out;
    }

    function buildOutObj(reqUrl) {
        var count = 0;
        
        /*
        Counters
            .find({ })
			.exec(function (err, result) {
					if (err) { throw err; }
					console.log(result);
				}
			);
		//*/
        
        var out = {
            "unix": null,
            "natural": null,
            "dateString": null
        };
        
        if (Number(reqUrl)) {
            out = populateObj(reqUrl, out);
        } else if (Date.parse(reqUrl)) {
            out = populateObj(reqUrl, out);
        } else {
            var splitStr = reqUrl.split(/[^a-b0-9]/i);
            splitStr.unshift(splitStr.splice(1, 1)[0]);
            var corrected = splitStr.join(' ');
            if (Date.parse(corrected)) {
                out = populateObj(corrected, out);
            }
        }
        
        /*
        Counters
			.findOneAndUpdate({ }, { $inc: { 'nbrOfRequests.requests': 1 } })
			.exec(function (err, result) {
					if (err) { throw err; }
					out.nmbrOfRequestsToDate = result.nbrOfRequests.requests;
				}
			);
        //*/

        return out;
    }

    this.getTime = function(req, res) {
        var reqUrl = resolveUrlStr(req);
        var out = buildOutObj(reqUrl);

        res.json(out);
    }

}

module.exports = TimeStamp;

