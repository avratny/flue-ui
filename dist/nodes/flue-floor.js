module.exports = function (RED) {
    function FlueFloorNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.order = n.order;
        this.building = n.building;
    }
    RED.nodes.registerType("flue-floor", FlueFloorNode);
}
