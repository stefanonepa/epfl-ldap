'use strict';
module.exports = function ldapContext() {
    var context = {};
    context.client = require('./client')();
    context.options = require('./options')();
    //context.validator = require('../../core/security/inputValidators');
    context.users = require('./repositories/users')(context);
    context.units = require('./repositories/units')(context);
    context.viewModelsMappers = require('./viewModels/mappers')();
    return context;
};