var ldapContext = require('./context')();

ldapContext.users.getUserBySciper(150938, function(data) {
    console.log(JSON.stringify(data));
});