$(document).ready(function () { 
    sessionStorage.removeItem("adminname");   
    $("#kt_login_singin_form_submit_button").click(function () {
        var code = document.getElementById("usercode").value;
        var name = document.getElementById("username").value;
        var password = document.getElementById("userpassword").value;
        var deger;
        $.ajax({
            url: "http://localhost:8080/auth/list",
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
                
                for (var i = 0; i < deger.length; i++) {
                    var surveyKey;
                    if (code == deger[i].code && name == deger[i].name && password == deger[i].password) {
                        surveyKey = deger[i].ref;
                        window.location.href = "demo1/main.html?id=" + surveyKey;
                    } else {
                        console.log("no")
                    }
                }
            })
    })

});