$(document).ready(function () {
    var deger;
    var setregister, setname, setsurname, setbirthday, setbirthplace, setadress1, setsaint, setphone1, setphone2, setmail, setschool, setgrade, setstatus, setnote, setprogram, setprofileType;
    var urlId;

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
            urlId = getUrlParameter("id")
            for (var i = 0; i < deger.length; i++) {
                if (urlId == deger[i].ref) {
                    setname = deger[i].std_name
                    setsurname = deger[i].std_surname
                    setbirthday = deger[i].birthday
                    setbirthplace = deger[i].birthplace
                    console.log(setbirthplace)
                    setadress1 = deger[i].adress1
                    setsaint = deger[i].saint
                    setphone1 = deger[i].phone1
                    setphone2 = deger[i].phone2
                    setmail = deger[i].mail
                    setschool = deger[i].school
                    setgrade = deger[i].grade
                    setstatus = deger[i].status
                    setnote = deger[i].note
                    setprogram = deger[i].program
                    setprofileType = deger[i].profileType
                    setregister = deger[i].register_date
                    document.getElementById("stdname").value = setname;
                    document.getElementById("surname").value = setsurname;
                    document.getElementById("birthDate").value = setbirthday;
                    document.getElementById("birthplace").value = setbirthplace;
                    document.getElementById("adress1").value = setadress1;
                    document.getElementById("saint").value = setsaint;
                    document.getElementById("phone1").value = setphone1;
                    document.getElementById("phone2").value = setphone2;
                    document.getElementById("mail").value = setmail;
                    document.getElementById("school").value = setschool;
                    document.getElementById("grade").value = setgrade;
                    document.getElementById("status").value = setstatus;
                    document.getElementById("note").value = setnote;
                    document.getElementById("program").value = setprogram;
                    document.getElementById("profileType").value = setprofileType;
                    document.getElementById("register").value = setregister;

                }
            }

        });

    $("#save").click(function () {

        var studentname = document.getElementById("stdname").value;
        var surname = document.getElementById("surname").value;
        var birthday = document.getElementById("birthDate").value;
        var birthplace = document.getElementById("birthplace").value;

        var adress1 = document.getElementById("adress1").value;
        var saint = document.getElementById("saint").value;
        var phone1 = document.getElementById("phone1").value;
        var phone2 = document.getElementById("phone2").value;
        var mail = document.getElementById("mail").value;
        var school = document.getElementById("school").value;
        var grade = document.getElementById("grade").value;
        var status = document.getElementById("status").value;
        var register = document.getElementById("register").value;


        var note = document.getElementById("note").value;
        var program = document.getElementById("program").value;
        var profileType = document.getElementById("profileType").value;
        var obj = {
            std_name: studentname,
            std_surname: surname,
            birthday: birthday,
            birthplace: birthplace,
            adress1: adress1,
            saint: saint,
            phone1: phone1,
            phone2: phone2,
            mail: mail,
            school: school,
            grade: grade,
            status: status,
            note: note,
            program: program,
            profileType: profileType,
            register_date: register,
        };
        urlId = getUrlParameter("id")
        if (urlId == null) {
            $.ajax({
                url: "http://localhost:8080/student/add/",
                type: "POST",
                data: obj,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    location.href = "student_list.html";
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    //alert("Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })
        } else {
            $.ajax({
                url: "http://localhost:8080/student/update/" + urlId,
                type: "PUT",
                data: obj,
                xhrFields: {
                    withCredentials: true
                }
            })
                .done(function (data, textStatus, jqXHR) {
                    location.href = "student_list.html";
                })
                .fail(function (jqXHR, textStatus, errorThrown) {
                    //alert("Error" + errorThrown, jqXHR, textStatus);
                    console.error(errorThrown);
                })
        }

    })
});

