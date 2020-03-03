module.exports = function _executeQueryPromise(client, searchBase, opts) { 
    return new Promise((resolve, reject) => {
        client.search(searchBase, opts, function (err, ldapRes) {
            let groupedObject = {};
            ldapRes.on('searchEntry', function (entry) {
                if (typeof entry.json != 'undefined') {
                    let objectIdentifier = entry.object.uniqueIdentifier;
                    if (groupedObject[objectIdentifier] === undefined) {
                        groupedObject[objectIdentifier] = Array();
                    }
                    groupedObject[objectIdentifier].push(entry.object);
                } else {
                    resolve(groupedObject);
                }
            });
            ldapRes.on('searchReference', function (referral) {
                //console.log('referral: ' + referral.uris.join());
            });
            ldapRes.on('error', function (err) {
                console.error('error: ' + err.message);
                reject(err);
            });
            ldapRes.on('timeout', function (err) {
                console.error('error: ' + err.message);
                reject(err);
            });
            ldapRes.on('end', function () {
                resolve(groupedObject);
            });
        });
    });
}