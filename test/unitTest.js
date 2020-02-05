var assert = require('assert');
var fullLdapContext = require('../context')();
fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;
describe('Units', function () {

  it('get unit by id', function(done) {
    fullLdapContext.units.getUnitById('1906', function (err, data) {
      assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
      done();
    });
  });

  it('get unit by accounting number', function (done) {
    fullLdapContext.units.getUnitByAccountingNumber('1906', function (err, data) {
      assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
      done();
    });
  });

  it('get unit by unique identifier', function (done) {
    fullLdapContext.units.getUnitByUniqueIdentifier(13030, function (err, data) {
      assert.ok(data.name === "SI - Full-Stack Development", "Unit name");
      done();
    });
  });

  it('get unit by name', function (done) {
    fullLdapContext.units.getUnitByName("SI - Full-Stack Development", function (err, data) {
      assert.ok(data.uniqueIdentifier === '13030', "Unit unique identifier");
      done();
    });
  });

  it('search unit by name', function (done) {
    fullLdapContext.units.searchUnitByName("Full-Stack Development", function (err, data) {
      assert.ok(data[0].uniqueIdentifier === '13030', "Unit unique identifier");
      done();
    });
  });

});