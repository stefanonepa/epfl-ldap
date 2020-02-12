'use strict';

module.exports = function () {
    let omapper = require('o-mapper');
    let mapper = {};

    mapper.user = function(inputModel) {
        let schema = {
            displayName: {
                key: 'displayName'
            },
            username: {
                key: 'username'
            },
            sciper: {
                key: 'sciper'
            },
            emails: {
                key: 'emails'
            },
            accreds: {
                key: 'accreds'
            }
        };

        return omapper(inputModel, schema);
    }

    mapper.unit = function (inputModel) {
        let schema = {
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