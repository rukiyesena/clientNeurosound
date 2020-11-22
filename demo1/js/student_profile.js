document.getElementById("adminname").value = sessionStorage.getItem("adminname");
$(document).ready(function () {
    var deger, teststd;
    var items = [];
    var teststudent = []
    var test_visible = document.getElementById('testName');
    var test_visibility = document.getElementById('divVisible');
    test_visibility.style.visibility = 'hidden';
    var urlStudentId = getUrlParameter("id");
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
        if (urlStudentId != null) {
            for (var i = 0; i < deger.length; i++) {
                if (urlStudentId == deger[i].ref) {
                    document.getElementById("studentAd").value = deger[i].std_name;
                    document.getElementById("studentBirth").value = deger[i].birthday;
                    document.getElementById("studentProgram").value = deger[i].program;
                    document.getElementById("studentPrototip").value = deger[i].profileType;
                    document.getElementById("stdName").value = deger[i].std_name;
                    document.getElementById("stdSurname").value = deger[i].std_surname;
                    document.getElementById("stdPhone").value = deger[i].phone1;
                    document.getElementById("stdMail").value = deger[i].mail;
                    document.getElementById("testCount").value = deger[i].testStudents.length;
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
                test_visibility.style.visibility = 'visible';
                urlRef = getUrlParameter("id")
                var program = document.getElementById("testName").value;
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == program) {
                        itemkey = items[i].key;
                    }
                }
                //window.location.href = "student_profile.html?id=" + urlRef + "&ref=" + itemkey;
                $.ajax({
                    url: "http://localhost:8080/teststudent/tests/" + itemkey + "/student/" + urlRef + "/filter",
                    method: "GET",
                })
                    .done(function (data, textStatus, jqXHR) {
                        teststd = data;
                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert("Error");
                    })
                    .then(function () {

                        var test_table = $('#teststd_datatable').DataTable({
                            "data": teststd,
                            "language": {
                                "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                            },
                            
                            columns: [
                                { "data": null },
                                { "data": "test_date" },
                                { "data": "result" },
                                {
                                    sortable: false,
                                    width: 10,
                                    overflow: 'visible',
                                    autoHide: false,
                                    "data": function (teststd) {
                                        html = '\
                                        <a href="hizli_okuma.html?id={0}&ref={1}"  class="btn btn-sm btn-default btn-text-primary btn-hover-primary btn-icon mr-2" title="Öğrenci Profili">\
                                         <span class="svg-icon svg-icon-md">\
                                             <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" class="svg-icon">\
                                                 <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">\
                                                     <rect x="0" y="0" width="24" height="24"/>\
                                                     <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" fill="#000000"/>\
                                                     <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" fill="#000000" opacity="0.3"/>\
                                                 </g>\
                                             </svg>\
                                         </span>\
                                        </a> \
                                        ';
                                        html = html.replace("{0}", urlStudentId)
                                        html = html.replace("{1}", teststd.ref)

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

                            ],
                            
                            "pageLength": 5,
                            "bLengthChange": false,
                            
                        });
                        //Index column
                        test_table.on( 'order.dt search.dt', function () {
                            test_table.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
                                cell.innerHTML = i+1;
                            } );
                        } ).draw();

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
                        if (teststd.result != "") {
                            console.log("in")
                        }
                        var sum = 0;
                        var testvalue = [];
                        var testdate = [];
                        var testresult = [];
                        for (var i = 0; i < teststd.length; i++) {
                            if (teststd[i].result != "") {
                                teststudent[i] = {
                                    test_ref: teststd[i].ref,
                                    date: convertDate(teststd[i].test_date),
                                    result: parseFloat(teststd[i].result),
                                };
                            }
                        }
                        //sort date
                        teststudent.sort(function compare(a, b) {
                            var dateA = new Date(a.date);
                            var dateB = new Date(b.date);
                            return dateA - dateB;
                        });
                        for (var i = 0; i < teststudent.length; i++) {
                            testdate.push(teststudent[i].date);
                            testresult.push(teststudent[i].result)
                        }
                        //format date
                        function convertDate(inputFormat) {
                            function pad(s) { return (s < 10) ? '0' + s : s; }
                            var d = new Date(inputFormat)
                            return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join('/')
                        }
                        //ay bazında performans
                        for (var i = 0; i < teststudent.length - 1; i++) {
                            sum = teststudent[i + 1].result - teststudent[i].result;
                            sum = sum.toFixed(3);
                            sum = Number(sum);
                            testvalue.push(sum);
                        }
                        console.log(testvalue)
                        //general performance 
                        var testsum = 0;
                        var testsum_rest;
                        var general_data = [];
                        for (var i = 0; i < testvalue.length; i++) {
                            testsum += testvalue[i];
                        }
                        general_data.push(testsum * 100)
                        console.log(testsum)

                        //random color
                        var color = [];
                        var performance = [];
                        function randomColorFactor() {
                            var o = Math.round, r = Math.random, s = 255;
                            return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')';
                        }
                        for (var i = 0; i < teststudent.length - 1; i++) {
                            color.push(randomColorFactor());
                            performance.push(teststudent[i].date + "-" + teststudent[i + 1].date)
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
                                    text: 'Chart.js Polar Area Chart'
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
                        console.log(testdate)
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
            })


        })


});
