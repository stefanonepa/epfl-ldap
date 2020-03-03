'use strict';
module.exports = function User(ldapUserArray) {
    let userModel = {};
    //TODO: populate the full model
    userModel.displayName = ldapUserArray[0].displayName;
    userModel.username = ldapUserArray[0].uid[0];
    userModel.sciper = ldapUserArray[0].uniqueIdentifier;
    userModel.emails = Array();
    userModel.title = ldapUserArray[0].personalTitle;
    userModel.accreds = Array();
    userModel.memberOf = Array();
    userModel.photoUrl = 'http://people.epfl.ch/cgi-bin/people/getPhoto?id=' + userModel.sciper;

    if (ldapUserArray[0].memberOf !== undefined) {
        // Note: if only one group, typeof string
        //       if groups, typeof object.
        //       Username banla have only one group
        
        if (typeof ldapUserArray[0].memberOf == 'object') {
            ldapUserArray[0].memberOf.map(function(groupName) {
                userModel.memberOf.push(groupName);
            });
        } else {
            userModel.memberOf = ldapUserArray[0].memberOf;
        }
    }

    ldapUserArray.map(function (userEntry) {
        if (userEntry.mail != undefined) {
            if (userEntry.mail instanceof Array) {
                // This remove duplicated entries and allow more than one email
                userModel.emails = [...new Set(userEntry.mail)];
            } else {
                userModel.emails.push(userEntry.mail);
            }
        }

        userModel.accreds.push(
            {
                unitAcronym: userEntry.ou[0],
                unitName: userEntry['ou;lang-en'],
                phone: userEntry.telephoneNumber,
                office: userEntry.roomNumber,
                address: userEntry.postalAddress ? userEntry.postalAddress : '',
                position: userEntry['title;lang-en'],
                status: userEntry.organizationalStatus
            }
        );
    });

    // All ldap properties
    userModel.optionalProperties = ldapUserArray;

    return userModel;
};