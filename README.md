# epfl-ldap

Simple wrapper to query the epfl ldap

## Usage
```js 
var ldapContext = require('epfl-ldap')();

ldapContext.users.getUserBySciper([sciper], function(user) {
    console.log(user.sciper);
});

ldapContext.users.searchUserByName([name], function(user) {
    console.log(users[0].sciper);
});
```

## Notes

Carefull with the results formats (Object or Array)

## TODO

- [ ] add tests
- [ ] add samples
- [ ] implement query validation with the package `epfl-exceptions`
