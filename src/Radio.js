// @flow
const EventEmitter = require("events");
const debug = require("debug")(`aviary:${__filename}`);
const log = require("./log")(__filename);
const uuid = require("uuid/v4");

class Radio {
    _events : EventEmitter = new EventEmitter();

    on(type : string, listener : (...params: Array<any>) => void) {
        this._events.on(type, listener);
    }

    off(type : string, listener : (...args: Array<any>) => void) {
        this._events.removeListener(type, listener);
    }

    emit(type : string, ...args: Array<any>) {
        this._events.emit(type, ...args);
    }
}

module.exports = Radio;