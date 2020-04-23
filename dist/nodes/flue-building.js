module.exports = function(RED) {
    function FlueBuildingNode(n) {
        RED.nodes.createNode(this,n);
        this.name = n.name;
        this.longitude = n.longitude;
        this.latitude = n.latitude;
        this.ui = n.ui;
    }
    RED.nodes.registerType("flue-building",FlueBuildingNode);
}
