module.exports = function (RED) {
    function FluePageNode(n) {
        RED.nodes.createNode(this, n);
        this.name = n.name;
        this.type = n.type;
        this.ui = n.ui;
    }
    RED.nodes.registerType("flue-page", FluePageNode);
};
