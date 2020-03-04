const debug = require('debug')('connection-pool');
const PSemaphore = require('promise-semaphore');

module.exports = class ConnectionPool {

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
        return this.pSemaphore.add(async () => {
            debug("GET");
            let client = this._get();
            try {
                return await f(client);
            } finally {
                debug("PUT");
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