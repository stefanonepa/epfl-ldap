'use strict';

module.exports = function ldapClient(context) {

    var ldap = require('ldapjs');
    var client = ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    });

    function realQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, next) {
        var groupedObject = {};
        var opts = {
            filter: ldapQuery,
            scope: 'sub'
        };
        
        client.search(context.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var objectIdentifier = entry.object.uniqueIdentifier;
                    if (groupedObject[objectIdentifier] === undefined) {
                        groupedObject[objectIdentifier] = Array();
                    }
                    groupedObject[objectIdentifier].push(entry.object);
                } else {
                    next(groupedObject);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                next(groupedObject);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var objectsGroup = Array();
                
                for (var userEntry in groupedObject) {
                    if (groupedObject.hasOwnProperty(userEntry)) {
                        if (isResultUniq) {
                            objectsGroup = groupedObject[userEntry];
                        } else {
                            objectsGroup.push(groupedObject[userEntry]);
                        }
                    }
                }
                next(objectsGroup);
            });
        });
    }

    function mapResults(data, objectFactory, modelMapper, next) {
        if (data[0] instanceof Array) {
            next(data.map(function (obj) {
                return modelMapper(objectFactory(obj));
            }));
        } else {
            next(modelMapper(objectFactory(data)));
        }
    };

    client.executeQuery = function(ldapQuery, objectFactory, modelMapper, isResultUniq, next) {  
        context.memoryCache.get(ldapQuery, function (err, data) {
            if (!err) {
                if (data == undefined) {
                    realQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, function(data) {
                        context.memoryCache.set(ldapQuery, data, function (err, success) {
                            if (!err && success) {
                                mapResults(data, objectFactory, modelMapper, next);
                            } else {
                                next(new Error('something bad happened setting the cache'));
                            }
                        });
                    });
                } else {
                    mapResults(data, objectFactory, modelMapper, next);
                }
            } else {
                next(new Error('something bad happened accessing the cache'));
            }
        });
    };

    return client;
};