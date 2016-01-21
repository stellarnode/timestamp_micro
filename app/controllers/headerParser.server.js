"use strict";

// Request Header Parser

var useragent = require("express-useragent");

function rhp(req, res) {
    
    var origHeader = req.headers;
    var ipAddr = origHeader["x-forwarded-for"];
    var origUA = req.headers["user-agent"];
    var ua = useragent.parse(origUA);
    var lang = parseLanguage(req.headers["accept-language"]);
    var out = {
        "ip_address": ipAddr,
        "language": lang,
        "browser": ua.browser,
        "browser_version": ua.version,
        "os": ua.os,
        "platform": ua.platform,
        "header_source": req.headers
    };
    
    function parseLanguage(str) {
        var out = str.match(/[a-z]{2}[\_|\-][A-Z]{2}/g);
        
        if (out) {
            return out;
        } else {
            return null;
        }
        
    }
    
    return out;
}

module.exports = rhp;