var fname, lname, address1, address2, state, country, mail, number, password;
$(document).ready(function () {

    $("#kt_login_signup_form_submit_button").click(function () {
        var fname = document.getElementById("fname").value;
        var lname = document.getElementById("lname").value;
        var address1 = document.getElementById("address1").value;
        var address2 = document.getElementById("address2").value;
        var state = document.getElementById("state").value;
        var country = document.getElementById("country").value;
        var mail = document.getElementById("mail").value;
        var number = document.getElementById("number").value;
        var password = document.getElementById("password").value;
        console.log(fname)
        var obj = {
            fname: fname,
            lname: lname,
            address1: address1,
            address2: address2,
            state: state,
            country: country,
            mail: mail,
            number: number,
            password: password,
        };
        $.ajax({
            url: path.server + "/auth/register",
            type: "POST",
            data: obj,
            xhrFields: {
                withCredentials: true
            }
        })
            .done(function (data, textStatus, jqXHR) {
                alert("success");
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
                alert("Error" + errorThrown, jqXHR, textStatus);
                console.error(errorThrown);
            })


    })



});