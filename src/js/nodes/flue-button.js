module.exports = function (RED) {
    var communication = require('./communication')(RED);

    function FlueButtonNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.onlabel = config.onlabel;
        node.offlabel = config.offlabel;
        node.value = config.value;
        node.icon = config.icon;
        node.linkgroup = config.linkgroup;
        node.linktarget = config.linktarget;

        node.valueText = function () {
            return (node.value == 0 ? node.offlabel : node.onlabel);
        };

        var group = RED.nodes.getNode(node.group);

        communication.ev.addListener(node.id, function (values) {
            node.value = (values.value == 0) ? 1 : 0;
            node.send({
                payload: {
                    value: node.value,
                    valueText: (node.value == 0) ? node.offlabel : node.onlabel
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
                        value: node.value,
                        valueText: (node.value == 0) ? node.offlabel : node.onlabel
                    },
                    topic: 'value'
                });
                communication.io.emit("value", communication.prepareNodePacket(node));
            }
        });
    }
    RED.nodes.registerType("flue-button", FlueButtonNode);
};
