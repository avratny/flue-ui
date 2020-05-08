var IO = io();

var FLUE = {

    timers: [],
    base: "",

    onLoad: function () {

    },

    onReady: function () {
        $.ajax({
            url: "ui",
            success: function (data) {
                FLUE.base = data.url;
                $("title").text(data.title);
                $("link#theme").attr("src", "./css/" + data.css);
                $("main").addClass("page-" + data.layout);
                switch (data.layout) {
                    case "2-2":
                        FLUE.navigateTo(data.g4 + "/", $(".content-4"));
                    case "1-2":
                        FLUE.navigateTo(data.g3 + "/", $(".content-3"));
                    case "1-1":
                        FLUE.navigateTo(data.g2 + "/", $(".content-2"));
                    case "1":
                        FLUE.navigateTo(data.g1 + "/", $(".content-1"));
                        break;
                    default:
                        break;
                }
                $(document).on("click", '[data-target]', function (e) {
                    e.stopPropagation();
                    if ($(e.currentTarget).attr("data-target") === "modal") {
                        $(".modal-header").empty().append($(e.currentTarget).closest(".line").clone());
                        $(".modal-header .line").css("width", "100%").css("margin", "0");
                        $(".modal-header .line .button-more").hide();
                        FLUE.navigateTo($(e.currentTarget).attr("data-url"), $(".modal-body"));
                    } else {
                        FLUE.navigateTo($(e.currentTarget).attr("data-url"), $(e.currentTarget).attr("data-target"));
                    }
                });
                $(document).on("click", '.modal', function (e) {
                    if ($(e.target).hasClass("modal")) {
                        $(".modal").addClass("hidden");
                    }
                });
                IO.on('value', FLUE.onRecv);
                setInterval(FLUE.onTimer, 900);
            }
        });

    },

    navigateTo: function (uri, target = null) {
        if ((typeof target) == "string") target = $("." + target);
        if (target == null) {
            target = $('.content-1');
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
                $("title").text(data.title);
                $("[data-id='pageTitle']").text(data.pageTitle);
                $("[data-id='title']").text(data.title);
                data.components.forEach(function (element) {
                    queue.push($.get("/flue/templates/" + element.type + ".tpl", function (data,
                        status) {
                        data = data.replace(new RegExp("\\$flueNode", 'gi'), "#" + element.id.replace(".", "\\\\.") + "");
                        data = data.replace(new RegExp("\\##ID##", 'gi'), element.id);
                        result.push($(data).html());
                    }, 'html'));
                });
                $.when.apply($, queue).done(function () {
                    target.empty().append(result.join(''));
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
                    data.components.forEach(function (element) {
                        FLUE.onRecv(element);
                    });
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
        var elementName = "#" + msg.id;
        elementName = elementName.replace(".", "\\.");
        if (msg.subElementId) {
            elementName += " " + msg.subElementId;
        }
        $(elementName).trigger("flue:input", [msg]);
        var keys = Object.keys(msg);
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
