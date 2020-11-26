document.getElementById("adminname").value = sessionStorage.getItem("adminname");
let field = document.getElementById("adminname");
if (sessionStorage.getItem("autosave")) {
    field.value = sessionStorage.getItem("autosave");
}
field.addEventListener("change", function () {
    sessionStorage.setItem("autosave", field.value);
});