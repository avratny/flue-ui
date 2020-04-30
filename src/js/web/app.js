var IO = io();

var FLUE = {

    onLoad: function () {

    },

    onReady: function () {
        FLUE.navigateTo(document.location.hash.substring(1));
    },

    navigateTo: function (uri) {
        $.ajax({
            url: "/flue/pages/" + uri,
            success: function (data) {
                var queue = [];
                var result = [];
                $("[data-id='pageTitle']").text(data.pageTitle)
                $("[data-id='title']").text(data.title)
                data.components.forEach(element => {
                    queue.push($.get("/flue/templates/" + element.type + ".tpl", function (data,
                        status) {
                        var item = $(data)
                        for (var key in element) {
                            item.html(
                                item.html().replace(RegExp("##" + key
                                    .toUpperCase() + "##", 'g'), element[key])
                            )
                        }
                        result.push(item.html());
                    }, 'html'));
                })
                $.when.apply($, queue).done(function () {
                    $('#content').html("");
                    $('#content').append(result.join(''));
                });
            }
        })
    },

    onClick: function (e) {
        IO.emit("click", {
            id: $($(e.target).closest(".flue")).attr("id"),
            value: $($(e.target).closest(".flue")).attr("data-value")
        });
        return false;
    },

    onRecv: function (msg) {
        var elementName = "#" + msg.id.replace(".", "\\.");
        if (msg.subElementId) {
            elementName += " " + msg.subElementId;
        } else {
            elementName += " ";
        }
        $(elementName).attr("data-value", msg.value);
        if (msg.valueText) $(elementName + "[data-element-type='valueText']").text(msg.valueText);
        if (msg.icon) $(elementName + "[data-element-type='icon']").attr("src", "images/" + msg.valueText + ".svg");
        if (msg.visiblity) $(elementName + "[data-visiblity]").attr("data-visibility", msg.visiblity);
        if (msg.enabled) $(elementName + "[data-enabled]").attr("enabled", msg.enabled);
    }
}


$(document).ready(FLUE.onReady);
$(window).on('hashchange', FLUE.onReady);
$(window).on("load", FLUE.onLoad);
$(document).on("click", ".flue .btn", FLUE.onClick);
IO.on('value', FLUE.onRecv);
