const PSemaphore = require('promise-semaphore');
const ldap = require('ldapjs');
const executeQueryPromise = require('./ldapjs-promise');

class ConnectionPool {

    constructor(n, create, destroy) {
        this.roomsLength = n;
        this.pSemaphore = new PSemaphore({rooms: this.roomsLength});
        this.create = create;
        this.destroy = destroy;
        this.rooms = [
            //{ free: false, client: null}
        ];
    }

    add(f) {
        return this.pSemaphore.add(() => {
            let client = this._get();
            try {
                return f(client);
            } finally {
                this._put(client);
            }
        });
    }

    _get() {
        for(let i=0; i < this.roomsLength; i++) {
            if (!this.rooms[i]) {
                this.rooms[i] = {
                    free: true,
                    client: this.create()
                }
            }
            // Room is furnished
            if (this.rooms[i].free) {
                this.rooms[i].free = false;
                return this.rooms[i].client;
            } else {
                // continue
            }
        }
    }

    _put(client) {
        this.rooms.forEach(room => {
            if (room.client === client) {
                room.free = true;
            }
        })
    }

    close() {
        this.rooms.forEach(room => {
            this.destroy(room.client);
        })
    }
}

const pool = new ConnectionPool(
    3,
    () =>ldap.createClient({
        url: 'ldap://ldap.epfl.ch',
        timeLimit: 1,
        sizeLimit: 10
    }),
    (client) => client.unbind()
);

sleep = (secondes) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => resolve(), secondes*1000);
    })
}

doSomething = async(client, mail) =>
{
    let opts = {
        filter: `(&(mail=${mail}@epfl.ch))`,
        scope: 'sub',
    };
    await sleep(1);
    let result = await executeQueryPromise(client, "o=epfl,c=ch", opts);
    console.log(result);
}

pool.add(function(client) {
  return doSomething(client, "gregory.charmier");
}).then(function(){ console.log("job 1 done")})

pool.add(function(client) {
  return doSomething(client, "dominique.quatravaux");
}).then(function(){ console.log("job 2 done")})

pool.add(function(client) {
  return doSomething(client, "nicolas.borboen");
}).then(function(){ console.log("job 3 done")})

pool.add(function(client) {
  return doSomething(client, "julien.delasoie");
}).then(function(){ console.log("job 4 done")})

pool.add(function(client) {
  return doSomething(client, "christian.zufferey");
}).then(function(){ console.log("job 5 done")})

pool.add(function(client) {
  return doSomething(client, "nicolas.reymond");
}).then(function(){ console.log("job 6 done")})

pool.add(function() {
    return pool.close();
}).then(function(){ console.log("Close all LDAP connections")})
