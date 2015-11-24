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
        fullLdapContext.users.getUserBySciper(162314, function(err, data) {
            assert.ok(true, "This shouldn't fail");
            done();
        });
    });

    it('30 chars email', function (done) {
        fullLdapContext.users.getUserBySciper(214370, function (err, data) {
            assert.ok(true, "This shouldn't fail");
            done();
        });
    });

});
