before(function() {
  //console.log('before test in every file');
});


beforeEach(function() {
  // Be sure to clear the cache before the tests...
  // console.log('clearing cache...');
  var fullLdapContext = require('../context')();
  fullLdapContext.memoryCache.flushAll();
});
