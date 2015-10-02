var ldapContext = require('ldap-epfl')();

ldapContext.users.getUserBySciper(169419, function(data) {
    console.log(JSON.stringify(data));
});