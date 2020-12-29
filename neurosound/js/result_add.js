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
                    testNameValue = test[i].test_name;
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
                console.log(subtest[i].ref)
                if (urlTest == subtest[i].tests_ref) {

                    items[i] = {
                        "key": subtest[i].ref,
                        "value": subtest[i].name
                    };
                }
                if (urlSub == subtest[i].ref) {
                    testNameValue = subtest[i].name;
                    document.getElementById('sub_test_name').value = subtest[i].name;
                }
            }
            //select içine alt test değerlerini set etmek
            for (var i = 0; i < items.length; i++) {
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
                        itemkey = items[i].key;
                        itemvalue = items[i].value;
                        // alert('You selected: ' + $(this).val() + itemkey);
                        window.location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + itemkey;
                    }
                }
            });
        })
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
                window.location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS + "&sub=" + urlSub;
            })
    })
    $('#btn_result').click(function () {
        result_item.push(document.getElementById("result").value)
        result_item_name.push(testNameValue);
    })
    $('#testResultAddBtn').click(function () {

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
        window.location.href = "result_add.html?id=" + urlStd + "&ref=" + urlTest + "&ts=" + urlTS;


    })


})