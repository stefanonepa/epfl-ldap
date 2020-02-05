'use strict';
module.exports = function (context) {
    let unitFactory = require('../models/unit');
    
    let unitsRepo = {};
    let client = context.client;

    /* DEPRECATED: please use specific methods */
    unitsRepo.getUnitById = function (accountingNumber, next) {
        unitsRepo.getUnitByAccountingNumber(accountingNumber, next);
    };

    unitsRepo.getUnitByAccountingNumber = function (accountingNumber, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(accountingNumber=' + accountingNumber + '))', unitFactory, context.options.modelsMapper.unit, true, next);
    };

    unitsRepo.getUnitByUniqueIdentifier = function (unitId, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(uniqueIdentifier=' + unitId + '))', unitFactory, context.options.modelsMapper.unit, true, next);
    };

    unitsRepo.getUnitByName = function (unit, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(ou=' + unit + '))', unitFactory, context.options.modelsMapper.unit, true, next);
    };
    
    unitsRepo.searchUnitByName = function (unit, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(ou=*' + unit + '*))', unitFactory, context.options.modelsMapper.unit, false, next);
    };
     
    return unitsRepo;
};