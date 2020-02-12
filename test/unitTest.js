var assert = require('assert');

describe('Units::get', function () {

    it('get unit by id', function(done) {
        this.fullLdapContext.units.getUnitById('1906', function (err, data) {
            assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
            done();
        });
    });

    it('get unit by accounting number', function (done) {
        this.fullLdapContext.units.getUnitByAccountingNumber('1906', function (err, data) {
            assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
            done();
        });
    });

    it('get unit by unique identifier', function (done) {
        this.fullLdapContext.units.getUnitByUniqueIdentifier(13030, function (err, data) {
            assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
            done();
        });
    });

    it('get unit by name', function (done) {
        this.fullLdapContext.units.getUnitByName("SI - Full-Stack Development", function (err, data) {
            assert.ok(data.uniqueIdentifier === '13030', "Unit unique identifier");
            done();
        });
    });

});

describe('Units::search', function () {

    it('search unit by name', function (done) {
        this.fullLdapContext.units.searchUnitByName("Full-Stack Development", function (err, data) {
            assert.ok(data[0].uniqueIdentifier === '13030', "Unit unique identifier");
            done();
        });
    });

});