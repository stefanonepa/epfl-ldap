'use strict';

/*
 * Public
 */
var publicLdapContext = require('../context')();

publicLdapContext.units.getUnitByName('enac-it', function(data) {
    console.log(JSON.stringify(data, null, 2));
});


/*
 * Full
 */
var fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;


console.time("first");
fullLdapContext.units.searchUnitByName('enac', function(data) {
    //console.log(JSON.stringify(data, null, 2));
    console.timeEnd("first");
});

console.time("second");
fullLdapContext.units.searchUnitByName('enac', function (data) {
    //console.log(JSON.stringify(data, null, 2));
    console.timeEnd("second");
});
