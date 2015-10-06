'use strict';
module.exports = function Unit(ldapUnitArray) {
    var unitModel = {};
    
    unitModel.cn = ldapUnitArray[0].cn;
    unitModel.dn = ldapUnitArray[0].dn;
    unitModel.acronym = ldapUnitArray[0].ou[0];
    unitModel.name = ldapUnitArray[0]['ou;lang-en'];
    unitModel.description = ldapUnitArray[0]['description;lang-en'];
    unitModel.uniqueIdentifier = ldapUnitArray[0].uniqueIdentifier;
    unitModel.accountingNumber = ldapUnitArray[0].accountingNumber;
    unitModel.gidNumber = ldapUnitArray[0].gidNumber;
    unitModel.membersUid = ldapUnitArray[0].memberUid;
    unitModel.responsible = ldapUnitArray[0].unitManager;
    unitModel.address = ldapUnitArray[0].postalAddress;
    
    //All ldap properties
    unitModel.optionalProperties = ldapUnitArray;

    return unitModel;
};