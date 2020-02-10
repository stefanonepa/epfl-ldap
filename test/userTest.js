var assert = require('assert');
var fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;

describe('User::get', function () {

    it('getUserBySciper should get Kermit La Grenouille', function (done) {
        fullLdapContext.users.getUserBySciper(133134, function (err, data) {
            assert.equal(data.displayName, "Kermit La Grenouille");
            done();
        });
    });

    it('getUserBySciper should handle users with two email', function(done) {
        fullLdapContext.users.getUserBySciper(162314, function (err, data) {
            assert.ok(data.emails.length === 2, "User have 2 email");
            done();
        });
    });

    it('getUserBySciper should return correct email length', function (done) {
        fullLdapContext.users.getUserBySciper(169419, function (err, data) {
            assert.ok(data.emails[0].length === 23, "email adresse is long");
            done();
        });
    });

    it('getUserByName should find Kermit La Grenouille', function (done) {
        fullLdapContext.users.getUserByName('Kermit La Grenouille', function (err, data) {
            assert.equal(data.displayName, 'Kermit La Grenouille');
            done();
        });
    });

});

describe('User::search', function () {

    it('searchUserByName should search Kermit La Grenouille', function (done) {
        fullLdapContext.users.searchUserByName('Kermit', function (err, data) {
            assert.equal(data[0].displayName, 'Kermit La Grenouille');
            done();
        });
    });

    it('searchUserByPhone should return 169419', function (done) {
        fullLdapContext.users.searchUserByPhone('35455', function (err, data) {
            assert.equal(data[0].sciper, '169419');
            done();
        });
    });

    it('searchUserByUnitAcronym should search all members of IDEV-F*, including Kermit', function (done) {
        fullLdapContext.users.searchUserByUnitAcronym('IDEV-F', function (err, data) {
            let k = data.filter(obj => {
                return obj.displayName === 'Kermit La Grenouille';
            })
            assert.equal(k[0].displayName, 'Kermit La Grenouille');
            done();
        });
    });

});

describe('Users::get', function () {

    it('getUsersBySciper should get Kermit La Grenouille', function (done) {
        fullLdapContext.users.getUsersBySciper(133134, function (err, data) {
            // Note: it should be an array...
            assert.equal(data.displayName, 'Kermit La Grenouille');
            done();
        });
    });

    it('getUsersByName should get Kermit La Grenouille', function (done) {
        fullLdapContext.users.getUsersByName('Kermit La Grenouille', function (err, data) {
            // Note: it should be an array...
            assert.equal(data.displayName, 'Kermit La Grenouille');
            done();
        });
    });

    it('getUsersByPhone should get 169419', function (done) {
        fullLdapContext.users.getUsersByPhone('35455', function (err, data) {
            assert.equal(data[0].sciper, '169419');
            done();
        });
    });

    it('getUsersByUnitAcronym should search all members of IDEV-FSD, including Kermit', function (done) {
        fullLdapContext.users.getUsersByUnitAcronym('IDEV-FSD', function (err, data) {
            let k = data.filter(obj => {
                return obj.displayName === 'Kermit La Grenouille';
            })
            assert.equal(k[0].displayName, 'Kermit La Grenouille');
            done();
        });
    });

});
