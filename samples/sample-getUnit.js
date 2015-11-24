'use strict';

/*
 * Public
 */
let publicLdapContext = require('../context')();

publicLdapContext.units.getUnitByName('enac-it', function(err, data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Full
 */
let fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;


console.time("first");
fullLdapContext.units.searchUnitByName('enac', function(err, data) {
    //console.log(JSON.stringify(data, null, 2));
    console.timeEnd("first");
});

console.time("second");
fullLdapContext.units.searchUnitByName('enac', function (err, data) {
    //console.log(JSON.stringify(data, null, 2));
    console.timeEnd("second");
});
