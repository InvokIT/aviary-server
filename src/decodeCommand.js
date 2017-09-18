// @flow

function decodeCommand(command : string) {
    return JSON.parse(command);
}

module.exports = decodeCommand;