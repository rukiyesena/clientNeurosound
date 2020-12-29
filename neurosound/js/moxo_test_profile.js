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
        for (var i = 0; i < teststdlist.length; i++) {
            for (let j = 0; j < teststdlist[i].results.length; j++) {
                console.log("in")
                generalDate.push(teststdlist[i].start);
                dikkatResult.push(parseFloat(teststdlist[i].results[j].result_1))
                zamanlamaResult.push(parseFloat(teststdlist[i].results[j].result_2))
                iResult.push(parseFloat(teststdlist[i].results[j].result_3))
                hResult.push(parseFloat(teststdlist[i].results[j].result_4))
            }
        }
        for (var i = 0; i < generalDate.length; i++) {
            dikkat[i] =
            {
                date: generalDate[i],
                result: dikkatResult[i]
            }
            zamanlama[i] = {
                date: generalDate[i],
                result: zamanlamaResult[i]
            }
            durtusellik[i] = {
                date: generalDate[i],
                result: iResult[i]
            }
            hiperaktivite[i] = {
                date: generalDate[i],
                result: hResult[i]
            }
            genel[i] = {
                date: generalDate[i],
                result_1: dikkatResult[i],
                result_2: zamanlamaResult[i],
                result_3: iResult[i],
                result_4: hResult[i]
            }
        }
        console.log(zamanlama)

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
                { data: "result", title: "Dikkat Testi Sonucu" }
            ],
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,

        });
        test_table.on('order.dt search.dt', function () {
            test_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        performanceAnalize(dikkat);


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


    }
    function performanceAnalize(testResults) {
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
        document.getElementById("resultPeformance").value = testsum;

        var testYuzde = (testsum * 100) / 4
        testYuzde = testYuzde.toFixed(3);
        testYuzde = Number(testYuzde);


        //genel performans chart
        var element = document.getElementById("general_value_chart");
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
        var ctx = document.getElementById('chart-area').getContext('2d');
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
        });

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