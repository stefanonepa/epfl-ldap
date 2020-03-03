'use strict';
module.exports = function (context) {
    
    let userFactory = require('../models/user');
    let usersRepo = {};
    let client = context.client;

    usersRepo.getUserBySciper = function (sciper, next) {
        client.executeQuery('(&(objectClass=posixAccount)(uniqueIdentifier=' + sciper + '))', userFactory, context.options.modelsMapper.user, true, next);
    };

    usersRepo.getUserByName = function (name, next) {
        client.executeQuery('(&(objectClass=posixAccount)(cn=' + name + '))', userFactory, context.options.modelsMapper.user, true, next);
    };

    usersRepo.getUserByPhone = function (phone, next) {
        client.executeQuery('(&(objectClass=posixAccount)(|(telephoneNumber=' + phone + ')(telephoneNumber=+41 21 69' + phone + ')))', userFactory, context.options.modelsMapper.user, true, next);
    };

    usersRepo.getUserByMail = function (mail, next) {
        client.executeQuery('(&(objectClass=posixAccount)(mail=' + mail + '))', userFactory, context.options.modelsMapper.user, true, next);
    };

    usersRepo.searchUserByName = function (name, next) {
        client.executeQuery('(&(objectClass=posixAccount)(cn=' + name + '*))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.searchUserByPhone = function (phone, next) {
        client.executeQuery('(&(objectClass=posixAccount)(telephoneNumber=*' + phone + '*))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.searchUserByUnitAcronym = function (unitAcronym, next) {
        client.executeQuery('(&(objectClass=posixAccount)(ou=*' + unitAcronym + '*))', userFactory, context.options.modelsMapper.user, false, next);
    };

    /* The plural forms always return a list, regarding of whether the search
     * criterion is unique.
     */
    usersRepo.getUsersBySciper = function (sciper, next) {
        client.executeQuery('(&(objectClass=posixAccount)(uniqueIdentifier=' + sciper + '))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.getUsersByName = function (name, next) {
        client.executeQuery('(&(objectClass=posixAccount)(cn=' + name + '))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.getUsersByPhone = function (phone, next) {
        client.executeQuery('(&(objectClass=posixAccount)(|(telephoneNumber=' + phone + ')(telephoneNumber=+41 21 69' + phone + ')))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.getUsersByMail = function (mail, next) {
        client.executeQuery('(&(objectClass=posixAccount)(mail=' + mail + '))', userFactory, context.options.modelsMapper.user, false, next);
    };

    usersRepo.getUsersByUnitAcronym = function (unitAcronym, next) {
        client.executeQuery('(&(objectClass=posixAccount)(ou=' + unitAcronym + '))', userFactory, context.options.modelsMapper.user, false, next);
    };
 
    return usersRepo;
};