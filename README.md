# epfl-ldap

Simple wrapper to query the epfl ldap

## Usage
```js
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
    email: {
        key: 'email'
    }
};
customLdapContext.options.modelsMapper = customModelsMapper;

customLdapContext.users.getUserBySciper(169419, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
});
```

## Notes

Carefull with the results formats (Object or Array)

## TODO

- [ ] add tests
- [ ] add samples
- [ ] implement query validation with the package `epfl-exceptions`
