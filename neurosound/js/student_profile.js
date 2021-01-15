$(document).ready(function () {
    var deger, teststd, stlist, test;
    var items = [], itemsSt = [];
    var stdref, urlTest;


    var urlStudentRef = getUrlParameter("id");
    var urlTestRef = getUrlParameter("ref");

    var ctx = document.getElementById('chart-area').getContext('2d');
    var test_visible = document.getElementById('testName');
    var test_visibility = document.getElementById('divVisible');

    test_visibility.style.visibility = 'hidden';




    $.ajax({
        url: path.server + "/student/list",
        type: "GET",
        xhrFields: {
            withCredentials: true
        }
    })
        .done(function (data, textStatus, jqXHR) {
            deger = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error" + errorThrown, jqXHR, textStatus);
            console.error(errorThrown);
        })
        .then(function () {
            useNextLoad();
        })
    function useNextLoad() {
        if (urlStudentRef != null) {
            for (var i = 0; i < deger.length; i++) {
                if (urlStudentRef == deger[i].ref) {
                    stdref = deger[i].ref;

                    document.getElementById("studentAd").value = deger[i].std_name + " " + deger[i].std_surname;
                    document.getElementById("studentBirth").value = deger[i].birthday;
                    document.getElementById("studentProgram").value = deger[i].program;
                    document.getElementById("studentPrototip").value = deger[i].profileType;
                    document.getElementById("stdName").value = deger[i].std_name;
                    document.getElementById("stdSurname").value = deger[i].std_surname;
                    document.getElementById("stdPhone").value = deger[i].phone1;
                    document.getElementById("stdMail").value = deger[i].mail;
                    document.getElementById("testCount").value = deger[i].testStudents.length;

                    //öğrenci bilgileri altında genel başarı puanı hesabının yapılması
                    /*    var sumResult = 0;
                        var avgResult = 0;
                        var arrTest = [];
                        var teststdRefArr = [];
                        var teststdDateArr = [];
                        var teststdResultArr = [];
                        var stdtest = [];
    
                        for (var j = 0; j < deger[i].testStudents.length; j++) {
                            if (deger[i].testStudents[j].result != "") {
                                console.log(deger[i].testStudents[j].result)
                                teststdRefArr.push(deger[i]['testStudents'][j].tests_ref);
                                teststdDateArr.push(new Date(deger[i]['testStudents'][j].start));
                                teststdResultArr.push(parseFloat(deger[i]['testStudents'][j].result));
                            }
                        }
    
                        for (var i = 0; i < teststdRefArr.length; i++) {
                            stdtest[i] = {
                                test_ref: teststdRefArr[i],
                                date: teststdDateArr[i],
                                result: teststdResultArr[i]
                            }
                        }
                        //test id ye göre sonuçları grupla
                        var groups = {};
                        var dateGroups = {};
                        for (var i = 0; i < stdtest.length; i++) {
                            var groupName = stdtest[i].test_ref;
                            if (!groups[groupName] && !dateGroups[groupName]) {
                                groups[groupName] = [];
                                dateGroups[groupName] = [];
                            }
                            groups[groupName].push(stdtest[i].result);
                            dateGroups[groupName].push(stdtest[i].date);
                        }
                        stdtest = [];
                        for (var groupName in groups, dateGroups) {
                            stdtest.push({ test_ref: groupName, result: groups[groupName], date: dateGroups[groupName] });
                        }
                        var stdLenght = stdtest.length;
                        for (var i = 0; i < stdtest.length; i++) {
                            sumResult += performanceEvaluation(stdtest[i]);
                        }
                        avgResult = sumResult / stdtest.length;
                        avgResult = avgResult.toFixed(2);
                        avgResult = Number(avgResult);
                        document.getElementById("testPerformance").value = avgResult;*/

                }
            }

        }

    }

    $.ajax({
        url: "http://localhost:8080/tests/list",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            test = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {
            console.log("stdref" + stdref)
            //select option a test verilerini set et
            for (var i = 0; i < test.length; i++) {
                items[i] = {
                    "key": test[i].ref,
                    "value": test[i].test_name
                };
            }
            for (var i = 0; i < items.length; i++) {
                var opt = items[i].value;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                test_visible.appendChild(el);
            }

            $('#testShow').click(function () {
                var itemvalue;
                var program = document.getElementById("testName").value;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == program) {
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                    }
                }
                if (itemvalue == "MOXO Test") {
                    window.location.href = "moxo_test_profile.html?id=" + urlStudentRef + "&ref=" + itemkey;
                    test_visibility.style.visibility = 'hidden';
                } else if (itemvalue == "Profil Oluşturma Anketi") {
                    window.location.href = "profil_olusturma_anketi_profile.html?id=" + urlStudentRef + "&ref=" + itemkey;
                    test_visibility.style.visibility = 'hidden';
                } else {
                    window.location.href = "student_profile.html?id=" + urlStudentRef + "&ref=" + itemkey;
                }

            })
        })
    if (urlTestRef != null) {
        test_visibility.style.visibility = 'visible';
        $.ajax({
            url: "http://localhost:8080/teststudent/tests/" + urlTestRef + "/student/" + urlStudentRef + "/filter",
            method: "GET",
        })
            .done(function (data, textStatus, jqXHR) {
                teststd = data;
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error");
            })
            .then(function () {
                subTestList();
                subTestResult();
            })
    }
    function subTestList() {
        var test_table = $('#teststd_datatable').DataTable({
            data: teststd,
            "language": {
                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
            },

            columns: [
                { data: null },
                {
                    data: "start",
                    type: 'date',
                    render: function (data, type, row) {
                        return data ? moment(data).format('DD/MM/YYYY') : '';
                    },
                },
                { data: "status" },
                { data: 'subTests.0.subTestResults.0.result' },
               
            ],

            // "pageLength": 5,
            "bLengthChange": false,
            paging: false,
            searching: false,
            destroy: true,
        });
        //Index column
        test_table.on('order.dt search.dt', function () {
            test_table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                cell.innerHTML = i + 1;
            });
        }).draw();
        $('#teststd_datatable tbody').on('click', 'tr', function () {

            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
            }
            else {
                test_table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
            }
            ts_variable = test_table.row('.selected').data().subTests[0].subTestResults[0].ref;
            alert(ts_variable)
            /* if (table.row('.selected')) {
                 document.getElementById("testAddBtn").disabled = false;
 
             } */
        });

    }

    function subTestResult() {
        var sum = 0;
        var stdtestdate = [];
        var stdtestvalue = [];
        var stdtestresult = [];
        var stdtest = [];
        var testvalue = [];
        var testdate = [];
        var testresult = [];

        for (var i = 0; i < teststd.length; i++) {
            for (var j = 0; j < teststd[i].subTests.length; j++) {
                for (var k = 0; k < teststd[i].subTests[j].subTestResults.length; k++) {
                    if (teststd[i].subTests[j].subTestResults[k] != "") {
                        console.log("girdi")
                        stdtestvalue.push(teststd[i].ref)
                        stdtestdate.push(teststd[i].start);
                        stdtestresult.push(parseFloat(teststd[i].subTests[j].subTestResults[k].result));
                    }
                }
            }
        }

        for (var i = 0; i < stdtestvalue.length; i++) {
            stdtest[i] = {
                test_ref: stdtestvalue[i],
                date: stdtestdate[i],
                result: stdtestresult[i]
            }
        }
        console.log(stdtest)

        //sort date
        stdtest.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });

        for (var i = 0; i < stdtest.length; i++) {
            testdate.push(convertDate(stdtest[i].date));
            testresult.push(stdtest[i].result)
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
        var testsum = 0;
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        //random color
        var color = [];
        var performance = [];
        function randomColorFactor() {
            var r = function () { return Math.floor(Math.random() * 256) };
            return "rgb(" + r() + "," + r() + "," + r() + ")";
        }
        for (var i = 0; i < stdtest.length - 1; i++) {
            color.push(randomColorFactor());
            performance.push(testdate[i] + "-" + testdate[i + 1])
        }
        //pie chart
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
        //genel performans chart
        var element = document.getElementById("general_value_chart");
        var height = parseInt(KTUtil.css(element, 'height'));
        if (!element) {
            return;
        }
        var options = {
            series: [testsum*100] ,
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

        //line chart
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

});




