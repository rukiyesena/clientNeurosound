var adminname, admincode;
var adminvalue;
$(document).ready(function () {
    var teststdArr;
    $.ajax({
        url: "http://localhost:8080/teststudent/list",
        method: "GET",
    })
        .done(function (data, textStatus, jqXHR) {
            teststdArr = data;
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            alert("Error");
        }).then(function () {
            var test_ref, student_ref, teststd_ref, std_start, std_result, todayCalendar;
            var itemsStd = [];
            for (var i = 0; i < teststdArr.length; i++) {
                itemsStd[i] = {
                    key: teststdArr[i].ref,
                    testref: teststdArr[i].tests_ref,
                    studentref: teststdArr[i].students_ref,
                    start: teststdArr[i].start,
                    end: teststdArr[i].end,
                    title: teststdArr[i].title,
                    result: teststdArr[i].result
                };
            }
            console.log("itemsStd " + itemsStd)
            var calendarEl = document.getElementById('calendar');
            var initialLocaleCode = 'tr';
            var d = new Date();
            //   console.log
            var calendar = new FullCalendar.Calendar(calendarEl, {

                headerToolbar: {
                    left: 'prev,next today',
                    center: 'title',
                    right: 'listDay,listWeek'
                },
                views: {
                    listDay: { buttonText: 'Günlük Liste' },
                    listWeek: { buttonText: 'Haftalık Liste' }
                },

                initialView: 'listWeek',
                initialDate: '2020-09-12',
                locale: initialLocaleCode,
                navLinks: true,
                editable: true,
                dayMaxEvents: true,
                events: itemsStd,
                eventClick: function (info) {
                    info.jsEvent.preventDefault();
                    console.log('Event: ' + info.event.extendedProps.testref);
                    test_ref = info.event.extendedProps.testref;
                    console.log('test_ref: ' + test_ref);
                    student_ref = info.event.extendedProps.studentref;
                    teststd_ref = info.event.extendedProps.key;

                    window.location = "test_profile.html?id=" + student_ref + "&ref=" + test_ref + "&ts=" + teststd_ref;
                    info.el.style.borderColor = 'red';
                },
                eventDidMount: function (info) {
                    console.log("result " + info.event.extendedProps.result);
                    std_result = info.event.extendedProps.result;
                    std_start = info.event.start;
                    console.log("n" + d);
                    console.log("std_start " + std_start);


                    if (std_result == "" & d < std_start) {
                        console.log("in")
                        info.el.style.backgroundColor = '#FFF4DE';
                    } else if (std_result == "" & d > std_start) {
                        info.el.style.backgroundColor = '#FFE2E5';
                    }
                    else {
                        info.el.style.backgroundColor = '#C9F7F5';
                    }
                    // {description: "Lecture", department: "BioChemistry"}
                }

            });

            calendar.render();


        })



    $.ajax({
        url: path.server + "/auth/list",
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
        if (getUrlParameter("id") != null) {
            for (var i = 0; i < deger.length; i++) {
                if (getUrlParameter("id") == deger[i].ref) {
                    if (typeof (Storage) !== "undefined") {
                        admincode = deger[i].ref;
                        adminname = deger[i].name;
                        sessionStorage.setItem("ref", admincode);
                        sessionStorage.setItem("adminname", adminname);
                        document.getElementById("adminname").value = sessionStorage.getItem("adminname");
                        let field = document.getElementById("adminname");
                        if (sessionStorage.getItem("autosave")) {
                            field.value = sessionStorage.getItem("autosave");
                        }
                        field.addEventListener("change", function () {
                            sessionStorage.setItem("autosave", field.value);
                        });
                    } else {
                        alert("hata")
                        //  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                    }

                }
            }
        }
    }

});