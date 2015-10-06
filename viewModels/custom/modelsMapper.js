'use strict';

var omapper = require('o-mapper');

module.exports = function () {
    var mapper = {};
    mapper.userSchema;
    mapper.user = function (inputModel) {
        if (mapper.userSchema != undefined) {
            return omapper(inputModel, mapper.userSchema);
        } else {
            throw new Error("No schema for user");
        }
    }

    mapper.unitSchema;
    mapper.unit = function (inputModel) {
        if (mapper.unitSchema != undefined) {
            return omapper(inputModel, mapper.unitSchema);
        } else {
            throw new Error("No schema for unit");
        }
    }
    
    return mapper;
}