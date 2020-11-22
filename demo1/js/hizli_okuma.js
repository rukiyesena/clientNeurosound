document.getElementById("adminname").value = sessionStorage.getItem("adminname");
$(document).ready(function () {
    var urlName, urlId;
    var setDate, setResult;
    var deger;
    urlId = getUrlParameter("id")
    urlName = getUrlParameter("ref")
    $.ajax({
        url: path.server + "/student/" + urlName + "/hizli_okuma",
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
            
            
         /*   urlId = getUrlParameter("id")
            urlName = getUrlParameter("ref")
            for (var i = 0; i < deger.length; i++) {
                if (urlName == deger[i].ref) {
                    alert("in")
                    setDate = deger[i].test_date
                    setResult = deger[i].result
                    
                    document.getElementById("testDate").value = setname;
                    document.getElementById("testResult").value = setsurname;
                   

                }
            }*/

        });
    $("#testAddBtn").click(function () {
        urlId = getUrlParameter("id")
        urlName = getUrlParameter("ref")
        var testdate = document.getElementById("testDate").value;
        var testresult = document.getElementById("testResult").value;
        var obj = {
            test_date: testdate,
            result: testresult,
            test_id: urlId,
            student_id: urlName,

        };
        urlId = getUrlParameter("id")
        if (urlId == null) {
            $.ajax({
                url: "http://localhost:8080/tests/" + urlId + "/student/" + urlName + "/add",
                type: "POST",
                data: obj,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    alert(obj + "success");

                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    alert(obj + "Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })
        } else {

        }


    })
});

