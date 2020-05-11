<flue>
    <div class="line flue" id="##ID##" data-order="" data-color="" data-value="" data-type="chart">
        <div class="line-icon"><img style="height: 48px" src=""></div>
        <div class="line-name"><canvas style="height: 50px"></canvas></div>
    </div>
    <script>
        $(document).on("flue:input", "$flueNode", function(event, obj) {
            $(this).attr("data-order", obj.order);
            $(this).find(".line-icon img").attr("src", "ico/"+obj.icon+".svg");
            Chart.defaults.scale.gridLines.drawOnChartArea = false;
            Chart.defaults.global.legend.display = false;
            Chart.defaults.global.title.display = false;
            var ctx = $("$flueNode canvas")[0].getContext('2d');
            debugger;
            var chart = new Chart(ctx, {
                type: "line",
                data: obj.data,
                responsive: true,
                maintainAspectRatio: false,
                height: "50px"
            });
            $("$flueNode canvas").height(50);
        });

    </script>
</flue>
