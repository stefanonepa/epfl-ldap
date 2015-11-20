'use strict';
module.exports = function () {
    var ldapOptions = {};
    ldapOptions.searchBase = 'c=ch';
    ldapOptions.modelsMapper = require('./viewModels/public/modelsMapper')();
    return ldapOptions;
};
