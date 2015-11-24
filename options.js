'use strict';
module.exports = function () {
    let ldapOptions = {};
    ldapOptions.searchBase = 'c=ch';
    ldapOptions.modelsMapper = require('./viewModels/public/modelsMapper')();
    return ldapOptions;
};
