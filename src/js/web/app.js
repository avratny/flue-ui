var IO = io();

var FLUE = {

    timers: [],

    onLoad: function () {

    },

    onReady: function () {
        FLUE.navigateTo(document.location.hash.substring(1));
    },

    navigateTo: function (uri, target = null) {
        if (target == null) {
            target = $('#content');
        }
        if (!target.hasClass("modal-body") && target.hasClass("hidden")) {
            FLUE.navigateTo(uri, $(".modal"));
            return;
        }
        $.ajax({
            url: "/flue/pages/" + uri,
            success: function (data) {
                var queue = [];
                var result = [];
                $("[data-id='pageTitle']").text(data.pageTitle);
                $("[data-id='title']").text(data.title);
                data.components.forEach(function (element) {
                    queue.push($.get("/flue/templates/" + element.type + ".tpl", function (data,
                        status) {
                        var item = data;
                        for (var key in element) {
                            item = item.replace(RegExp("##" + key.toUpperCase() + "##", 'g'), element[key]);
                        }
                        result.push($(item).html());
                    }, 'html'));
                });
                $.when.apply($, queue).done(function () {
                    target.html("");
                    target.append(result.join(''));
                    $('img[src="ico/.svg"]').each(function (i) {
                        $(this).attr("src", "ico/plug.svg");
                    });
                    var $content = target;
                    $content.children().sort(function (a, b) {
                        return +a.dataset.order - +b.dataset.order;
                    }).appendTo(target);
                    if (target.hasClass("modal-body")) {
                        $('.modal').removeClass('hidden');
                    }
                });
            }
        });
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
        }
        var keys = Object.keys(msg);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key != "icon" && key != "valueText") {
                if ($(elementName + "[data-" + key + "]").length > 0) {
                    $(elementName + "[data-" + key + "]").attr("data-" + key, msg[key]);
                } else if ($(elementName + " [data-" + key + "]").length > 0) {
                    $(elementName + " [data-" + key + "]").attr("data-" + key, msg[key]);
                }
            } else {
                if (key == "icon") {
                    if ($(elementName + "[data-element-type='icon']").length > 0) {
                        $(elementName + "[data-element-type='icon']").attr("src", "images/" + msg[key] + ".svg");
                    } else if ($(elementName + " [data-element-type='icon']").length > 0) {
                        $(elementName + " [data-element-type='icon']").attr("src", "images/" + msg[key] + ".svg");
                    }
                } else if (key == "valueText") {
                    if ($(elementName + "[data-element-type='valueText']").length > 0) {
                        $(elementName + "[data-element-type='valueText']").text(msg[key]);
                    } else if ($(elementName + " [data-element-type='valueText']").length > 0) {
                        $(elementName + " [data-element-type='valueText']").text(msg[key]);
                    }
                }
            }
        }
    },

    onTimer: function () {
        $(FLUE.timers).each(function (i) {
            this.function();
        });
    },

    registerTimerCall: function (name, closure) {
        FLUE.timers.push({
            "name": name,
            "function": closure
        });
    },

    callTimer: function (name) {
        $(FLUE.timers).each(function (i) {
            if (this.name == name)
                this.function();
        });
    }
};

$(document).ready(FLUE.onReady);
$(window).on('hashchange', FLUE.onReady);
$(window).on("load", FLUE.onLoad);
$(document).on("click", ".line.flue .button", FLUE.onClick);
$(document).on("click", '[data-target="modal"]', function (e) {
    $(".modal-header").html("").append($(e.currentTarget).closest(".line").clone());
    $(".modal-header .line").css("width", "100%").css("margin", "0");
    $(".modal-header .line .button-more").hide();
    FLUE.navigateTo($(e.currentTarget).attr("data-url"), $(".modal-body"));
});
$(document).on("click", '[data-target!="modal"]', function (e) {
    FLUE.navigateTo($(e.currentTarget).attr("data-url"), $(e.currentTarget).attr("data-target"));
});
IO.on('value', FLUE.onRecv);
setInterval(FLUE.onTimer, 900);
