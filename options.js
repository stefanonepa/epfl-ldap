'use strict';
module.exports = function (customOptions) {
    var ldapOptions = {};
    
    ldapOptions.url = 'ldap://ldap.epfl.ch';
    if (customOptions != undefined) {
        ldapOptions.searchBase = customOptions.searchBase;
    } else {
        ldapOptions.searchBase = 'c=ch';
    }

    return ldapOptions;
};