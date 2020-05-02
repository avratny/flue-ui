module.exports = function (RED) {
    function FlueStatuspanelNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.room = config.room;
        node.order = config.order;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;

        var room = RED.nodes.getNode(node.room);
        var floor = RED.nodes.getNode(room.floor);
        var building = RED.nodes.getNode(floor.building);

        node.valueText = function () {
            return node.value;
        }

        var ui = RED.nodes.getNode(building.ui);

        node.on('input', function (msg) {
            if (node.value != msg.payload.value) {
                node.value = msg.payload.value;
                ui.emit("io", resultArray = {
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
}
