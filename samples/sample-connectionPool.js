const debug = require('debug')('connection-pool');

const ConnectionPool = require('../connection-pool.js');
const ldap = require('ldapjs');
const executeQueryPromise = require('../ldapjs-promise');


const pool = new ConnectionPool(
    3,
    () =>ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    }),
    (client) => client.unbind()
);

sleep = (secondes) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(), secondes*1000);
    })
}

doSomething = async(client, mail) =>
{
    let opts = {
        filter: `(&(mail=${mail}@epfl.ch))`,
        scope: 'sub',
    };
    await sleep(4);
    debug("Slept...");
    let result = await executeQueryPromise(client, "o=epfl,c=ch", opts);
    console.log(result);
}

pool.add(function(client) {
  return doSomething(client, "gregory.charmier");
}).then(function(){ console.log("job 1 done")})

pool.add(function(client) {
  return doSomething(client, "dominique.quatravaux");
}).then(function(){ console.log("job 2 done")})

pool.add(function(client) {
  return doSomething(client, "nicolas.borboen");
}).then(function(){ console.log("job 3 done")})

pool.add(function(client) {
  return doSomething(client, "julien.delasoie");
}).then(function(){ console.log("job 4 done")})

pool.add(function(client) {
  return doSomething(client, "christian.zufferey");
}).then(function(){ console.log("job 5 done")})

pool.add(function(client) {
  return doSomething(client, "nicolas.reymond");
}).then(function(){ console.log("job 6 done")})

pool.add(function() {
    return pool.close();
}).then(function(){ console.log("Close all LDAP connections")})
