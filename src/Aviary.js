// @flow
const EventEmitter = require("events");
const debug = require("debug")(`aviary:${__filename}`);
const log = require("./log")(__filename);
const Bird = require("./Bird");

// Manages the birds/clients on this server
class Aviary {
    _birds : Set<Bird> = new Set();
    _events : EventEmitter;

    constructor(events : EventEmitter) {
        this._events = events;
    }

    addBird(bird : Bird) {
        this._birds.add(bird);
        bird.events.on("death", () => {
            debug(`Removing bird ${bird.id} from aviary.`);
            this._birds.delete(bird);
        });
    }
}

module.exports = Aviary;