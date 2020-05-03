module.exports = function (RED) {
    var path = require('path');
    var node;
    var flueJSONbuilder = require('../utils/flueJSONbuilder.js');
    var io = require('socket.io')(RED.server);
    var socket;

    function FlueUiNode(n) {
        RED.nodes.createNode(this, n);
        this.url = n.url;
        this.homepage = n.homepage;
        node = this;

        node.addListener("io", function (values) {
            io.emit("value", values);
        });

        RED.httpAdmin.get(n.url + '/', function (req, res) {
            res.sendFile(path.join(__dirname, '../web/index.html'));
        });

        RED.httpAdmin.get(n.url + '/templates/*', function (req, res) {
            var filename = path.join(__dirname, '../web/templates', req.params[0]);
            res.setHeader('Content-Type', 'text/html');
            res.sendFile(filename, function (err) {
                if (err) {
                    if (node) {
                        node.warn(filename + " not found. Maybe running in dev mode.");
                    } else {
                        console.log("flue-ui - error:", err);
                    }
                }
            });
        });

        RED.httpAdmin.get(n.url + '/ico/*', function (req, res) {
            var filename = path.join(__dirname, '../web/ico', req.params[0]);
            res.setHeader('Content-Type', 'image/svg+xml');
            res.sendFile(filename, function (err) {
                if (err) {
                    if (node) {
                        node.warn(filename + " not found. Maybe running in dev mode.");
                    } else {
                        console.log("flue-ui - error:", err);
                    }
                }
            });
        });

        RED.httpAdmin.post(n.url + '', function (req, res) {
            node.emit(req.body.id, req.body);
            res.status(200).send("");
        });

        RED.httpAdmin.get(n.url + '/pages/*/*', function (req, res) {
            flueJSONbuilder.generateElements(RED.nodes, req.params[0]).then(function (result) {
                res.json(result);
            });
        });

        RED.httpAdmin.get(n.url + '/css/*', function (req, res) {
            var filename = path.join(__dirname, '../web/css', req.params[0]);
            res.setHeader('Content-Type', 'text/css');
            res.sendFile(filename, function (err) {
                if (err) {
                    if (node) {
                        node.warn(filename + " not found. Maybe running in dev mode.");
                    } else {
                        console.log("flue-ui - error:", err);
                    }
                }
            });
        });

        RED.httpAdmin.get(n.url + '/js/*', function (req, res) {
            var filename = path.join(__dirname, '../web/js', req.params[0]);
            res.setHeader('Content-Type', 'application/javscript');
            res.sendFile(filename, function (err) {
                if (err) {
                    if (node) {
                        node.warn(filename + " not found. Maybe running in dev mode.");
                    } else {
                        console.log("flue-ui - error:", err);
                    }
                }
            });
        });

    }

    RED.nodes.registerType("flue-ui", FlueUiNode);

    io.on('connection', (socket) => {
        this.socket = socket;
        socket.on('click', (msg) => {
            node.emit(msg.id, msg);
        });
    });

};
