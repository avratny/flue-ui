"use strict";

function nodeById(nodeObject, id) {
    return nodeObject.getNode(id);
}

function groupNodeByName(nodeObject, name) {
    return new Promise(function (resolve, reject) {
        nodeObject.eachNode(function (node) {
            if (nodeObject.getNode(node.id) !== null && node.name == name) {
                resolve(node);
            }
        });
    });
}

function generateElements(nodeObject, group) {
    var result = [];
    return new Promise(function (resolve, reject) {
        groupNodeByName(nodeObject, group).then(function (groupNodeId) {
            nodeObject.eachNode(function (node) {
                var cNode = nodeObject.getNode(node.id);
                if (cNode !== null && cNode.type.startsWith("flue-") && cNode.group == groupNodeId.id) {
                    var resultArray = {
                        type: cNode.type,
                        id: cNode.id,
                        name: cNode.name,
                        value: (cNode.hasOwnProperty("valueText") ? cNode.valueText() : cNode.value),
                        rawvalue: cNode.value
                    };
                    resultArray = {
                        ...cNode,
                        ...resultArray
                    };
                    result.push(resultArray);
                }
            });
        });
        result.sort(sortByOrder);
        resolve({
            title: "Gruppe: " + group,
            pageTitle: "Gruppe",
            components: result,
        });
    });
}

function sortByOrder(a, b) {
    if (a.order > b.order) return 1;
    if (b.order > a.order) return -1;
    return 0;
}

module.exports.generateElements = generateElements;
module.exports.sortByOrder = sortByOrder;
