// @flow
const http = require("http");
const url = require("url");
const EventEmitter = require("events");
const Watershed = require("watershed");
const debug = require("debug")(`aviary:${__filename}`);
const log = require("./log")(__filename);
const pick = require("lodash/fp/pick");
const Aviary = require("./Aviary");
const Bird = require("./Bird");

const urlExists = (url : string) => false;

const shed = new Watershed();
const srv = http.createServer();

const port = process.env.PORT || 8080;

const events = new EventEmitter();
const aviary = new Aviary(events);

srv.listen(port);

srv.on("request", (req, res) => {
    debug(`Request received: ${JSON.stringify(pick(["headers", "httpVersion", "method", "url"], req))}`);

    if (!urlExists(req.url)) {
        res.writeHead(404);
        res.end();
        debug(`404 Not Found: ${req.url}`);
    }
});

srv.on('upgrade', function(req, socket, head) {
    const path = url.parse(req.url).pathname;

    try {
        const wsc = shed.accept(req, socket, head);

        const bird = new Bird(wsc);
        aviary.addBird(wsc);
    } catch (ex) {
        log.error(`Error accepting upgrade: ${ex.message}`);
        return socket.end();
    }
});