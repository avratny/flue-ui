var inited = false;

module.exports = function (RED) {
    if (!inited) {
        inited = true;
        init(RED);
    }

    ev.addListener("io", function (values) {
        io.emit("value", values);
    });

    io.on('connection', (socket) => {
        socket.on('click', (msg) => {
            ev.emit(msg.id, msg);
        });
    });

    return {
        io: io,
        ev: ev,
        addListener: ev.addListener
    };
};

var io;
var ev;

function init(RED) {
    var events = require('events');
    io = require('socket.io')(RED.server);
    ev = new events.EventEmitter();
}
