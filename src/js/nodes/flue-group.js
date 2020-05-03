module.exports = function (RED) {
    function FlueGroupNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.order = n.order;
    }
    RED.nodes.registerType("flue-group", FlueGroupNode);
};
