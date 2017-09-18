// @flow
const flow = require('lodash/fp/flow');
const decodeCommand = require('./decodeCommand');

const handleCommand = (command : string) => {
    const cmd = decodeCommand(command);
};

module.exports = handleCommand;