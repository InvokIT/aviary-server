// @flow
const http = require("http");
const Watershed = require("watershed");
const debug = require("debug")("aviary:index");

const shed = new Watershed();
const srv = http.createServer();

const port = process.env.PORT || 8080;

srv.listen(port);
srv.on('upgrade', function(req, socket, head) {
    var wsc;
    try {
        wsc = shed.accept(req, socket, head);
    } catch (ex) {
        console.error('error: ' + ex.message);
        return socket.end();
    }

    wsc.on('text', (text: string) => {
        // TODO
        // handleCommand(JSON.parse(text));
    });

    wsc.on('binary', (buffer : Buffer) => {
        // TODO
    });

    wsc.on("error", (error : Error) => {
        // TODO
    });

    wsc.on("connectionReset", () => {
        // TODO
    });

    wsc.on('end', (code : string, reason: string) => {
        // TODO
    });
});