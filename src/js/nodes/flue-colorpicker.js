module.exports = function (RED) {
    var communication = require('./communication')(RED);
    var convert = require('color-convert');

    function FlueColorpickerNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        node.name = config.name;
        node.group = config.group;
        node.order = config.order;
        node.timer = config.timer;
        node.scheduler = config.scheduler;
        node.value = config.value;
        node.icon = config.icon;

        node.valueText = function () {
            return node.value;
        };


        node.on('input', function (msg) {
            var workValue = null;
            if (msg.payload.hasOwnProperty("rgb")) {
                workValue = convert.rgb.hex(msg.payload.rgb.r, msg.payload.rgb.g, msg.payload.rgb.b);
            }
            if (msg.payload.hasOwnProperty("hsv")) {
                workValue = convert.hsv.hex(msg.payload.hsv.h, msg.payload.hsv.s, msg.payload.hsv.v);
            }
            if (msg.payload.hasOwnProperty("hsl")) {
                workValue = convert.hsl.hex(msg.payload.hsl.h, msg.payload.hsl.s, msg.payload.hsl.l);
            }
            if (msg.payload.hasOwnProperty("hex")) {
                workValue = msg.payload.hex.substr(0, 1) == "#" ? msg.payload.hex.substr(1) : msg.payload.hex;
            }
            workValue = workValue.toUpperCase();
            if (node.value != workValue) {

                node.value = workValue;

                node.send({
                    payload: {
                        hsl: convert.hex.hsl(workValue),
                        hsv: convert.hex.hsv(workValue),
                        hwb: convert.hex.hwb(workValue),
                        rgb: convert.hex.rgb(workValue),
                        cmyk: convert.hex.cmyk(workValue),
                        applergb: [
                            convert.hex.rgb(workValue)[0] / 255,
                            convert.hex.rgb(workValue)[1] / 255,
                            convert.hex.rgb(workValue)[2] / 255,
                        ]
                    },
                    topic: 'value'
                });
                communication.io.emit("value", communication.prepareNodePacket(node));
            }
        });
    }
    RED.nodes.registerType("flue-colorpicker", FlueColorpickerNode);


};