/*

oTable = $('#teststd_datatable').dataTable();
            oTable.on('click', '#deleteBtn', function () {
                variable = test_table.row($(this).parents('tr,th')).data();
                console.log(variable)
            })
            $('#exampleModalSizeSm').on('click', '#deleteButton', function () {
                $.ajax({

                    url: "http://localhost:8080/teststudent/delete",
                    method: "DELETE",
                    data: variable,

                })
                    .done(function (data, textStatus, jqXHR) {

                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert("Başarısız.");
                    })
                    .then(function () {
                        location.reload();
                    })
            });

{
                        sortable: false,
                        width: 10,
                        overflow: 'visible',
                        autoHide: false,
                        "data": function (teststd) {
                            html = '\
                            <a href="test_profile.html?id={0}&ref={1}&ts={2}" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" title="Öğrenci Düzenle"> \
                                <span class="svg-icon svg-icon-md">\
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                            <rect x="0" y="0" width="24" height="24"/>\
                                            <path d="M12.2674799,18.2323597 L12.0084872,5.45852451 C12.0004303,5.06114792 12.1504154,4.6768183 12.4255037,4.38993949 L15.0030167,1.70195304 L17.5910752,4.40093695 C17.8599071,4.6812911 18.0095067,5.05499603 18.0083938,5.44341307 L17.9718262,18.2062508 C17.9694575,19.0329966 17.2985816,19.701953 16.4718324,19.701953 L13.7671717,19.701953 C12.9505952,19.701953 12.2840328,19.0487684 12.2674799,18.2323597 Z" fill="#000000" fill-rule="nonzero" transform="translate(14.701953, 10.701953) rotate(-135.000000) translate(-14.701953, -10.701953) "/>\
                                            <path d="M12.9,2 C13.4522847,2 13.9,2.44771525 13.9,3 C13.9,3.55228475 13.4522847,4 12.9,4 L6,4 C4.8954305,4 4,4.8954305 4,6 L4,18 C4,19.1045695 4.8954305,20 6,20 L18,20 C19.1045695,20 20,19.1045695 20,18 L20,13 C20,12.4477153 20.4477153,12 21,12 C21.5522847,12 22,12.4477153 22,13 L22,18 C22,20.209139 20.209139,22 18,22 L6,22 C3.790861,22 2,20.209139 2,18 L2,6 C2,3.790861 3.790861,2 6,2 L12.9,2 Z" fill="#000000" fill-rule="nonzero" opacity="0.3"/>\
                                        </g>\
                                    </svg>\
                                </span>\
                            </a> \
                            ';
                            html = html.replace("{0}", urlStudentRef)
                            html = html.replace("{1}", itemkey)
                            html = html.replace("{2}", teststd.ref)
                            return html;
                        }
                    },
                    {
                        sortable: false,
                        width: 10,
                        overflow: 'visible',
                        autoHide: false,
                        "data": function () {
                            return '\
                               <button id="deleteBtn" class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon" data-toggle="modal" data-target="#exampleModalSizeSm" title="Öğrenci Sil">\
                                   <span class="svg-icon svg-icon-md">\
                                       <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1">\
                                           <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                               <rect x="0" y="0" width="24" height="24"/>\
                                               <path d="M6,8 L6,20.5 C6,21.3284271 6.67157288,22 7.5,22 L16.5,22 C17.3284271,22 18,21.3284271 18,20.5 L18,8 L6,8 Z" fill="#000000" fill-rule="nonzero"/>\
                                               <path d="M14,4.5 L14,4 C14,3.44771525 13.5522847,3 13,3 L11,3 C10.4477153,3 10,3.44771525 10,4 L10,4.5 L5.5,4.5 C5.22385763,4.5 5,4.72385763 5,5 L5,5.5 C5,5.77614237 5.22385763,6 5.5,6 L18.5,6 C18.7761424,6 19,5.77614237 19,5.5 L19,5 C19,4.72385763 18.7761424,4.5 18.5,4.5 L14,4.5 Z" fill="#000000" opacity="0.3"/>\
                                           </g>\
                                       </svg>\
                                   </span>\
                               </button>\
                           ';
                        },
                    }









                        .then(function () {


                            var sum = 0;
                            var stdtestdate = [];
                            var stdtestvalue = [];
                            var stdtestresult = [];
                            var stdtest = [];
                            var testvalue = [];
                            var testdate = [];
                            var testresult = [];
                            for (var i = 0; i < teststd.length; i++) {
                                if (teststd[i].result != "") {
                                    console.log("girdi")
                                    stdtestvalue.push(teststd[i].ref)
                                    stdtestdate.push(teststd[i].start);
                                    stdtestresult.push(parseFloat(teststd[i].result));
                                }
                            }
                            for (var i = 0; i < stdtestvalue.length; i++) {
                                stdtest[i] = {
                                    test_ref: stdtestvalue[i],
                                    date: stdtestdate[i],
                                    result: stdtestresult[i]
                                }
                            }
                            console.log(stdtest)

                            //sort date
                            stdtest.sort(function (a, b) {
                                return new Date(a.date) - new Date(b.date);
                            });
                            for (var i = 0; i < stdtest.length; i++) {
                                testdate.push(convertDate(stdtest[i].date));
                                testresult.push(stdtest[i].result)
                            }
                            //format date
                            function convertDate(inputFormat) {
                                function pad(s) { return (s < 10) ? '0' + s : s; }
                                var d = new Date(inputFormat)
                                return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
                            }
                            //ay bazında performans
                            for (var i = 0; i < testresult.length - 1; i++) {
                                sum = testresult[i + 1] - testresult[i];
                                sum = sum.toFixed(3);
                                sum = Number(sum);
                                testvalue.push(sum);
                            }
                            //general performance
                            var testsum = 0;
                            for (var i = 0; i < testvalue.length; i++) {
                                testsum += testvalue[i];
                            }
                            testsum = testsum.toFixed(3);
                            testsum = Number(testsum);
                            //random color
                            var color = [];
                            var performance = [];
                            function randomColorFactor() {
                                var r = function () { return Math.floor(Math.random() * 256) };
                                return "rgb(" + r() + "," + r() + "," + r() + ")";
                            }
                            for (var i = 0; i < stdtest.length - 1; i++) {
                                color.push(randomColorFactor());
                                performance.push(testdate[i] + "-" + testdate[i + 1])
                            }
                            //pie chart
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

                            //genel performans chart
                            var element = document.getElementById("general_value_chart");
                            var height = parseInt(KTUtil.css(element, 'height'));
                            if (!element) {
                                return;
                            }
                            var options = {
                                series: [testsum * 100],
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

                            //line chart
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
                        })

                        */

