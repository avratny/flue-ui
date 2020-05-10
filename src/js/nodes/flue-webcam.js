module.exports = function (RED) {
    var communication = require('./communication')(RED);

    function FlueWebcamNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.source = config.source;
        node.sourcetype = config.sourcetype;

        var group = RED.nodes.getNode(node.group);

        communication.ev.addListener(node.id, function (values) {
            node.send({
                payload: {
                    source: node.source,
                },
                topic: 'value'
            });
            var pkg = communication.prepareNodePacket(node);
            communication.io.emit("value", pkg);
        });

        node.on('input', function (msg) {
            if (node.value != msg.payload.value) {
                node.value = msg.payload.value;
                node.send({
                    payload: {
                        source: node.source
                    },
                    topic: 'value'
                });
                communication.io.emit("value", communication.prepareNodePacket(node));
            }
        });
    }
    RED.nodes.registerType("flue-webcam", FlueWebcamNode);
};
