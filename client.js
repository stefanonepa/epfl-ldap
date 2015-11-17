'use strict';
var NodeCache = require("node-cache");
var apiCache = new NodeCache({ stdTTL: 43200 }); //==> 1/2 day of ttl

module.exports = function ldapClient(context) {
    


    var ldap = require('ldapjs');
    var client = ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    });

    function cacheQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, next) { 
        var opts = {
            filter: ldapQuery,
            scope: 'sub'
        };
        
        var groupedObject = {};
        
        client.search(context.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var objectIdentifier = entry.object.uniqueIdentifier;
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
                next(err, groupedObject);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var objectsGroup = Array();
                
                for (var userEntry in groupedObject) {
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
        apiCache.get(ldapQuery, function (err, data) {
            if (!err) {
                if (data == undefined) {
                    cacheQuery(ldapQuery, objectFactory, modelMapper, isResultUniq, function(data) {
                        apiCache.set(ldapQuery, data, function (err, success) {
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