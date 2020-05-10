<flue>
    <div class="line line-fullheight flue" id="##ID##" data-order="" data-type="webcam" style=''>
    </div>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            $(this).attr("data-order", obj.order);
            $(this).css("background-image", "url("+obj.source+")");
            $(this).attr("source", obj.source);
            if(obj.sourcetype == "single") {
                setInterval(function reloadBackground() {
                    $("$flueNode").css("background-image", "url("+$("$flueNode").attr("source")+"?"+new Date().getTime()+")");
                },5000);
            }
        });
    </script>
</flue>
