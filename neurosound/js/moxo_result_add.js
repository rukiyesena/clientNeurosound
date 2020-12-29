$(document).ready(function () {
    var deger, test, subtest, teststd, teststd_all;
    var urlStd, urlTest, urlTS, urlSub;
    var studentname, testNameValue;
    var items = [];
    var result_item = [], result_item_name = [];

    urlTS = getUrlParameter("ts")
    urlStd = getUrlParameter("id")
    urlTest = getUrlParameter("ref")
    urlSub = getUrlParameter("sub")

    var test_visibility = document.getElementById('inputsDiv');
    var test_visible = document.getElementById('testName');

    test_visible.onchange = function () {
        test_visibility.style.visibility = 'hidden';
    }
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


                    document.getElementById("studentAd").value = studentname;
                    document.getElementById("studentBirth").value = studentbirth;
                    document.getElementById("studentProgram").value = studentprogram;
                    document.getElementById("studentPrototip").value = studentprototip;
                    document.getElementById("testCount").value = studenttest;

                }
            }
            if (getUrlParameter("id") != null && getUrlParameter("ref") != null && urlTS != null && urlSub != null) {
                $('#subTestAddBtn').click(function () {
                    test_visibility.style.visibility = 'visible';
                })
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

                    document.getElementById('test_name').value = test[i].test_name;
                }
            }
        })
    $.ajax({
        url: "http://localhost:8080/subtest/listByTestRef/" + urlTest,
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            subtest = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        })
        .then(function () {
            for (var i = 0; i < subtest.length; i++) {
                console.log(subtest[i].name)


                items[i] = {
                    "value": subtest[i].name
                };

                if (urlSub == subtest[i].ref) {

                }
            }
            //select içine alt test değerlerini set etmek
            for (var i = 0; i < items.length; i++) {
                console.log(items[i].value)
                var opt = items[i].value;
                var el = document.createElement("option");
                el.textContent = opt;
                el.value = opt;
                test_visible.appendChild(el);


            }
            //select te seçilen alt test değerine göre sayfayı yeniler
            $('#testName').change(function () {
                for (var i = 0; i < items.length; i++) {
                    if (items[i].value == $(this).val()) {
                        itemvalue = items[i].value;
                        testNameValue = subtest[i].name;
                        document.getElementById('sub_test_name').value = subtest[i].name;
                        // alert('You selected: ' + $(this).val() + itemkey);
                        //  window.location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + itemkey;
                    }
                }
            });
        })
    /*   if (getUrlParameter("id") != null && getUrlParameter("ref") != null) {
           urlTest = getUrlParameter("ref");
           urlStd = getUrlParameter("id");
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
   
                   var table = $('#test_datatable').DataTable({
   
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
                           { "data": 'notes' },
   
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
                       $(this).toggleClass('selected');
                       console.log("in")
                       for (var i = 0; i < table.rows('.selected').data().length; i++) {
                           ts_variable = table.rows('.selected').data()[i].ref;
                           //  location.href = "moxo_test.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + ts_variable;
                       }
                   });
                   $('#exampleModalSizeSm').on('click', '#deleteButton', function () {
                       $.ajax({
   
                           url: "http://localhost:8080/result/delete",
                           method: "DELETE",
                           data: ts_variable,
   
                       })
                           .done(function (data, textStatus, jqXHR) {
   
                           })
                           .fail(function (jqXHR, textStatus, errorThrown) {
                               alert("Başarısız.");
                           })
                           .then(function () {
                               location.href = "test_profile.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + ts_variable;
   
                           })
                   });
               })
       }*/
    $('#subTestAddBtn').click(function () {
        var obj = {
            name: testNameValue,
            students_ref: urlStd,
            test_student_ref: urlTS,
            tests_ref: urlTest,
        };
        $.ajax({///student/{students_ref}/teststudent/{test_student_ref}/subtest/{sub_test}
            url: "http://localhost:8080/subtest/test/" + urlTest + "/student/" + urlStd + "/teststudent/" + urlTS + "/add",
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
                window.location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + urlSub;
            })
    })
    //post işlemi için arraye verilerin eklenmesi
    document.getElementById("btn_temel_1").disabled = false;
    document.getElementById("btn_gorsel_1").disabled = true;
    document.getElementById("btn_gorsel_2").disabled = true;
    document.getElementById("btn_isitsel_1").disabled = true;
    document.getElementById("btn_isitsel_2").disabled = true;
    document.getElementById("btn_birlesik_1").disabled = true;
    document.getElementById("btn_birlesik_2").disabled = true;
    document.getElementById("btn_temel_2").disabled = true;
    $('#btn_temel_1').click(function () {
        result_item.push(document.getElementById("temel_1").value)
        result_item_name.push("Temel-1");

        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = false;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_gorsel_1').click(function () {
        result_item.push(document.getElementById("gorsel_1").value)
        result_item_name.push("Görsel-1");

        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = false;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_gorsel_2').click(function () {
        result_item.push(document.getElementById("gorsel_2").value)
        result_item_name.push("Görsel-2");

        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = false;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_isitsel_1').click(function () {
        result_item.push(document.getElementById("isitsel_1").value)
        result_item_name.push("İşitsel-1");
        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = false;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_isitsel_2').click(function () {
        result_item.push(document.getElementById("isitsel_2").value)
        result_item_name.push("İşitsel-2");
        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = false;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_birlesik_1').click(function () {
        result_item.push(document.getElementById("birlesik_1").value)
        result_item_name.push("Birleşik-1");
        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = false;
        document.getElementById("btn_temel_2").disabled = true;
    })
    $('#btn_birlesik_2').click(function () {
        result_item.push(document.getElementById("birlesik_2").value)
        result_item_name.push("Birleşik-2");
        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = false;
    })
    $('#btn_temel_2').click(function () {
        result_item.push(document.getElementById("temel_2").value)
        result_item_name.push("Temel-1");
        document.getElementById("btn_temel_1").disabled = true;
        document.getElementById("btn_gorsel_1").disabled = true;
        document.getElementById("btn_gorsel_2").disabled = true;
        document.getElementById("btn_isitsel_1").disabled = true;
        document.getElementById("btn_isitsel_2").disabled = true;
        document.getElementById("btn_birlesik_1").disabled = true;
        document.getElementById("btn_birlesik_2").disabled = true;
        document.getElementById("btn_temel_2").disabled = true;
        alert(result_item)
    })
    //post sub_test_result
    $('#testMoxoAddBtn').click(function () {
        console.log(result_item)
        console.log(result_item_name)
        for (var i = 0; i < result_item.length; i++) {
            var result = result_item[i];
            var name = result_item_name[i];
            var obj = {
                name: name,
                result: result,
                sub_test_ref: urlSub
            };
            $.ajax({///student/{students_ref}/teststudent/{test_student_ref}/subtest/{sub_test}
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
        window.location.href = "moxo_result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;


    })


})