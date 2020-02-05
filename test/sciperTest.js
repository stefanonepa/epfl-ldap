var assert = require('assert');
var fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;

describe('Scipers', function () {

    it('Kermit La Grenouille', function (done) {
        fullLdapContext.users.getUserBySciper(133134, function (err, data) {
            assert.equal(data.displayName, "Kermit La Grenouille");
            done();
        });
    });

    it('have two email', function(done) {
        fullLdapContext.users.getUserBySciper(162314, function (err, data) {
            assert.ok(data.emails.length === 2, "User have 2 email");
            done();
        });
    });

    it('29 chars email', function (done) {
        fullLdapContext.users.getUserBySciper(169419, function (err, data) {
            assert.ok(data.emails[0].length === 23, "email adresse is long");
            done();
        });
    });

});
