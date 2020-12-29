$(document).ready(function () {


    var deger, test, teststd, teststd_all;
    var urlStd, urlTest, urlTS;
    var studentname, testNameValue;
    var start, end, title;
    var testsum = 0;

    var moxoResultItem = [];

    urlTS = getUrlParameter("ts")
    urlStd = getUrlParameter("id")
    urlTest = getUrlParameter("ref")
    //  urlResult = getUrlParameter("rs")


    var test_visibility = document.getElementById('test_content_visible');


    if (urlTS == null) {
        test_visibility.style.visibility = 'hidden';
    }


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


                    document.getElementById("studentAd").value = studentname;
                    document.getElementById("studentBirth").value = studentbirth;
                    document.getElementById("studentProgram").value = studentprogram;
                    document.getElementById("studentPrototip").value = studentprototip;
                    document.getElementById("testCount").value = studenttest;

                }
            }
            if (getUrlParameter("id") != null && getUrlParameter("ref") != null) {
                //  test_visibility.style.visibility = 'visible';
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
                    testNameValue = test[i].test_name
                }
            }
        })



    //var testdate = top.consoleRef.document.getElementById('kt_datepicker').innerHTML;
    $.ajax({
        url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/listByResult",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststd = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {

            for (var i = 0; i < teststd.length; i++) {
                start = teststd[i].start;
                end = teststd[i].end;
                title = teststd[i].title;
            }

            var table = $('#moxo_datatable').DataTable({

                "data": teststd,
                "language": {
                    "url": "http://cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Turkish.json"
                },
                columns: [
                    { "data": null },
                    { "data": "title" },
                    {
                        "data": "start",
                        type: 'date',
                        render: function (data, type, row) {
                            return data ? moment(data).format('DD/MM/YYYY') : '';

                        },
                    },
                    { "data": 'result' },

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
            $('#moxo_datatable tbody').on('click', 'tr', function () {
                $(this).toggleClass('selected');
                console.log("in")
                for (var i = 0; i < table.rows('.selected').data().length; i++) {
                    var variable = table.rows('.selected').data()[i].ref;
                    location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + variable;
                }
            });
            $('#exampleModalSizeSm').on('click', '#deleteButton', function () {
                $.ajax({

                    url: "http://localhost:8080/result/delete",
                    method: "DELETE",
                    data: variable,

                })
                    .done(function (data, textStatus, jqXHR) {

                    })
                    .fail(function (jqXHR, textStatus, errorThrown) {
                        alert("Başarısız.");
                    })
                    .then(function () {
                        location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + variable;

                    })
            });
        })

    $("#testmAddBtn").click(function () {
        var testdate = document.getElementById("kt_datepicker").value;
        var testresult = "";
        var test_obj = {
            test_date: testdate,
            result: testresult,
            test_id: urlTest,
            student_id: urlStd,
            end_date: testdate,
            title: studentname + "-" + testNameValue,
        };
        $.ajax({
            url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/add",
            type: "POST",
            data: test_obj,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {
                window.location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest;

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(test_obj + "Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
                window.location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest;
            })
            .then(function () {
                window.location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest;

            })


    })
    $("#testMoxoAddBtn").click(function () {
        var result_1 = document.getElementById("rsp").value;
        var result_2 = document.getElementById("ra").value;
        var result_3 = document.getElementById("raf").value;
        var result_4 = document.getElementById("rpf").value;
        var result_5 = document.getElementById("rp").value;
        var result_6 = document.getElementById("rbp").value;
        var result_7 = document.getElementById("ebp").value;
        var result_8 = document.getElementById("ep").value;
        var result_9 = document.getElementById("epf").value;
        var result_10 = document.getElementById("eaf").value;
        var result_11 = document.getElementById("ea").value;
        var result_12 = document.getElementById("esp").value;


        var resultsum = (parseFloat(result_1) + parseFloat(result_2) + parseFloat(result_3) + parseFloat(result_4) + parseFloat(result_5) + parseFloat(result_6) + parseFloat(result_7) + parseFloat(result_8) + parseFloat(result_9) + parseFloat(result_10) + parseFloat(result_11) + parseFloat(result_12));

        var testsum = resultsum / 4;

        testsum = testsum.toFixed(3);
        testsum = Number(testsum);
        //   alert("ooolll")
        //    window.location.href = "moxo_test.html?id=" + urlStd + "&ref=" + urlTest;
console.log(testsum)
         var objPut = {
            test_date: start,
            result: testsum,
            end_date: end,
            title: title,
            tests_ref: urlTest,
            students_ref: urlStd,
        };
       $.ajax({
            url: "http://localhost:8080/teststudent/tests/" + urlTest + "/student/" + urlStd + "/ts/" + urlTS + "/put",

            type: "PUT",
            data: objPut,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {

                //  window.location.href = "moxo_test.html?id=" + urlStd + "&ref=" + urlTest;
                alert("oldu");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert(objPut + "Error" + errorThrown, jqXHR, textStatus);
                console.error(objPut + "Error" + errorThrown, jqXHR, textStatus);
            })



        var result_obj = {
            result_1: result_1,
            result_2: result_2,
            result_3: result_3,
            result_4: result_4,
            result_5: result_5,
            result_6: result_6,
            result_7: result_7,
            result_8: result_8,
            result_9: result_9,
            result_10: result_10,
            result_11: result_11,
            result_12: result_12,

            test_student_id: urlTS,
        }
        $.ajax({
            url: "http://localhost:8080/result/teststudent/" + urlTS + "/add",
            type: "POST",
            data: result_obj,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {
                // alert("oldu");
                //alert("in")
                //   window.location.href = "moxo_test.html?id=" + urlStd + "&ref=" + urlTest;
                window.location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest;

            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                console.error(errorThrown);
                console.error(jqXHR);
                console.error(textStatus);

                alert(result_obj + "Error" + errorThrown, jqXHR, textStatus);
            })
            .then(function () {
                window.location.href = "profil_olusturma_anketi.html?id=" + urlStd + "&ref=" + urlTest;

            })

    })
})