/*
function performanceEvaluation(arrTest) {
        var stdTestDate = [];
        var stdTestResult = [];
        var testvalue = [];
        var stdTestArray = [];
        for (var i = 0; i < arrTest.date.length; i++) {
            stdTestArray[i] = {
                test_ref: arrTest.test_ref[i],
                date: arrTest.date[i],
                result: arrTest.result[i],
            }
        }
        //sort date
        stdTestArray.sort(function (a, b) {
            return a.date - b.date;
        });

        for (var k = 0; k < stdTestArray.length; k++) {
            stdTestDate.push(convertDate(stdTestArray[k].date));
            stdTestResult.push(stdTestArray[k].result)
        }
        //format date
        function convertDate(inputFormat) {
            function pad(s) { return (s < 10) ? '0' + s : s; }
            var d = new Date(inputFormat)
            return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
        }
        var sum = 0;
        for (var i = 0; i < stdTestResult.length - 1; i++) {
            sum = stdTestResult[i + 1] - stdTestResult[i];
            sum = sum.toFixed(3);
            sum = Number(sum);
            testvalue.push(sum);
        }
        //general performance
        var testsum = 0;
        for (var i = 0; i < testvalue.length; i++) {
            testsum += testvalue[i];
        }
        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        //    console.log("testsum" + testsum)
        return testsum;
    }
    */

