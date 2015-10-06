'use strict';

var omapper = require('o-mapper');

module.exports = function () {
    var mapper = {};
    
    mapper.user = function (inputModel) {
        return inputModel;
    }
    
    mapper.unit = function (inputModel) {
        return inputModel;
    }
    
    return mapper;
}