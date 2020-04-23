module.exports = function(RED) {
function FlueButtonNode(config) {
    RED.nodes.createNode(this,config);
    var node = this;

    node.name = config.name;
    node.room = config.room;
    node.onlabel = config.onlabel;
    node.offlabel = config.offlabel;
    node.timer = config.timer;
    node.scheduler = config.scheduler;

    var room = RED.nodes.getNode(node.room);
    var building = RED.nodes.getNode(room.building);
   // var ui = RED.nodes.getNode(building.ui);

    /**
    ui.addListener(node.id, function (values) {
        //
    });

    node.on('input', function(msg) {
        //
    });**/
}
RED.nodes.registerType("flue-button",FlueButtonNode);
}
