var inited = false;

module.exports = function (RED) {
    if (!inited) {
        inited = true;
        init(RED);
    }

    return {
        io: io,
        ev: ev,
        addListener: ev.addListener,
        prepareNodePacket: function (node) {
            var resultArray = {
                type: node.type,
                id: node.id,
                name: node.name,
                value: node.value
            };
            if (node.hasOwnProperty("valueText")) {
                resultArray.valueText = node.valueText();
            }
            if (node.hasOwnProperty("linkgroup")) {
                var theNode = RED.nodes.getNode(node.linkgroup);
                if (theNode) resultArray.linkgroup = theNode.name + "/";
            }
            resultArray = {
                ...node,
                ...resultArray
            };
            if(resultArray.icon === undefined || resultArray.icon === "") resultArray.icon = "image";
            return resultArray;
        }
    };
};

var io;
var ev;

function init(RED) {

    var events = require('events');
    io = require('socket.io')(RED.server);
    ev = new events.EventEmitter();

    ev.addListener("io", function (values) {
        io.emit("value", values);
    });

    io.on('connection', (socket) => {
        socket.on('click', (msg) => {
            ev.emit(msg.id, msg);
        });
    });
}