/*
   //takvim için student'a göre verilerin listelenmesi
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
            if (urlStudentRef == stlist[i].ref) {
                console.log("in")
                for (var j = 0; j < stlist[i].testStudents.length; j++) {

                    itemsSt[j] = {
                        key: stlist[i]['testStudents'][j].ref,
                        testref: stlist[i]['testStudents'][j].tests_ref,
                        studentref: stlist[i]['testStudents'][j].students_ref,
                        start: stlist[i]['testStudents'][j].start,
                        end: stlist[i]['testStudents'][j].end,
                        title: stlist[i]['testStudents'][j].title,
                        result: parseFloat(stlist[i]['testStudents'][j].result),
                    };

                }

                var calendarEl = document.getElementById('calendar');
                var initialLocaleCode = 'tr';
                var d = new Date();
                var calendar = new FullCalendar.Calendar(calendarEl, {
                    headerToolbar: {
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                    },
                    initialDate: '2020-09-12',
                    locale: initialLocaleCode,
                    editable: true,
                    navLinks: true, // can click day/week names to navigate views
                    dayMaxEvents: true, // allow "more" link when too many events
                    events: itemsSt,
                    eventClick: function (info) {
                        info.jsEvent.preventDefault();
                        test_ref = info.event.extendedProps.testref;
                        student_ref = info.event.extendedProps.studentref;
                        teststd_ref = info.event.extendedProps.key;

                        window.location = "test_profile.html?id=" + student_ref + "&ref=" + test_ref + "&ts=" + teststd_ref;
                        info.el.style.borderColor = 'red';
                    },
                    eventDidMount: function (info) {
                        std_result = info.event.extendedProps.result;
                        std_start = info.event.start;
                        if (std_result == "" & d < std_start) {
                            info.el.style.backgroundColor = '#FFF4DE';
                            info.el.style.color = "black";
                        } else if (std_result == "" & d > std_start) {
                            info.el.style.backgroundColor = '#FFE2E5';
                            info.el.style.color = "black";
                        }
                        else {
                            info.el.style.backgroundColor = '#C9F7F5';
                            info.el.style.color = "black";
                        }
                        // {description: "Lecture", department: "BioChemistry"}
                    }
                });

                calendar.render();
            }
        }

    })
*/
