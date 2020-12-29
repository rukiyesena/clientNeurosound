/*
"use strict";

// Class definition


var values = [];
var result_1, result_2, result_3, result_4;
let inputs = $('.inputsDiv input');

inputs.on('input', function () {
    $("#result_1").map(function () {
        result_1 = this.value;
    }).get();
    $("#result_2").map(function () {
        result_2 = this.value;
    }).get();
    $("#result_3").map(function () {
        result_3 = this.value;
    }).get();
    $("#result_4").map(function () {
        result_4 = this.value;
    }).get();
    values = [result_1, result_2, result_3, result_4]
    console.log(values)

    var options = {
        series: [{
            name: 'Sonuç',
            data: values,
        },],
        chart: {
            type: 'bar',
            height: 350,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: ['30%'],
                endingShape: 'rounded'
            },
        },
        legend: {
            show: false
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: ['Dikkat', 'Zamanlama', 'Dürtüsellik', 'Hiperaktivite'],
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false
            },
            labels: {
                style: {
                    colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    colors: KTApp.getSettings()['colors']['gray']['gray-500'],
                    fontSize: '12px',
                    fontFamily: KTApp.getSettings()['font-family']
                }
            }
        },
        fill: {
            opacity: 1
        },
        states: {
            normal: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            hover: {
                filter: {
                    type: 'none',
                    value: 0
                }
            },
            active: {
                allowMultipleDataPointsSelection: false,
                filter: {
                    type: 'none',
                    value: 0
                }
            }
        },
        tooltip: {
            style: {
                fontSize: '12px',
                fontFamily: KTApp.getSettings()['font-family']
            },
            y: {
                formatter: function (val) {
                    return "$" + val + " thousands"
                }
            }
        },
        colors: [KTApp.getSettings()['colors']['theme']['base']['danger'], KTApp.getSettings()['colors']['gray']['gray-300']],
        grid: {
            borderColor: KTApp.getSettings()['colors']['gray']['gray-200'],
            strokeDashArray: 4,
            yaxis: {
                lines: {
                    show: true
                }
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#kt_charts_widget_1_chart"), options);

    chart.render();


    // Webpack support

});
*/