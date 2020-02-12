'use strict';

module.exports = function ldapClient(context) {

    let ldap = require('ldapjs');
    let client = ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    });

    function cacheQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, next) { 
        let opts = {
            filter: ldapQuery,
            scope: 'sub'
        };

        client.search(context.options.searchBase, opts, function (err, ldapRes) {
            let groupedObject = {};

            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    let objectIdentifier = entry.object.uniqueIdentifier;
                    if (groupedObject[objectIdentifier] === undefined) {
                        groupedObject[objectIdentifier] = Array();
                    }
                    groupedObject[objectIdentifier].push(entry.object);
                } else {
                    next(null, groupedObject);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                next(err, null);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
                next(err, null);
            });
            ldapRes.on('end', function () {
                let objectsGroup = Array();

                for (let userEntry in groupedObject) {
                    if (groupedObject.hasOwnProperty(userEntry)) {
                        if (isResultUniq) {
                            objectsGroup = modelMapper(objectFactory(groupedObject[userEntry]));
                        } else {
                            objectsGroup.push(modelMapper(objectFactory(groupedObject[userEntry])));
                        }
                    }
                }
                next(null, objectsGroup);
            });
        });
    }

    client.executeQuery = function(ldapQuery, objectFactory, modelMapper, isResultUniq, next) {  
        context.memoryCache.get(ldapQuery, function (err, data) {
            if (!err) {
                if (data == undefined) {
                    cacheQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, function(err, data) {
                        context.memoryCache.set(ldapQuery, data, function (err, success) {
                            if (!err && success) {
                                next(null, data);
                            } else {
                                next({ Error: "aararrggghhh!" }, null);
                            }
                        });
                    });
                } else {
                    next(null, data);
                }
            } else {
                next({ Error: "aararrggghhh!" }, null);
            }
        });
    };

    return client;
};