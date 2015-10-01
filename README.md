# epfl-ldap

Simple wrapper to query the epfl ldap

## Usage
```js 
var ldapContext = require('./context')();

ldapContext.users.getUserBySciper([sciper], function(data) {
    console.log(JSON.stringify(data));
});
```

## TODO

- [ ] add tests
- [ ] add samples
- [ ] implement query validation with the package `epfl-exceptions`