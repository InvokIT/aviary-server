const EventEmitter = require("events");
const debug = require("debug")(`aviary:${__filename}`);
const log = require("./log")(__filename);
const uuid = require("uuid/v4");

class Bird {
    _wsc;
    id : string;
    events : EventEmitter = new EventEmitter();

    constructor(wsc) {
        this._wsc = wsc;
        this.id = uuid();

        // Set up listeners
        wsc.on('text', (text: string) => {
            debug(`text received: ${text}`);
        });

        wsc.on('binary', (buffer : Buffer) => {
            log.warn("binary data received, ignoring.");
        });

        wsc.on("error", (error : Error) => {
            log.error(`WebSocket error: ${error.message}`);
        });

        wsc.on("connectionReset", () => {
            debug(`Connection reset.`);
        });

        wsc.on('end', (code : string, reason: string) => {
            debug(`Connection ended. ${code} ${reason}`);
            this.events.emit("death");
        });
    }
}

module.exports = Bird;