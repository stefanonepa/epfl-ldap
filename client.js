'use strict';

const _executeQueryPromise = require('./ldapjs-promise');
const ConnectionPool = require('./connection-pool.js');

function _executeQuery(client, searchBase, ldapQuery, next) {
    _executeQueryPromise(client, searchBase, ldapQuery).then(
        (data) => {
            next(null, data);
        }
    ).catch(
        (err) => {
            next(err, null);
        }
    )
}
function _executeQueryInPool(pool, searchBase, ldapQuery, next) {
    pool.add(function(client) {
        _executeQueryPromise(client, searchBase, ldapQuery)
            .then(
                (data) => {
                    next(null, data);
                }
            )
            .catch(
                (err) => {
                    next(err, null);
                }
            )
        });
}

function createPool (clientFactory, opts) {
    const pool = new ConnectionPool(
        opts.poolSize,
        clientFactory,
        (client) => client.unbind()
    );
  return pool;  // TODO: improve
}

module.exports = function ldapClient(context) {

    let ldap = require('ldapjs');
    let pool = createPool(() => ldap.createClient({
            url: 'ldap://ldap.epfl.ch',
            timeLimit: 1,
            sizeLimit: 10
        }),
        { poolSize : context.poolSize || 3 }
    );

    const client = {
        executeQuery: function(ldapQuery, objectFactory, modelMapper, isResultUniq, next) {
            let objectsGroup = context.memoryCache.get(ldapQuery+isResultUniq)
            if (objectsGroup == undefined) {
                let searchBase = context.options.searchBase;
                let opts = {
                    filter: ldapQuery,
                    scope: 'sub'
                };
                _executeQueryInPool(pool, searchBase, opts, function(err, data) {

                    let objectsGroup = Array();

                    for (let userEntry in data) {
                        if (data.hasOwnProperty(userEntry)) {
                            if (isResultUniq) {
                                objectsGroup = modelMapper(objectFactory(data[userEntry]));
                            } else {
                                objectsGroup.push(modelMapper(objectFactory(data[userEntry])));
                            }
                        }
                    }

                    let success = context.memoryCache.set(ldapQuery+isResultUniq, objectsGroup);
                    if (success) {
                        next(null, objectsGroup);
                    } else {
                        next({ Error: "Error setting cache" }, null);
                    }
                });
            } else {
                next(null, objectsGroup);
            }
        }
    };

    return client;
};