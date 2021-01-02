$(document).ready(function () {
    var deger, test, subtest, teststd, teststd_all;
    var urlStd, urlTest, urlTS, urlSub, urlSR;
    var studentname, testNameValue;
    var items = [];
    var result_item = [], result_item_name = [];

    urlTS = getUrlParameter("ts")
    urlStd = getUrlParameter("id")
    urlTest = getUrlParameter("ref")
    urlSub = getUrlParameter("sub")
    urlSR = getUrlParameter("sr")

    var test_visibility = document.getElementById('inputsDiv');

    test_visibility.style.visibility = 'hidden';

    $.ajax({
        url: "http://localhost:8080/student/list",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            deger = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {

            setStudent();
        });

    function setStudent() {
        if (getUrlParameter("id") != null) {
            for (var i = 0; i < deger.length; i++) {
                if (getUrlParameter("id") == deger[i].ref) {

                    studentname = deger[i].std_name;
                    var studentbirth = deger[i].birthday;
                    var studentprogram = deger[i].program;
                    var studentprototip = deger[i].profileType;
                    var studenttest = deger[i].testStudents.length;
                    for (var j = 0; j < studenttest; j++) {
                        if (urlTS == deger[i].testStudents[j].ref) {
                            test_date = deger[i].testStudents[j].start;

                        }
                    }
                    //test date elde etme ve yazdırma
                    testdate = convertDate(test_date)
                    document.getElementById("test_date").value = testdate;
                    function convertDate(inputFormat) {
                        function pad(s) { return (s < 10) ? '0' + s : s; }
                        var d = new Date(inputFormat)
                        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
                    }

                    document.getElementById("studentAd").value = studentname;
                    document.getElementById("studentBirth").value = studentbirth;
                    document.getElementById("studentProgram").value = studentprogram;
                    document.getElementById("studentPrototip").value = studentprototip;
                    document.getElementById("testCount").value = studenttest;

                }
            }
            if (getUrlParameter("id") != null && getUrlParameter("ref") != null && urlTS != null && urlSub != null) {

                test_visibility.style.visibility = 'visible';

            }
        } else if (getUrlParameter("id") == null) {
            $('#testName')
                .attr('disabled', true);
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
                if (urlTest == test[i].ref) {
                    testNameValue = test[i].test_name;
                    document.getElementById('test_name').value = test[i].test_name;
                    //   document.getElementById('sub_test_name').value = test[i].test_name;
                }
            }
        })

    $('#subTestAddBtn').click(function () {
        var obj = {

            name: testNameValue,
            test_student_ref: urlTS,
            tests_ref: urlTest,
            status: "Girilmedi",
        };
        $.ajax({////teststudent/{test_student_ref}/tests/{tests_ref}/add
            url: "http://localhost:8080/subtest/teststudent/" + urlTS + "/tests/" + urlTest + "/add",
            type: "POST",
            data: obj,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {
                console.log("ok")
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
            })
            .then(function () {
                window.location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;
            })
    })

    $.ajax({///teststudent/{test_student_ref}/tests/{tests_ref}
        url: "http://localhost:8080/subtest/teststudent/" + urlTS + "/tests/" + urlTest,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststd = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {

            if (teststd.length >= 1) {
                document.getElementById("subTestAddBtn").disabled = true;

            }
            /*     if (teststd.name =)
                     if (urlSR != null) {
                         document.getElementById("testResultAddBtn").disabled = true;
                     }
     */
        //    console.log("teststd_item" + teststd_item)
            var table = $('#test_datatable').DataTable({
                "data": teststd,
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                columns: [
                    { "data": null },
                    { "data": "name" },
                    { "data": "status" },

                ],
                layout: {
                    scroll: false, // enable/disable datatable scroll both horizontal and vertical when needed.
                    footer: false, // display/hide footer
                },
                "bLengthChange": false,
                paging: false,
                searching: false,
                destroy: true,
            });
            table.on('order.dt search.dt', function () {
                table.column(0, { search: 'applied', order: 'applied' }).nodes().each(function (cell, i) {
                    cell.innerHTML = i + 1;
                });
            }).draw();
            $('#test_datatable tbody').on('click', 'tr', function () {
                if ($(this).hasClass('selected')) {
                    $(this).removeClass('selected');
                }
                else {
                    table.$('tr.selected').removeClass('selected');
                    $(this).addClass('selected');
                }

                ts_variable = table.row('.selected').data().ref;
                if (table.row('.selected').data().status == "Girildi") {
                    alert("Girilen değer tekrar düzenlenemez. Öğrenci profiline gidiniz.")
                } else {
                    location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + ts_variable;
                }

            });


        })


    $('#testResultAddBtn').click(function () {

        var result = document.getElementById("result").value;
        if (result != "") {
            var obj = {
                name: testNameValue,
                result: result,
                sub_test_ref: urlSub
            };
            $.ajax({
                url: "http://localhost:8080/subtestresult/subtest/" + urlSub,
                type: "POST",
                data: obj,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    console.log("ok")
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })

            var status = "Girildi";

            var objsub = {
                name: testNameValue,
                test_student_ref: urlTS,
                tests_ref: urlTest,
                status: status,
            };
            $.ajax({///teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/put
                url: "http://localhost:8080/subtest/teststudent/" + urlTS + "/tests/" + urlTest + "/sub/" + urlSub + "/put",
                type: "PUT",
                data: objsub,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    console.log("put ok")
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(objsub + "Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })
            var objteststd = {
                test_date: test_date,
                test_id: urlTest,
                student_id: urlStd,
                end_date: test_date,
                title: test_name + "-" + studentname,
                status: status,
            };
            $.ajax({
                url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/ts/" + urlTS + "/put",

                type: "PUT",
                data: objteststd,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    console.log("put ok")
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(objteststd + "Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })
            window.location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;

        }
        else {
            alert("lütfen tüm değerleri giriniz")
        }

    })


})