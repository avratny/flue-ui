<flue>
    <div class="line flue" id="##ID##" data-upvalue="" data-downvalue="" data-order="##ORDER##" data-type="updown-button">
        <div class="line-icon"><img style="height: 48px" src=""></div>
        <div class="line-name"></div>
        <div class="line-buttons">
            <button class="button" data-element-type="up"><i class="fa "></i></button>
            <button class="button" data-element-type="down"><i class="fa "></i></button>
            <button class="button button-more" data-element-type="settings-button"
                data-visible="" data-target="" data-url=""><i class="fa fa-cog"></i></button>
        </div>
    </div>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            $(this).attr("data-order", obj.order);
            $(this).find(".line-icon img").attr("src", "ico/"+obj.icon+".svg");
            $(this).find(".line-name").text(obj.name);
            $(this).find('[data-element-type="down"] i').attr("class", "fa "+obj.downicon);
            $(this).find('[data-element-type="up"] i').attr("class", "fa "+obj.upicon);
            $(this).attr("data-upvalue", obj.upvalue);
            $(this).attr("data-downvalue", obj.downvalue);
            if(obj.linkgroup !== undefined && obj.linktarget !== undefined) {
                var linkButton = $(this).find(".button-more");
                linkButton.attr("data-visible", "true");
                linkButton.attr("data-target", obj.linktarget);
                linkButton.attr("data-url", obj.linkgroup);
            } else {
                var linkButton = $(this).find(".button-more");
                linkButton.attr("data-visible", "false");
            }
        });

        $(document).on("click", '$flueNode [data-element-type="up"]', function(event) {
            IO.emit("click", {
                id: $($(this).closest(".flue")).attr("id"),
                value: $($(this).closest(".flue")).attr("data-upvalue")
            });
        });

        $(document).on("click", '$flueNode [data-element-type="down"]', function(event) {
            IO.emit("click", {
                id: $($(this).closest(".flue")).attr("id"),
                value: $($(this).closest(".flue")).attr("data-downvalue")
            });
        });
    </script>
</flue>
