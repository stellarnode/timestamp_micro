'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Counters = new Schema({
   nbrOfRequests: {
      requests: Number
   }
});

module.exports = mongoose.model('Counters', Counters);