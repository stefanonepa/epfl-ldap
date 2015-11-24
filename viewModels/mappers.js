'use strict';
module.exports = function mappers() {
    let mapperResult = {};
    mapperResult.public = require('./public/modelsMapper')();
    mapperResult.full = require('./full/modelsMapper')();
    mapperResult.custom = require('./custom/modelsMapper')();
    return mapperResult;
};