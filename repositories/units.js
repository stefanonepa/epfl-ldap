'use strict';
module.exports = function (context) {
    var unitFactory = require('../models/unit');
    
    var unitsRepo = {};
    var client = context.client;
    
    unitsRepo.getUnitById = function (accountingNumber, next) {
        executeQuery('(&(objectClass=organizationalunit)(|(accountingNumber=' + accountingNumber + ')))', true, next);
    };
    
    unitsRepo.getUnitByName = function (unit, next) {
        executeQuery('(&(objectClass=organizationalunit)(|(ou=' + unit + ')))', false, next);
    };
    
    unitsRepo.searchUnitByName = function (unit, next) {
        executeQuery('(&(objectClass=organizationalunit)(|(ou=' + unit + '*)))', false, next);
    };
    
    var executeQuery = function (ldapQuery, isUniqResult, next) {
        var opts = {
            filter: ldapQuery,
            scope: 'sub'
        };
        
        var groupedUnit = {};
        
        client.search(client.options.searchBase, opts, function (err, ldapRes) {
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    var unitIdentifier = entry.object.uniqueIdentifier;
                    if (groupedUnit[unitIdentifier] === undefined) {
                        groupedUnit[unitIdentifier] = Array();
                    }
                    groupedUnit[unitIdentifier].push(entry.object);
                } else {
                    next(groupedUnit);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                
                next(groupedUnit);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
            });
            ldapRes.on('end', function () {
                var units = Array();
                
                for (var unitEntry in groupedUnit) {
                    if (groupedUnit.hasOwnProperty(unitEntry)) {
                        if (isResultUniq) {
                            units = unitFactory(groupedUnit[unitEntry]); 
                        } else {
                            units.push(unitFactory(groupedUnit[unitEntry]));
                        }
                    }
                }
                next(units);
            });
        });
    }
    
    return unitsRepo;
};