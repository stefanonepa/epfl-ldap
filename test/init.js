before(function() {
  // console.log('before test in every file');
  var fullLdapContext = require('../context')();
  fullLdapContext.options.modelsMapper = fullLdapContext.viewModelsMappers.full;
  // create a context for all the test, allowing to create/remove cache
  this.fullLdapContext = fullLdapContext;
});

beforeEach(function() {
  // Be sure to clear the cache before the tests...
  // console.log('clearing cache...');
  this.fullLdapContext.memoryCache.flushAll();
});
