module.exports = function (RED) {
    function FluePageNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.layout = n.layout;
        this.g1 = n.g1;
        this.g2 = n.g2;
        this.g3 = n.g3;
        this.g4 = n.g4;
    }
    RED.nodes.registerType("flue-page", FluePageNode);
};
