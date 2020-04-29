function nodeById(nodeObject, id) {
    return nodeObject.getNode(id);
}

function nodeByName(nodeObject, name) {
    return new Promise(function (resolve, reject) {
        nodeObject.eachNode(function (node) {
            if (nodeObject.getNode(node.id) !== null && node.name == name) {
                resolve(node)
            }
        });
    });
}

function floorsByBuilding(nodeObject, buildingId) {
    return new Promise(function (resolve, reject) {
        var result = [];
        nodeObject.eachNode(function (node) {
            if (nodeObject.getNode(node.id) !== null && node.type == "flue-floor" && node.building == buildingId) {
                result.push(node);
            }
        });
        resolve(result);
    });
}

function roomsByFloor(nodeObject, floorId) {
    return new Promise(function (resolve, reject) {
        var result = [];
        nodeObject.eachNode(function (node) {
            if (nodeObject.getNode(node.id) !== null && node.type == "flue-room" && node.floor == floorId) {
                result.push(node)
            }
        });
        resolve(result);
    });
}

function generateBuildings(nodeObject) {
    var result = [];
    nodeObject.eachNode(function (node) {
        if (nodeObject.getNode(node.id) !== null) {
            var cNode = nodeObject.getNode(node.id);
            if (cNode.type == "flue-building") {
                result.push({
                    type: "flue-building",
                    id: cNode.id,
                    name: cNode.name,
                    icon: 'fa fa-industry',
                    value: "",
                    visibility: "hidden"
                });
            }
        }
    });
    return {
        title: "Gebäude",
        pageTitle: "Gebäude",
        components: result,
    };
}

function generateFloors(nodeObject, building) {
    return new Promise(function (resolve, reject) {
        var result = [];
        nodeByName(nodeObject, building).then(function (buildingNode) {
            nodeObject.eachNode(function (node) {
                if (nodeObject.getNode(node.id) !== null) {
                    var cNode = nodeObject.getNode(node.id);
                    if (cNode.type == "flue-floor" && cNode.building == buildingNode.id) {
                        result.push({
                            type: "flue-floor",
                            id: cNode.id,
                            name: cNode.name,
                            icon: 'fa fa-list-ol',
                            value: "",
                            visibility: "hidden",
                            building: building
                        });
                    }
                }
            });
            resolve({
                title: "Stockwerke",
                pageTitle: "Stockwerke",
                components: result,
            });
        });
    });
}

function generateRooms(nodeObject, building, floor) {
    var result = [];
    return new Promise(function (resolve, reject) {
        nodeByName(nodeObject, building).then(function (buildingNode) {
            floorsByBuilding(nodeObject, buildingNode.id).then(function (floorNodes) {
                floorNodes.forEach(floorNode => {
                    nodeObject.eachNode(function (node) {
                        if (nodeObject.getNode(node.id) !== null) {
                            var cNode = nodeObject.getNode(node.id);
                            if (cNode.type == "flue-room" && cNode.floor == floorNode.id && floorNode.name == floor) {
                                result.push({
                                    type: "flue-room",
                                    id: cNode.id,
                                    name: cNode.name,
                                    icon: 'fa fa-window-maximize',
                                    value: "",
                                    visibility: "hidden",
                                    building: building,
                                    floor: floor
                                });
                            }
                        }
                    });
                    resolve({
                        title: "Räume",
                        pageTitle: "Räume",
                        components: result,
                    });
                });
            });
        });
    });
}

function generateElements(nodeObject, building, floor, room) {
    var result = [];
    return new Promise(function (resolve, reject) {
        nodeByName(nodeObject, building).then(function (buildingNode) {
            floorsByBuilding(nodeObject, buildingNode.id).then(floorNodes => {
                floorNodes.forEach(floorNode => {
                    if (floorNode.name == floor) {
                        // Building, Floor
                        roomsByFloor(nodeObject, floorNode.id).then(roomNodes => {
                            roomNodes.forEach(roomNode => {
                                if (roomNode.name == room) {
                                    nodeObject.eachNode(function (node) {
                                        var cNode = nodeObject.getNode(node.id);
                                        if (cNode !== null && cNode.type.startsWith("flue-") && cNode.room == roomNode.id) {
                                            resultArray = {
                                                type: cNode.type,
                                                id: cNode.id,
                                                name: cNode.name,
                                                value: (cNode.hasOwnProperty("valueText") ? cNode.valueText() : cNode.value),
                                                rawvalue: cNode.value,
                                                visibility: "hidden"
                                            };
                                            resultArray = {
                                                ...cNode,
                                                ...resultArray
                                            };
                                            result.push(resultArray);
                                        }
                                    });
                                    resolve({
                                        title: "Raum: " + room,
                                        pageTitle: "Raum",
                                        components: result,
                                    });

                                }
                            });
                        });
                    }
                });
            });
        });
    });
}

module.exports.generateBuildings = generateBuildings;
module.exports.generateFloors = generateFloors;
module.exports.generateRooms = generateRooms;
module.exports.generateElements = generateElements;
