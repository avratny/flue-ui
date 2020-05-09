<flue>
    <div class="line flue" id="##ID##" data-order="" data-color="" data-value="" data-type="status-panel">
        <div class="line-icon"><img style="height: 48px" src=""></div>
        <div class="line-name" data-element-type="valueText"></div>
    </div>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            $(this).attr("data-order", obj.order);
            $(this).find(".line-icon img").attr("src", "ico/"+obj.icon+".svg");
            $(this).find(".line-name").text(obj.valueText);
        });
    </script>
</flue>
