module.exports = function (RED) {
    var communication = require('./communication')(RED);

    function FlueUpDownNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.upicon = config.upicon;
        node.downicon = config.downicon;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;
        node.moreoptionsgroup = config.moreoptionsgroup;
        node.hasmoreoptionsgroup = config.hasmoreoptionsgroup;
        node.grouptarget = config.grouptarget;
        node.moreButtonVisibility = (node.timer || node.scheduler || node.hasmoreoptionsgroup);

        node.valueText = function () {
            return (node.value == 0 ? node.offlabel : node.onlabel);
        };

        var group = RED.nodes.getNode(node.group);

        communication.ev.addListener(node.id, function (values) {
            console.info(values);
            node.value = (values.value == 0) ? 1 : 0;
            node.send({
                payload: {
                    value: node.value,
                    valueText: (node.value == 0) ? node.offlabel : node.onlabel
                },
                topic: 'value'
            });
            communication.io.emit("value", {
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
                communication.io.emit("value", {
                    "id": node.id,
                    "value": node.value,
                    "valueText": (node.value == 0) ? node.offlabel : node.onlabel
                });
            }
        });
    }
    RED.nodes.registerType("flue-updown", FlueUpDownNode);
};
