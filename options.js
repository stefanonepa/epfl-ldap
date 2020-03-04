'use strict';
module.exports = function (options) {
    let ldapOptions = {};
    // Define the searchBase
    if (options == undefined || options.searchBase == undefined ) {
        ldapOptions.searchBase = 'c=ch';
    } else {
        ldapOptions.searchBase = options.searchBase;
    }
    ldapOptions.modelsMapper = require('./viewModels/public/modelsMapper')();
    return ldapOptions;
};
