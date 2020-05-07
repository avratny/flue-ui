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
        addListener: ev.addListener,
        prepareNodePacket: function (node) {
            result = [];
            var resultArray = {
                type: node.type,
                id: node.id,
                name: node.name,
                value: node.value
            };
            if (node.hasOwnProperty("valueText")) {
                resultArray.valueText = node.valueText();
            }
            if (node.hasOwnProperty("moreoptionsgroup")) {
                var theNode = RED.nodes.getNode(node.moreoptionsgroup);
                if (theNode) resultArray.moreoptionsgroup = theNode.name + "/";
            }
            resultArray = {
                ...node,
                ...resultArray
            };
            result.push(resultArray);
            return result[0];
        }
    };
};

var io;
var ev;

function init(RED) {
    var events = require('events');
    io = require('socket.io')(RED.server);
    ev = new events.EventEmitter();
}
