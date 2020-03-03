'use strict';
let NodeCache = require("node-cache");
module.exports = function ldapContext(options) {
    let context = {};
    context.client = require('./client')(context);
    context.options = require('./options')();
    context.users = require('./repositories/users')(context);
    context.units = require('./repositories/units')(context);
    context.viewModelsMappers = require('./viewModels/mappers')();

    if (context.memoryCache == undefined) {
        if (options == undefined || options.memoryCache == undefined ) {
            context.memoryCache = new NodeCache({ stdTTL: 14400 }); // 4 hour of cache
        } else {
            context.memoryCache = new NodeCache(options.memoryCache);
        }
    }
    return context;
};