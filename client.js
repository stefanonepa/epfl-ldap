'use strict';

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

function _executeQueryPromise(client, searchBase, ldapQuery) { 
    let opts = {
        filter: ldapQuery,
        scope: 'sub'
    };

    return new Promise((resolve, reject) => {
        client.search(searchBase, opts, function (err, ldapRes) {
            let groupedObject = {};
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    let objectIdentifier = entry.object.uniqueIdentifier;
                    if (groupedObject[objectIdentifier] === undefined) {
                        groupedObject[objectIdentifier] = Array();
                    }
                    groupedObject[objectIdentifier].push(entry.object);
                } else {
                    resolve(groupedObject);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                reject(err);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
                reject(err);
            });
            ldapRes.on('end', function () {
                resolve(groupedObject);
            });
        });
    });
}
  

module.exports = function ldapClient(context) {

    let ldap = require('ldapjs');
    let client = ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    });

    client.executeQuery = function(ldapQuery, objectFactory, modelMapper, isResultUniq, next) {
        let objectsGroup = context.memoryCache.get(ldapQuery+isResultUniq)
        if (objectsGroup == undefined) {
            let searchBase = context.options.searchBase;
            _executeQuery(client, searchBase, ldapQuery, function(err, data) {

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
    };

    return client;
};