module.exports = function (RED) {
    var communication = require('./communication')(RED);

    function FlueStatuspanelNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;

        node.valueText = function () {
            return node.value;
        };


        node.on('input', function (msg) {
            if (node.value != msg.payload.value) {
                node.value = msg.payload.value;
                communication.io.emit("value", resultArray = {
                    ...msg.payload,
                    ...{
                        "id": node.id,
                        "value": node.value,
                        "valueText": node.value
                    }
                });

            }
        });
    }
    RED.nodes.registerType("flue-statuspanel", FlueStatuspanelNode);
};
