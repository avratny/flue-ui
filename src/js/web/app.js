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
        $.ajax({
            method: "POST",
            url: "/flue",
            data: {
                id: $(e.target).data("id"),
                value: $(e.target).data("value")
            },
            success: data => {},
            error: err => {},
        });
    }
}


$(document).ready(FLUE.onReady);
$(window).on('hashchange', FLUE.onReady);
$(window).on("load", FLUE.onLoad);
$(document).on("click", ".flue .btn", FLUE.onClick);
