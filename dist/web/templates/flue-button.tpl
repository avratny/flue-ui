<flue>
    <div class="line flue" id="##ID##" data-value="" data-order="" data-type="toggle-line">
        <div class="line-icon"><img style="height: 48px" src=""></div>
        <div class="line-name"></div>
        <div class="line-buttons">
            <button class="button" id="btnWithValue" data-element-type="valueText"></button>
            <button class="button button-more" data-element-type="settings-button"
                data-visible="" data-target="" data-url=""><i class="fa fa-cog"></i></button>
        </div>
    </div>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            if(obj.propertyExistsAndHasValue('valueText')) $(this).find("button#btnWithValue").text(obj.valueText);
            if(obj.propertyExistsAndHasValue('icon')) $(this).find(".line-icon img").attr("src", "ico/"+obj.icon+".svg");
            if(obj.propertyExistsAndHasValue('name')) $(this).find(".line-name").text(obj.name);
            if(obj.propertyExistsAndHasValue('rawvalue')) $(this).attr("data-value", obj.rawvalue);
            if(obj.propertyExistsAndHasValue('value')) $(this).attr("data-value", obj.value);
            if(obj.propertyExistsAndHasValue('morebuttongroup')) $(this).attr("data-value", obj.value);
            if(obj.propertyExistsAndHasValue('grouptarget')) $(this).find("[data-target]").attr("data-value", obj.value);
            if(obj.propertyExistsAndHasValue('value')) $(this).attr("data-value", obj.value);
        });

        $(document).on("click", "$flueNode #btnWithValue", function(event) {
            IO.emit("click", {
                id: $($(this).closest(".flue")).attr("id"),
                value: $($(this).closest(".flue")).attr("data-value")
            });
        });
    </script>
</flue>
