module.exports = function (RED) {
    function FlueButtonNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.room = config.room;
        node.onlabel = config.onlabel;
        node.offlabel = config.offlabel;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;
        node.moreButtonVisibility = (node.timer || node.scheduler);

        var room = RED.nodes.getNode(node.room);
        var floor = RED.nodes.getNode(room.floor);
        var building = RED.nodes.getNode(floor.building);
        console.info(room);

        node.valueText = function () {
            return (node.value == 0 ? node.offlabel : node.onlabel);
        }

        var ui = RED.nodes.getNode(building.ui);
        console.info(building.ui);
        ui.addListener(node.id, function (values) {
            node.value = (values.value == 0) ? 1 : 0;
            node.send({

                    payload: {
                        value: node.value,
                        valueText: (node.value == 0) ? node.offlabel : node.onlabel
                    },
                    topic: 'value'

            })
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
}
