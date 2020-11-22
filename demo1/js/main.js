$(document).ready(function () {
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
                        sessionStorage.setItem("ref", deger[i].ref);
                        sessionStorage.setItem("adminname", deger[i].name);
                        document.getElementById("adminname").value = sessionStorage.getItem("adminname");
                    } else {
                        alert("hata")
                        //  document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                    }

                }
            }
        }
    }
    
});