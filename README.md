# epfl-ldap

Simple wrapper to query the EPFL LDAP.

## Usage
```javascript
/*
 * Public
 */
var publicLdapContext = require('epfl-ldap')();

publicLdapContext.users.getUserBySciper(169419, function(err, data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Full
 */
var fullLdapContext = require('epfl-ldap')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;

fullLdapContext.users.getUserBySciper(169419, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Custom
 */
var customLdapContext = require('epfl-ldap')();
var customModelsMapper = customLdapContext.viewModelsMappers.custom;
customModelsMapper.userSchema = {
    displayName: {
        key: 'displayName'
    },
    emails: {
        key: 'emails'
    }
};
customLdapContext.options.modelsMapper = customModelsMapper;

customLdapContext.users.getUserBySciper(169419, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Custom LDAP search base
 */
var publicLdapContext = require('epfl-ldap')();
publicLdapContext.options.searchBase = 'ou=si-idev,ou=si,o=epfl,c=ch'; // <- specify search base here
publicLdapContext.users.getUserBySciper(169419, function(err, data) {
 console.log(JSON.stringify(data, null, 2));
});
```


## Notes

⚠ Carefull with the results formats (Object or Array)

⚠ this library *"try"* to use ES2015 (or ES6) capabilities, don't use it with nodejs under 5.x?
