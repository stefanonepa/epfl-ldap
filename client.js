'use strict';
module.exports = function ldapClient() {
    var ldap = require('ldapjs');
    var client = ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    });

    return client;
};