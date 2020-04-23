function generateBuildings(nodeObject) {
    var result = [];
    nodeObject.eachNode(function (node) {
        if(nodeObject.getNode(node.id) !== null) {
            var cNode = nodeObject.getNode(node.id);
            if(cNode.type == "flue-building") {
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

module.exports.generateBuildings = generateBuildings;
