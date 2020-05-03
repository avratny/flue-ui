module.exports = function (RED) {
    function FlueButtonNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.onlabel = config.onlabel;
        node.offlabel = config.offlabel;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;
        node.moreButtonVisibility = (node.timer || node.scheduler);


        node.valueText = function () {
            return (node.value == 0 ? node.offlabel : node.onlabel);
        };

        var group = RED.nodes.getNode(node.group);
        var ui = RED.nodes.getNode(group.ui);

        ui.addListener(node.id, function (values) {
            node.value = (values.value == 0) ? 1 : 0;
            node.send({
                payload: {
                    value: node.value,
                    valueText: (node.value == 0) ? node.offlabel : node.onlabel
                },
                topic: 'value'
            });
            ui.emit("io", {
                "id": node.id,
                "value": node.value,
                "valueText": (node.value == 0) ? node.offlabel : node.onlabel
            });
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
                ui.emit("io", {
                    "id": node.id,
                    "value": node.value,
                    "valueText": (node.value == 0) ? node.offlabel : node.onlabel
                });
            }
        });
    }
    RED.nodes.registerType("flue-button", FlueButtonNode);
};
