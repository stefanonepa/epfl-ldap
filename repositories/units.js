'use strict';
module.exports = function (context) {
    var unitFactory = require('../models/unit');
    
    var unitsRepo = {};
    var client = context.client;
    
    unitsRepo.getUnitById = function (accountingNumber, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(|(accountingNumber=' + accountingNumber + ')))', unitFactory, context.options.modelsMapper.unit, true, next);
    };
    
    unitsRepo.getUnitByName = function (unit, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(|(ou=' + unit + ')))', unitFactory, context.options.modelsMapper.unit, true, next);
    };
    
    unitsRepo.searchUnitByName = function (unit, next) {
        client.executeQuery('(&(objectClass=organizationalunit)(|(ou=' + unit + '*)))', unitFactory, context.options.modelsMapper.unit, false, next);
    };
     
    return unitsRepo;
};