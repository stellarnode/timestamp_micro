'use strict';

// Request Header Parser

function rhp(req, res, next) {
    
    
    
    if (next && typeof next === "function") {
        next();
    }
    
}

module.exports = rhp;