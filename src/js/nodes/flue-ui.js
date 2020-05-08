module.exports = function (RED) {
    var communication = require('./communication')(RED);
    var path = require('path');
    var fs = require("fs");
    var node;
    var flueJSONbuilder = require('../utils/flueJSONbuilder.js');
    var socket;

    function FlueUiNode(n) {
        RED.nodes.createNode(this, n);
        this.url = n.url;
        this.homepage = n.homepage;
        this.title = n.title;
        this.css = n.css;
        node = this;

        RED.httpAdmin.get(n.url + '/', function (req, res) {
            var file = fs.readFileSync(path.join(__dirname, '../web/index.html'));
            res.setHeader('Content-Type', 'text/html');
            res.status(200).send(file);
        });

        RED.httpAdmin.get(n.url + '/ui', function (req, res) {
            res.json(n);
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
};
