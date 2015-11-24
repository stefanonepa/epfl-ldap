'use strict';

/*
 * Public
 */
let publicLdapContext = require('../context')();

publicLdapContext.users.getUserBySciper(169419, function(err, data) {
    console.log(JSON.stringify(data, null, 2));
});

/*
 * Full
 */
let fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;

fullLdapContext.users.getUserBySciper(169419, function (err, data) {
    console.log(JSON.stringify(data, null, 2));
});

/*
 * Custom
 */
let customLdapContext = require('../context')();
let customModelsMapper = customLdapContext.viewModelsMappers.custom;
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
 * Get by unit acronym
 */
publicLdapContext.users.getUsersByUnitAcronym('ENAC-IT', function (err, data) {
    console.log(JSON.stringify(data, null, 2));
});