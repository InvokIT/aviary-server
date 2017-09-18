// @flow
const EventEmitter = require("events");
const debug = require("debug")(`aviary:${__filename}`);
const log = require("./log")(__filename);
const uuid = require("uuid/v4");
const Bird = require("./Bird");

class Branch {
    id: string;
    name: string;
    _birds: Set<Bird> = new Set();

    constructor(name : string) {
        this.name = name;
    }

    addBird(bird : Bird) {
        this._birds.add(bird);
        bird.events.on("death", () => {
            debug(`Removing bird ${bird.id} from aviary.`);
            this._birds.delete(bird);
        });
    }
}

module.exports = Branch;