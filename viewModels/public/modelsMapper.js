'use strict';

var omapper = require('o-mapper');

module.exports = function () {
    var mapper = {};
    
    mapper.user = function(inputModel) {
        var schema = {
            displayName: {
                key: 'displayName'
            },
            username: {
                key: 'username'
            },
            sciper: {
                key: 'sciper'
            },
            email: {
                key: 'email'
            },
            accreds: {
                key: 'accreds'
            }
        };
        
        return omapper(inputModel, schema);
    }
    
    mapper.unit = function (inputModel) {
        var schema = {
            cn: {
                key: 'cn'
            },
            dn: {
                key: 'dn'
            },
            name: {
                key: 'name'
            },
            description: {
                key: 'description'
            },
            acronym: {
                key: 'acronym'
            },
            address: {
                key: 'address'
            }
        };
        
        return omapper(inputModel, schema);
    }

    return mapper;
}