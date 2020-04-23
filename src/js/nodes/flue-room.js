module.exports = function(RED) {
    function FlueRoomNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.floor = n.floor;
    }
    RED.nodes.registerType("flue-room",FlueRoomNode);
}
