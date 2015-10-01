'use strict';
module.exports = function ldapContext() {
    var options = require('./options')();
    
    var context = {};
    context.client = require('./client')(options);
    context.validator = require('../../core/security/inputValidators');
    context.users = require('./repositories/users')(context);
    context.units = require('./repositories/units')(context);
    
    return context;
};