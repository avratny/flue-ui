module.exports = function (RED) {
    var communication = require('./communication')(RED);

    function FlueChartNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.data = config.data;
        node.icon = config.icon;

        node.on('input', function (msg) {
            if (node.data != msg.payload.data) {
                node.data = msg.payload.data;
                node.send({
                    payload: {
                        data: node.data,
                    },
                    topic: 'value'
                });
                communication.io.emit("value", communication.prepareNodePacket(node));
            }
        });
    }
    RED.nodes.registerType("flue-chart", FlueChartNode);
};
