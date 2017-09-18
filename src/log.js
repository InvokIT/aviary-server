// @flow

// Module exports a function to create named loggers and has properties to globally enable/disable specific logging levels.
// createLogger(name)
// - createLogger.isDebugEnabled
// - createLogger.isInfoEnabled
// - createLogger.isWarnEnabled
// - createLogger.isErrorEnabled

const camelCase = require("lodash/fp/camelCase");
const reduce = require("lodash/fp/reduce");

const levels = ["info", "warn", "error", "trace", "debug"];

const levelsEnabled = reduce((o : Object, level : string) => {
    o[level] = false;
}, {});

class Logger {
    name : string;

    constructor(name : string) {
        this.name = name;
    }

    log(level : string, msg : string) : void {
        if (levelsEnabled[level]) {
            console[level.toLowerCase()](this.formatMessage(msg));
        }
    }

    formatMessage(msg : string) : string {
        const now : string = new Date().toISOString();
        const formattedMsg : string = `[${now}] ${this.name} ${msg}`;
        return formattedMsg;
    }
}

// Add level-specific functions to Logger class
// debug(msg), info(msg), etc.
Object.defineProperties(Logger.prototype, reduce((props, level) => {
    props[level.toLowerCase()] = function(msg : string) {
        this.log(level, msg);
    };
}, {}, levels));

const createLogger = (name : string) => {
    return new Logger(name);
};

module.exports = createLogger;

// Define isLevelEnabled properties on exported createLogger function
Object.defineProperties(module.exports, reduce((o, level) => {
    o[camelCase(`is-${(level)}-enabled`)] = {
        get: () => levelsEnabled[level],
        set: (v : boolean) => levelsEnabled[level] = v
    }
}, {}));
