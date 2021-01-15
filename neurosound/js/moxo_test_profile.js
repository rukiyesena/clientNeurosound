$(document).ready(function () {

    var stlist, teststdlist;

    var dikkat = [], zamanlama = [], durtusellik = [], hiperaktivite = [], genel = [];

    var urlStd = getUrlParameter("id");
    var urlTest = getUrlParameter("ref");


    $.ajax({
        url: path.server + "/student/list",
        type: "GET",
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data, textStatus, jqXHR) {
            stlist = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })
        .then(function () {
            for (var i = 0; i < stlist.length; i++) {
                if (urlStd == stlist[i].ref) {
                    var lenghtyyy = stlist[i].testStudents.length;
                    document.getElementById("studentAd").value = stlist[i].std_name + " " + stlist[i].std_surname;
                    document.getElementById("studentBirth").value = "Yaş: " + stlist[i].birthday;
                    document.getElementById("studentProgram").value = stlist[i].program;
                    document.getElementById("studentPrototip").value = stlist[i].profileType;
                    document.getElementById("stdPhone").value = "Tel: " + stlist[i].phone1;
                    document.getElementById("testCount").value = lenghtyyy;
                }
            }

        })
    $.ajax({
        url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/filter",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststdlist = data;
            teststdlistDatatable(teststdlist);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })

    var generalDate = [], dikkatResult = [], zamanlamaResult = [], iResult = [], hResult = [];
    function teststdlistDatatable(teststdlist) {
        var dikkatTemel_1 = [], dikkatTemel_2 = [], dikkatGorsel_1 = [], dikkatGorsel_2 = [], dikkatIsıtsel_1 = [], dikkatIsıtsel_2 = [], dikkatBirlesik_1 = [], dikkatBirlesik_2 = [];
        var zamTemel_1 = [], zamTemel_2 = [], zamGorsel_1 = [], zamGorsel_2 = [], zamIsıtsel_1 = [], zamIsıtsel_2 = [], zamBirlesik_1 = [], zamBirlesik_2 = [];

        for (var i = 0; i < teststdlist.length; i++) {
            generalDate.push(teststdlist[i].start);
            for (var j = 0; j < teststdlist[i].subTests.length; j++) {
                for (var k = 0; k < teststdlist[i].subTests[j].subTestResults.length; k++) {


                    if (teststdlist[i].subTests[j].name == "Dikkat") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            dikkatTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            dikkatTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            dikkatGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            dikkatGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            dikkatIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            dikkatIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            dikkatBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            dikkatBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                    if (teststdlist[i].subTests[j].name == "Zamanlama") {
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-1") {
                            zamTemel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Temel-2") {
                            zamTemel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-1") {
                            zamGorsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Görsel-2") {
                            zamGorsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-1") {
                            zamIsıtsel_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "İşitsel-2") {
                            zamIsıtsel_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-1") {
                            zamBirlesik_1.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                        if (teststdlist[i].subTests[j].subTestResults[k].name == "Birleşik-2") {
                            zamBirlesik_2.push(teststdlist[i].subTests[j].subTestResults[k].result)
                        }
                    }
                }
            }
        }
        console.log("generalDate" + generalDate)
        for (var i = 0; i < dikkatTemel_1.length; i++) {
            dikkat[i] =
            {
                date: generalDate[i],
                temel_1: dikkatTemel_1[i],
                temel_2: dikkatTemel_2[i],
                gorsel_1: dikkatGorsel_1[i],
                gorsel_2: dikkatGorsel_2[i],
                isitsel_1: dikkatIsıtsel_1[i],
                isitsel_2: dikkatIsıtsel_2[i],
                birlesik_1: dikkatBirlesik_1[i],
                birlesik_2: dikkatBirlesik_2[i],
            }
            zamanlama[i] =
            {
                date: generalDate[i],
                temel_1: zamTemel_1[i],
                temel_2: zamTemel_2[i],
                gorsel_1: zamGorsel_1[i],
                gorsel_2: zamGorsel_2[i],
                isitsel_1: zamIsıtsel_1[i],
                isitsel_2: zamIsıtsel_2[i],
                birlesik_1: zamBirlesik_1[i],
                birlesik_2: zamBirlesik_2[i],
            }
        }
        var test_table = $('#teststd_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: dikkat,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test Tarihi", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "temel_1", title: "Temel-1" },
                { data: "temel_2", title: "Temel-2" },
                { data: "gorsel_1", title: "Görsel-1" },
                { data: "gorsel_2", title: "Görsel-2" },
                { data: "isitsel_1", title: "İşitsel-1" },
                { data: "isitsel_2", title: "İşitsel-2" },
                { data: "birlesik_1", title: "Birleşik-1" },
                { data: "birlesik_2", title: "Birleşik-2" },

            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,
            responsive: true,

        });
        test_table.on('order.dt search.dt', function () {
            test_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceAnalize(dikkat);

        /*
        


        var test_t_table = $('#test_t_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: zamanlama,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test Tarihi", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "result", title: "Zamanlama Testi Sonucu" }
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,

        });
        test_t_table.on('order.dt search.dt', function () {
            test_t_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceTAnalize(zamanlama);


        var test_i_table = $('#test_i_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: durtusellik,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test Tarihi", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "result", title: "Dürtüsellik Testi Sonucu" }
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,

        });
        test_i_table.on('order.dt search.dt', function () {
            test_i_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceIAnalize(durtusellik);

        var test_h_table = $('#test_h_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: hiperaktivite,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test Tarihi", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "result", title: "Hiperaktivite Testi Sonucu" }
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,

        });
        test_h_table.on('order.dt search.dt', function () {
            test_h_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceHAnalize(hiperaktivite);

        var test_custom_table = $('#testcustom_datatable').DataTable({

            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: genel,

            columns: [
                { "data": null, title: "#" },
                {
                    data: "date", title: "Test Tarihi", type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';

                    },
                },
                { data: "result_1", title: "Dikkat " },
                { data: "result_2", title: "Zamanlama " },
                { data: "result_3", title: "Dürtüsellik " },
                { data: "result_4", title: "Hiperaktivite " },
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,

        });
        test_custom_table.on('order.dt search.dt', function () {
            test_custom_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        // performanceAnalize(dikkat);

*/
    }
    function performanceAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [], temel2_value = [], gorsel1_value = [], gorsel2_value = [], isitsel1_value = [], isitsel2_value = [], birlesik1_value = [], birlesik2_value = [];
        var temel1result = [], temel2result = [], gorsel1result = [], gorsel2result = [], isitsel1result = [], isitsel2result = [], birlesik1result = [], birlesik2result = [];
        var sum = 0, testsum = 0;
        var genel = [];

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            temel1result.push(testResults[i].temel_1)
            temel2result.push(testResults[i].temel_2)
            gorsel1result.push(testResults[i].gorsel_1)
            gorsel2result.push(testResults[i].gorsel_2)
            isitsel1result.push(testResults[i].isitsel_1)
            isitsel2result.push(testResults[i].isitsel_2)
            birlesik1result.push(testResults[i].birlesik_1)
            birlesik2result.push(testResults[i].birlesik_2)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
        }
        //ay bazında performans ve random renk seçimi
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        var performance = [];
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] +"+"+ testdate[i + 1])
        }

        for (var i = 0; i < temel1result.length - 1; i++) {
            sum = temel1result[i + 1] - temel1result[i];
            temel2_sum = temel2result[i + 1] - temel2result[i];
            gorsel1_sum = gorsel1result[i + 1] - gorsel1result[i];
            gorsel2_sum = gorsel2result[i + 1] - gorsel2result[i];
            isitsel1_sum = isitsel1result[i + 1] - isitsel1result[i];
            isitsel2_sum = isitsel2result[i + 1] - isitsel2result[i];
            birlesik1_sum = birlesik1result[i + 1] - birlesik1result[i];
            birlesik2_sum = birlesik2result[i + 1] - birlesik2result[i];
            sum = sum.toFixed(3);
            sum = Number(sum);

            temel2_sum = temel2_sum.toFixed(3);
            temel2_sum = Number(temel2_sum);

            gorsel1_sum = gorsel1_sum.toFixed(3);
            gorsel1_sum = Number(gorsel1_sum);

            gorsel2_sum = gorsel2_sum.toFixed(3);
            gorsel2_sum = Number(gorsel2_sum);

            isitsel1_sum = isitsel1_sum.toFixed(3);
            isitsel1_sum = Number(isitsel1_sum);

            isitsel2_sum = isitsel2_sum.toFixed(3);
            isitsel2_sum = Number(isitsel2_sum);

            birlesik1_sum = birlesik1_sum.toFixed(3);
            birlesik1_sum = Number(birlesik1_sum);

            birlesik2_sum = birlesik2_sum.toFixed(3);
            birlesik2_sum = Number(birlesik2_sum);

            testvalue.push(sum);
            temel2_value.push(temel2_sum);
            gorsel1_value.push(gorsel1_sum);
            gorsel2_value.push(gorsel2_sum);
            isitsel1_value.push(isitsel1_sum);
            isitsel2_value.push(isitsel2_sum);
            birlesik1_value.push(birlesik1_sum);
            birlesik2_value.push(birlesik2_sum);
        }

        for (var i = 0; i < testvalue.length; i++) {
            genel[i] = {
                performance: performance[i],
                testvalue: testvalue[i],
                temel2_value: temel2_value[i],
                gorsel1_value: gorsel1_value[i],
                gorsel2_value: gorsel2_value[i],
                isitsel1_value: isitsel1_value[i],
                isitsel2_value: isitsel2_value[i],
                birlesik1_value: birlesik1_value[i],
                birlesik2_value: birlesik2_value[i]
            }
        }
        var result_table = $('#result_datatable').DataTable({
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },
            data: genel,
            columns: [
                { "data": null, title: "#" },
                { data: "performance", title: "TEST TARİHİ" },
                { data: "testvalue", title: "Temel-1" },
                { data: "temel2_value", title: "Temel-2" },
                { data: "gorsel1_value", title: "Görsel-1" },
                { data: "gorsel2_value", title: "Görsel-2" },
                { data: "isitsel1_value", title: "İşitsel-1" },
                { data: "isitsel2_value", title: "İşitsel-2" },
                { data: "birlesik1_value", title: "Birleşik-1" },
                { data: "birlesik2_value", title: "Birleşik-2" },
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,
            responsive: true,
        });
        result_table.on('order.dt search.dt', function () {
            result_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();


        var genel_result = document.getElementById('genel_result').getContext('2d');
        var myChart = new Chart(genel_result, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: 'Temel-1',
                    data: temel1result,
                    backgroundColor: [
                        '#F64E60'
                    ],
                    borderColor: [
                        '#F64E60'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },
                {
                    label: 'Temel-2',
                    data: temel2result,
                    backgroundColor: [
                        '#FFE2E5'
                    ],
                    borderColor: [
                        '#FFE2E5'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Görsel-1',
                    data: gorsel1result,
                    backgroundColor: [
                        '#FFA800'
                    ],
                    borderColor: [
                        '#FFA800'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                }, {
                    label: 'Görsel-2',
                    data: gorsel2result,
                    borderColor: [
                        '#181C32'
                    ],
                    backgroundColor: [
                        '#181C32'
                    ],
                    fill: false,
                    pointHitRadius: 20,

                },
                {
                    label: 'İşitsel-1',
                    data: isitsel1result,
                    backgroundColor: [
                        '#3699FF'
                    ],
                    borderColor: [
                        '#3699FF'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'İşitsel-2',
                    data: isitsel2result,
                    backgroundColor: [
                        '#8950FC'
                    ],
                    borderColor: [
                        '#8950FC'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-1',
                    data: birlesik1result,
                    backgroundColor: [
                        '#1BC5BD'
                    ],
                    borderColor: [
                        '#1BC5BD'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                }, {
                    label: 'Birleşik-2',
                    data: birlesik2result,
                    backgroundColor: [
                        '#C9F7F5'
                    ],
                    borderColor: [
                        '#C9F7F5'
                    ],
                    fill: false,
                    pointHitRadius: 20,
                },]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                    },
                    title: {
                        display: true,
                        text: 'Chart.js Line Chart - Different point sizes'
                    }
                },
                hover: {
                    mode: 'index'
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        })
       
            

        var testsum = 0, gorselsum = 0, gorsel2sum = 0, isitselsum = 0, isitsel2sum = 0, birlesiksum = 0, birlesik2sum = 0, temel2sum = 0;
        //temel1 general performance 
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
            gorselsum += gorsel1_value[i];
            gorsel2sum += gorsel2_value[i];
            isitselsum += isitsel1_value[i];
            isitsel2sum += isitsel2_value[i];
            birlesiksum += birlesik1_value[i];
            birlesik2sum += birlesik2_value[i];
            temel2sum += temel2_value[i]
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        gorselsum = gorselsum.toFixed(3);
        gorselsum = Number(gorselsum)
        gorsel2sum = gorsel2sum.toFixed(3);
        gorsel2sum = Number(gorsel2sum)
        isitselsum = isitselsum.toFixed(3);
        isitselsum = Number(isitselsum)
        isitsel2sum = isitsel2sum.toFixed(3);
        isitsel2sum = Number(isitsel2sum)

        birlesiksum = birlesiksum.toFixed(3);
        birlesiksum = Number(birlesiksum)
        birlesik2sum = birlesik2sum.toFixed(3);
        birlesik2sum = Number(birlesik2sum)
        temel2sum = temel2sum.toFixed(3);
        temel2sum = Number(temel2sum)

        //temel1 genel performans chart
        var element = document.getElementById("general_value_chart_t1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testsum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel1 genel performans chart
        var element = document.getElementById("general_value_chart_g1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorselsum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['warning']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //gorsel2 genel performans chart
        var element = document.getElementById("general_value_chart_g2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [gorsel2sum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['dark']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("general_value_chart_i1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitselsum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['primary']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel2 genel performans chart
        var element = document.getElementById("general_value_chart_i2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitsel2sum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['info']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //birleşik1 genel performans chart
        var element = document.getElementById("general_value_chart_b1");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [birlesiksum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();
        //birleşik 2 genel performans chart
        var element = document.getElementById("general_value_chart_b2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [isitsel2sum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['success']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();

        //işitsel1 genel performans chart
        var element = document.getElementById("general_value_chart_t2");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [temel2sum],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();
        /*
         var ctx_line = document.getElementById('chart-line').getContext('2d');
         var myChart = new Chart(ctx_line, {
             type: 'line',
             data: {
                 labels: testdate,
                 datasets: [{
                     label: '# Sonuçlar',
                     data: testresult,
                     backgroundColor: [
                         'rgba(255, 99, 132, 0.2)'
                     ],
                     borderColor: [
                         'rgba(255, 99, 132, 1)'
                     ],
                     fill: false,
                 }]
             },
             options: {
                 responsive: true,
                 title: {
                     display: true,
  
                 },
                 tooltips: {
                     mode: 'index',
                     intersect: false,
                 },
                 hover: {
                     mode: 'nearest',
                     intersect: true
                 },
                 scales: {
                     x: {
                         display: true,
                         scaleLabel: {
                             display: true,
                             labelString: 'Month'
                         }
                     },
                     y: {
                         display: true,
                         scaleLabel: {
                             display: true,
                             labelString: 'Value'
                         }
                     }
                 }
             }
         });*/

    }
    function performanceTAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [];
        var sum = 0, testsum = 0;

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            testresult.push(testResults[i].result)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        //ay bazında performans
        for (var i = 0; i < testresult.length - 1; i++) {
            sum = testresult[i + 1] - testresult[i];
            sum = sum.toFixed(3);
            sum = Number(sum);
            testvalue.push(sum);
        }
        console.log(testvalue)
        //general performance 
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        document.getElementById("resultTPeformance").value = testsum;

        var testYuzde = (testsum * 100) / 4
        testYuzde = testYuzde.toFixed(3);
        testYuzde = Number(testYuzde);


        //genel performans chart
        var element = document.getElementById("general_t_chart");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testYuzde],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();


        //random color
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "-" + testdate[i + 1])
        }
        //pie chart
        var ctx = document.getElementById('chart-t-pie').getContext('2d');
        var config = new Chart(ctx, {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: testvalue,
                    backgroundColor: color,
                    label: 'Dataset 1'
                }],
                labels: performance,
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,

                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                    reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }
        });
        var ctx_line = document.getElementById('chart-t-line').getContext('2d');
        var myChart = new Chart(ctx_line, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: '# Sonuçlar',
                    data: testresult,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,

                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        });

    }
    function performanceIAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [];
        var sum = 0, testsum = 0;

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            testresult.push(testResults[i].result)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        //ay bazında performans
        for (var i = 0; i < testresult.length - 1; i++) {
            sum = testresult[i + 1] - testresult[i];
            sum = sum.toFixed(3);
            sum = Number(sum);
            testvalue.push(sum);
        }
        console.log(testvalue)
        //general performance 
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        document.getElementById("resultIPeformance").value = testsum;

        var testYuzde = (testsum * 100) / 4
        testYuzde = testYuzde.toFixed(3);
        testYuzde = Number(testYuzde);


        //genel performans chart
        var element = document.getElementById("general_i_chart");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testYuzde],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();


        //random color
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "-" + testdate[i + 1])
        }
        //pie chart
        var ctx = document.getElementById('chart-i-pie').getContext('2d');
        var config = new Chart(ctx, {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: testvalue,
                    backgroundColor: color,
                    label: 'Dataset 1'
                }],
                labels: performance,
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,

                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                    reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }
        });
        var ctx_line = document.getElementById('chart-i-line').getContext('2d');
        var myChart = new Chart(ctx_line, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: '# Sonuçlar',
                    data: testresult,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,

                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        });
    }

    function performanceHAnalize(testResults) {
        var testdate = [], testresult = [], testvalue = [];
        var sum = 0, testsum = 0;

        testResults.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        console.log(testResults)
        for (var i = 0; i < testResults.length; i++) {
            testdate.push(convertDate(testResults[i].date));
            testresult.push(testResults[i].result)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        console.log(testdate)
        //ay bazında performans
        for (var i = 0; i < testresult.length - 1; i++) {
            sum = testresult[i + 1] - testresult[i];
            sum = sum.toFixed(3);
            sum = Number(sum);
            testvalue.push(sum);
        }
        console.log(testvalue)
        //general performance 
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        document.getElementById("resultHPeformance").value = testsum;

        var testYuzde = (testsum * 100) / 4
        testYuzde = testYuzde.toFixed(3);
        testYuzde = Number(testYuzde);


        //genel performans chart
        var element = document.getElementById("general_h_chart");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testYuzde],
            chart: {
                height: height,
                type: 'radialBar',
            },
            plotOptions: {
                radialBar: {
                    hollow: {
                        margin: 0,
                        size: "65%"
                    },
                    dataLabels: {
                        showOn: "always",
                        name: {
                            show: false,
                            fontWeight: '700'
                        },
                        value: {
                            color: KTApp.getSettings()['colors']['gray']['gray-700'],
                            fontSize: "30px",
                            fontWeight: '700',
                            offsetY: 12,
                            show: true,
                            formatter: function (val) {
                                return val + '%';
                            }
                        }
                    },
                    track: {
                        background: KTApp.getSettings()['colors']['theme']['light']['success'],
                        strokeWidth: '100%'
                    }
                }
            },
            colors: [KTApp.getSettings()['colors']['theme']['base']['danger']],
            stroke: {
                lineCap: "round",
            },
            labels: ["Progress"]
        };

        var chart = new ApexCharts(element, options);
        chart.render();


        //random color
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        for (var i = 0; i < testdate.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "-" + testdate[i + 1])
        }
        //pie chart
        var ctx = document.getElementById('chart-h-pie').getContext('2d');
        var config = new Chart(ctx, {
            type: 'polarArea',
            data: {
                datasets: [{
                    data: testvalue,
                    backgroundColor: color,
                    label: 'Dataset 1'
                }],
                labels: performance,
            },
            options: {
                responsive: true,
                legend: {
                    position: 'right',
                },
                title: {
                    display: true,

                },
                scale: {
                    ticks: {
                        beginAtZero: true
                    },
                    reverse: false
                },
                animation: {
                    animateRotate: false,
                    animateScale: true
                }
            }
        });
        var ctx_line = document.getElementById('chart-h-line').getContext('2d');
        var myChart = new Chart(ctx_line, {
            type: 'line',
            data: {
                labels: testdate,
                datasets: [{
                    label: '# Sonuçlar',
                    data: testresult,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    fill: false,
                }]
            },
            options: {
                responsive: true,
                title: {
                    display: true,

                },
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                hover: {
                    mode: 'nearest',
                    intersect: true
                },
                scales: {
                    x: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Month'
                        }
                    },
                    y: {
                        display: true,
                        scaleLabel: {
                            display: true,
                            labelString: 'Value'
                        }
                    }
                }
            }
        });
    }

})