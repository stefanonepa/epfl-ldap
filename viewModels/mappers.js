'use strict';
module.exports = function mappers() {
    var mappers = {};
    mappers.public = require('./public/modelsMapper')();
    mappers.full = require('./full/modelsMapper')();
    mappers.custom = require('./custom/modelsMapper')();
    return mappers;
};