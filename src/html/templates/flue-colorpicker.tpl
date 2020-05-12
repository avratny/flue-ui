<flue>
    <div class="line flue" id="##ID##" data-order="" data-color="" data-value="" data-type="status-panel">
        <div class="line-icon"><img style="height: 48px" src=""></div>
        <div class="line-name" data-element-type="valueText">
            <div class="section pickers_section">
                        <div id="snackbar_material" class="">
                        </div>
                            <div class="content">
                                <div class="colors boll"></div>
                                <div class="picker-colors " onclick="colorpickerButtonMaterial()">
                                <div class="btn picker-color animate" style="background: rgb(240, 255, 244);"></div>
                                <div class="btn picker-color animate" style="background: rgb(198, 246, 213);"></div>
                                <div class="btn picker-color animate picker" style="background: rgb(154, 230, 180);"></div>
                                <div class="btn picker-color animate" style="background: rgb(104, 211, 145);"></div>
                                <div class="btn picker-color animate" style="background: rgb(72, 187, 120);"></div>
                                <div class="btn picker-color animate" style="background: rgb(56, 161, 105);"></div>
                                <div class="btn picker-color animate" style="background: rgb(47, 133, 90);"></div>
                                <div class="btn picker-color animate" style="background: rgb(39, 103, 73);"></div>
                                <div class="btn picker-color animate" style="background: rgb(34, 84, 61);"></div>
                                <div class="btn picker-color back animate" style="background: rgb(0, 0, 0);"></div>
                            </div>
                        </div>
            </div>
        </div>
    </div>
    <style>
        .btn {
            border: solid 1px #eee;
            position: relative;
            display: inline-block;
            margin: 5px;
            border-radius: 100%;
            opacity: 0;
            transform: scale(0.5);
            transition: all 0.3s cubic-bezier(0.18, 0.89, 0.32, 1.28);
        }
        .btn:active {
            transform: scale(1.3);
        }
        .btn:active {
            transform: scale(1.1);
        }
        .animate {
            transform: scale(1);
            opacity: 1;
        }
        .close:before {
            content: '';
            position: absolute;
            left: 16px;
            top: 16px;
        }
        .picker {
            animation: picker 0.3s forwards;
          box-shadow:inset 0px 0px 0px 2px #333;
        }
        .colors.boll, .picker-colors  {
            text-align:center;
        }
    </style>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            $(this).attr("data-order", obj.order);
            $(this).find(".line-icon img").attr("src", "ico/"+obj.icon+".svg");
            //$(this).find(".line-name").text(obj.valueText);
        });

        if(!window.colorpickerButtonMaterial) {
            window.colorpickerButtonMaterial = function() {
                var x = document.getElementById("snackbar_material");
                (x.className = "show"),
                    setTimeout(function () {
                    x.className = x.className.replace("show", "");
                    }, 3e3);
                }
                window.colorpickerMaterial = {
                    colors: [
                    {
                        color: "white",
                        palette: [
                        "#FFC58F",
                        "#FFD6AA",
                        "#FFF1E0",
                        "#FFFAF4",
                        "#FFFFFB",
                        "#FFFFFF",
                        "#F4FFFA",
                        "#D4EBFF",
                        "#C9E2FF",
                        "#409CFF"
                        ]
                    },
                    {
                        color: "grey",
                        palette: [
                        "#F7FAFC",
                        "#EDF2F7",
                        "#E2E8F0",
                        "#CBD5E0",
                        "#A0AEC0",
                        "#718096",
                        "#4A5568",
                        "#2D3748",
                        "#1A202C",
                        "#000000"
                        ]
                    },
                    {
                        color: "red",
                        palette: [
                        "#FFF5F5",
                        "#FED7D7",
                        "#FEB2B2",
                        "#FC8181",
                        "#F56565",
                        "#E53E3E",
                        "#C53030",
                        "#9B2C2C",
                        "#742A2A",
                        "#000000"
                        ]
                    },
                    {
                        color: "orange",
                        palette: [
                        "#FFFAF0",
                        "#FEEBC8",
                        "#FBD38D",
                        "#F6AD55",
                        "#ED8936",
                        "#DD6B20",
                        "#C05621",
                        "#9C4221",
                        "#7B341E",
                        "#000000"
                        ]
                    },
                    {
                        color: "yellow",
                        palette: [
                        "#FFFFF0",
                        "#FEFCBF",
                        "#FAF089",
                        "#F6E05E",
                        "#ECC94B",
                        "#D69E2E",
                        "#B7791F",
                        "#975A16",
                        "#744210",
                        "#000000"
                        ]
                    },
                    {
                        color: "green",
                        palette: [
                        "#F0FFF4",
                        "#C6F6D5",
                        "#9AE6B4",
                        "#68D391",
                        "#48BB78",
                        "#38A169",
                        "#2F855A",
                        "#276749",
                        "#22543D",
                        "#000000"
                        ]
                    },
                    {
                        color: "teal",
                        palette: [
                        "#E6FFFA",
                        "#B2F5EA",
                        "#81E6D9",
                        "#4FD1C5",
                        "#38B2AC",
                        "#319795",
                        "#2C7A7B",
                        "#285E61",
                        "#234E52",
                        "#000000"
                        ]
                    },
                    {
                        color: "blue",
                        palette: [
                        "#EBF8FF",
                        "#BEE3F8",
                        "#90CDF4",
                        "#63B3ED",
                        "#4299E1",
                        "#3182CE",
                        "#2B6CB0",
                        "#2C5282",
                        "#2A4365",
                        "#000000"
                        ]
                    },
                    {
                        color: "indigo",
                        palette: [
                        "#EBF4FF",
                        "#C3DAFE",
                        "#A3BFFA",
                        "#7F9CF5",
                        "#667EEA",
                        "#5A67D8",
                        "#4C51BF",
                        "#434190",
                        "#3C366B",
                        "#000000"
                        ]
                    },
                    {
                        color: "purple",
                        palette: [
                        "#FAF5FF",
                        "#E9D8FD",
                        "#D6BCFA",
                        "#B794F4",
                        "#9F7AEA",
                        "#805AD5",
                        "#6B46C1",
                        "#553C9A",
                        "#44337A",
                        "#000000"
                        ]
                    },
                    {
                        color: "pink",
                        palette: [
                        "#FFF5F7",
                        "#FED7E2",
                        "#FBB6CE",
                        "#F687B3",
                        "#ED64A6",
                        "#D53F8C",
                        "#B83280",
                        "#97266D",
                        "#702459",
                        "#000000"
                        ]
                    }
                    ]
                },
                hexToRgb = function (hex) {
                    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
                    return result
                    ? "rgb(" +
                        parseInt(result[1], 16) +
                        ", " +
                        parseInt(result[2], 16) +
                        ", " +
                        parseInt(result[3], 16) +
                        ")"
                    : null;
                },
                copyToClipboard = function (el) {
                    var temp = $("<input>"),
                    color = el.data("color"),
                    setColor,
                    key = window.event;
                    (setColor = key.shiftKey
                    ? hexToRgb(color)
                    : key.ctrlKey
                    ? color
                    : color.replace("#", "")),
                    $("body").append(temp),
                    temp.val(setColor).select(),
                    document.execCommand("copy"),
                    temp.remove();
                },
                colors = $(".colors"),
                pickerColors = $(".picker-colors"),
                window.colorpickerFillColors = function () {
                    var color;
                    pickerColors.empty(),
                    $.each(colorpickerMaterial.colors, function (i, item) {
                        colors.append($('<div class="btn color"></div>')),
                        (color = $(".btn"))
                            .eq(i)
                            .css("background", item.palette[19 == i ? 0 : 5]),
                        setTimeout(function () {
                            color.eq(i).addClass("animate");
                        }, 10 * i);
                    }),
                    color.click(function () {
                        var index = color.index(this);
                        colorpickerFillPickerColors(index);
                    }),
                    color.last().remove();
                    color.width(($("$flueNode .line-name").width()/colorpickerMaterial.colors.length)-10);
                    color.height(color.eq(0).width());
                    $("$flueNode .line-name .colors.boll").css("padding-top",($("$flueNode .line-name").height()-(color.eq(0).css("width").replace("px",""))-12)/2);

                },
                window.colorpickerFillPickerColors = function (ref) {
                    var pickerColor;
                    colors.empty(),
                    $.each(colorpickerMaterial.colors[ref].palette, function (i, color) {
                        pickerColors.append($('<div class="btn picker-color"></div>')),
                        (pickerColor = $(".btn"))
                            .eq(i)
                            .css("background", color)
                            .data("color", color),
                        setTimeout(function () {
                            pickerColor.eq(i).addClass("animate");
                        }, 10 * i);
                    }),
                    pickerColor.click(function () {
                        pickerColor.removeClass("picker"),
                        $(this).addClass("picker"),
                        copyToClipboard($(this));
                    }),
                    pickerColor
                        .addClass("back")

                        .click(function () {
                        setTimeout("colorpickerFillColors();", 2000);
                        });
                    pickerColor.width(($("$flueNode .line-name").width()/(colorpickerMaterial.colors[ref].palette.length+1))-10);
                    pickerColor.height(pickerColor.eq(0).width());

                    $("$flueNode .line-name .colors.boll").css("padding-top",($("$flueNode .line-name").height()-(pickerColor.eq(0).css("width").replace("px",""))-12)/2);
                };

        }
                colorpickerFillColors();

    </script>
</flue>
