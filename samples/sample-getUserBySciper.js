'use strict';

/*
 * Public
 */
var publicLdapContext = require('../context')();

publicLdapContext.users.getUserBySciper(169419, function(data) {
    console.log(JSON.stringify(data, null, 2));
});



/*
 * Full
 */
var fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;

fullLdapContext.users.getUserBySciper(169419, function (data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Custom
 */
var customLdapContext = require('../context')();
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

customLdapContext.users.getUserBySciper(169419, function (data) {
    console.log(JSON.stringify(data, null, 2));
});