
$(document).ready(function () {
    var deger, test, subtest, teststd, teststd_all;
    var itemvalue, itemkey, subtest_name;
    var urlStd, urlTest, urlTS, urlSub;
    var studentname, sub_test_name, testdate, test_date, test_name;
    var items = [];
    var result_item = [], result_item_name = [];
    var general_result_length;
    urlTS = getUrlParameter("ts")
    urlStd = getUrlParameter("id")
    urlTest = getUrlParameter("ref")
    urlSub = getUrlParameter("sub")

    var collapseOne1 = document.getElementById('collapseOne1');
    var collapseThree1 = document.getElementById('collapseThree1');

    // var test_visible = document.getElementById('testName');

    collapseThree1.style.visibility = 'hidden';

    //accordion için kontrol ayarlamaları
    if (getUrlParameter("id") != null && getUrlParameter("ref") != null && urlTS != null && urlSub != null) {
        console.log("in")
        collapseOne1.style.visibility = 'hidden';
        $('#collapseOne1').collapse();
        collapseThree1.style.visibility = 'visible';
    }
    //  $('#collapseThree1').collapse();
    //student bilgilerini listeleme
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

        } else if (getUrlParameter("id") == null) {
            /*    $('#testName')
                    .attr('disabled', true);*/
        }
    }


    //test verileri arasından test adına ulaşma
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
                    test_name = test[i].test_name;
                    document.getElementById('test_name').value = test[i].test_name;
                    document.getElementById('test_name1').value = test[i].test_name;
                }
            }
        })


    var dikkat
    //subtest içine veri kaydı

    //ilgili teststudent değerine göre verileri getirme

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
            var disable_button = [];
            //seçili olan değerin önceden kayıt edilip edilmediği kontrol edilir
            for (var i = 0; i < teststd.length; i++) {
                if (teststd[i].name == "Zamanlama") {
                    document.getElementById("zamanlama").disabled = true;
                    disable_button.push("1")
                }
                if (teststd[i].name == "Dikkat") {
                    document.getElementById("dikkat").disabled = true;
                    disable_button.push("1")
                }
                if (teststd[i].name == "Dürtüsellik") {
                    document.getElementById("durtusellik").disabled = true;
                    disable_button.push("1")
                }
                if (teststd[i].name == "Hiperaktivite") {
                    document.getElementById("hiperaktivite").disabled = true;
                    disable_button.push("1")
                }
            }

            if (disable_button.length == 4) {
                document.getElementById("subTestAddBtn").disabled = true;

            }
            if (disable_button.length == 3) {
                general_result_length = true;
            }

            //tablo içine subtest verilerini set etme
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
            //seçilen tablo verisinin ref ini seçme ve gönderme
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
                    location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + ts_variable;
                }
            });

        })
    $('#subTestAddBtn').click(function () {
        var controlname;
        //checkbox değerlerini kontrol etme
        var dikkat = document.getElementById("dikkat").checked;
        var zamanlama = document.getElementById("zamanlama").checked;
        var durtusellik = document.getElementById("durtusellik").checked;
        var hiperaktivite = document.getElementById("hiperaktivite").checked;


        if (dikkat == true || zamanlama == true || durtusellik == true || hiperaktivite == true) {
            if (dikkat == true) {
                controlname = "Dikkat";
            }
            else if (zamanlama == true) {
                controlname = "Zamanlama";
            }
            else if (durtusellik == true) {
                controlname = "Dürtüsellik";
            }
            else if (hiperaktivite == true) {
                controlname = "Hiperaktivite";
            }
            var obj = {
                name: controlname,
                test_student_ref: urlTS,
                tests_ref: urlTest,
                status: "Girilmedi",
            };
            //alt test kayıt işlemi
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
                    alert("lütfen bir değer seçiniz");

                    console.error(errorThrown);
                })

            var ts_status;
            if (general_result_length == true) {
                ts_status = "Girildi";
            } else {
                ts_status = "Girilmedi"
            }

            var objteststd = {
                test_date: test_date,
                test_id: urlTest,
                student_id: urlStd,
                end_date: test_date,
                title: test_name + "-" + studentname,
                status: ts_status,
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
            window.location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;
        }
        else if (dikkat == false && zamanlama == false && durtusellik == false && hiperaktivite == false) {
            alert("Lütfen bir değer seçiniz");
        }


    })
    if (urlSub != null) {
        $.ajax({//teststudent/{test_student_ref}/tests/{tests_ref}/sub/{ref}/ref
            url: "http://localhost:8080/subtest/teststudent/" + urlTS + "/tests/" + urlTest + "/sub/" + urlSub + "/ref",
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
                    if (urlSub == teststd[i].ref) {
                        document.getElementById('sub_test_name').value = teststd[i].name;
                        sub_test_name = teststd[i].name;
                    }

                }
            })
    }

    //alt test result post işlemi için arraye verilerin eklenmesi
    $('#testMoxoAddBtn').click(function () {
        var temel_1 = document.getElementById("temel_1").value;
        var gorsel_1 = document.getElementById("gorsel_1").value;
        var gorsel_2 = document.getElementById("gorsel_2").value;
        var isitsel_1 = document.getElementById("isitsel_1").value;
        var isitsel_2 = document.getElementById("isitsel_2").value;
        var birlesik_1 = document.getElementById("birlesik_1").value;
        var birlesik_2 = document.getElementById("birlesik_2").value;
        var temel_2 = document.getElementById("temel_2").value;
        if (temel_1 != "" && gorsel_1 != "" && gorsel_2 != "" && isitsel_1 != "" && isitsel_2 != "" && birlesik_1 != "" && birlesik_2 != "" && temel_2 != "") {
            result_item = [temel_1, gorsel_1, gorsel_2, isitsel_1, isitsel_2, birlesik_1, birlesik_2, temel_2];
        }
        result_item_name = ["Temel-1", "Görsel-1", "Görsel-2", "İşitsel-1", "İşitsel-2", "Birleşik-1", "Birleşik-2", "Temel-2"]

        if (result_item.length == 8) {


            for (var i = 0; i < result_item.length; i++) {

                var obj = {
                    name: result_item_name[i],
                    result: result_item[i],
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
            }
            alert(sub_test_name)
            var status = "Girildi";
            var objsub = {
                name: sub_test_name,
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

            window.location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;

        }
        else {
            alert("lütfen tüm değerleri giriniz")
        }


    })


})