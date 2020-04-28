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

        var room = RED.nodes.getNode(node.room);
        var building = RED.nodes.getNode(room.building);

        node.valueText = function () {
            return (node.value == 0 ? node.offlabel : node.onlabel);
        }

        // var ui = RED.nodes.getNode(building.ui);

        /**
        ui.addListener(node.id, function (values) {
            //
        });
        **/
        node.on('input', function (msg) {
            console.info(msg);
            if (msg.topic == "value") {
                node.value = msg.payload;
            }
        });
    }
    RED.nodes.registerType("flue-button", FlueButtonNode);
}
