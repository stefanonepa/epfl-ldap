'use strict';
module.exports = function (context) {
    
    var userFactory = require('../models/user');
    var usersRepo = {};
    var client = context.client;
    
    usersRepo.getUserBySciper = function (sciper, next) {
        executeQuery('(&(objectClass=posixAccount)(|(uniqueIdentifier=' + sciper + ')))', true, next);
    };
    
    usersRepo.getUserByName = function (name, next) {
        executeQuery('(&(objectClass=posixAccount)(|(cn=' + name + ')))', false, next);
    };
    
    usersRepo.searchUserByName = function (name, next) {
        executeQuery('(&(objectClass=posixAccount)(|(cn=' + name + '*)))', false, next);
    };
    
    usersRepo.searchUserByPhone = function (phone, next) {
        executeQuery('(&(objectClass=posixAccount)(|(telephoneNumber=*' + phone + '*)))', false, next);
    };
    
    usersRepo.searchUserByUnitAcronym = function (unitAcronym, next) {
        executeQuery('(&(objectClass=posixAccount)(|(ou=' + unitAcronym + ')))', false, next);
    };
    
    var executeQuery = function (ldapQuery, isResultUniq, next) {
        var opts = {
            filter: ldapQuery,
            scope: 'sub'
        };
        
        var groupedUser = {};
        
        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var userIdentifier = entry.object.uniqueIdentifier;
                    if (groupedUser[userIdentifier] === undefined) {
                        groupedUser[userIdentifier] = Array();
                    }
                    groupedUser[userIdentifier].push(entry.object);
                } else {
                    next(groupedUser);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                next(groupedUser);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var users = Array();
                
                for (var userEntry in groupedUser) {
                    if (groupedUser.hasOwnProperty(userEntry)) {
                        if (isResultUniq) {
                            users = userFactory(groupedUser[userEntry]);
                        } else {
                            users.push(userFactory(groupedUser[userEntry]));
                        }
                    }
                }
                next(users);
            });
        });
    };
    
    return usersRepo;
};