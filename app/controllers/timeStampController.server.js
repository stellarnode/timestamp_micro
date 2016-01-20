'use strict';

var AJAXRequest = require('ajax-request');
var url = require('url');

function TimeStamp() {
    
    var months = ["january", "february", "march", "april", "may", "june",
                  "july", "august", "september", "october", "november",
                  "december"];
    var monthsShort = ["jan", "feb", "mar", "apr", "may", "jun",
                       "jul", "aug", "sept", "oct", "nov", "dec"];
    
    function updateRequestCounter() {
        
    }
    
    function getSunriseSunset() {
        
    }
    
    function getTimeZone() {
        
    }
    
    function isDate(arr) {
        
        var monthFound = false;
        var yearFound = false;
        var dayFound = false;
        
        var dateObj = {};
        
        function check(el) {
            if (String(el).length === 4 && !isNaN(Number(el))) {
                yearFound = true;
                dateObj.year = el;
            }
            if (months.indexOf(el) > -1 || monthsShort.indexOf(el) > -1) {
                monthFound = true;
                dateObj.month = el;
            }
        }
        
        function insertDay(el) {
            if (dateObj.year !== el && dateObj.month !== el) {
                dateObj.day = el;
            }
        }
        
        arr.forEach(check);
        if (yearFound && monthFound) {
            arr.forEach(insertDay);
        }
        
        
                           
    }
    
    function convertToUnix() {
        
    }
    
    function convertToNatural() {
        
    }
    
    function resolveUrlStr(req) {
        var reqUrl = url.parse(req.url).pathname;
        var toCut = /\/api\/timestamp\//i;
        
        if (toCut.test(reqUrl)) {
            reqUrl = decodeURIComponent(reqUrl.replace(toCut, ""));
        }
        
        return reqUrl;
    }
    
    function buildOutObj(reqUrl) {
        var out = {
            "unix": null,
            "natural": null
        };
        
        if (isNaN(Number(reqUrl))) {
            var urlSplit = reqUrl.split(/[^a-b0-9]/i);
            if (isDate(urlSplit)) {
                out = {
                    "unix": convertToUnix(urlSplit),
                    "natural": reqUrl
                };
        } else {
            out = {
                "unix": Number(reqUrl),
                "natural": convertToNatural(reqUrl)
            };
        }
        
        return out;
    }
    
    this.getTime = function getTime(req, res) {
        var reqUrl = resolveUrlStr(req);
        var out = buildOutObj(reqUrl);

        res.json(out);
    }
 
}


module.exports = TimeStamp;