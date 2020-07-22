var formField = document.getElementById("register-form");



var password = document.getElementById("password");
password.addEventListener("click", function(event) {
    document.getElementById("error-msz-pass").classList.remove("hidden");
    document.getElementById("error-msz-pass").innerHTML = "Password must be at leat 6 characters long containing numbers and alphabets"
})

password.addEventListener("input", function(event) {
    pass = password.value;
    if (pass.length >= 6 && pass.match(/\d+/) && pass.match(/[a-zA-Z]/)) {
        document.getElementById("error-msz-pass").classList.add("hidden");
        document.getElementById('pass-icon').classList.remove("hidden");
    } else {
        document.getElementById('pass-icon').classList.add("hidden");
        document.getElementById("error-msz-pass").classList.remove("hidden");
        document.getElementById("error-msz-pass").innerHTML = "Password must be at leat 6 characters long containing numbers and alphabets"
    }
})

var confirm_password = document.getElementById("confirm-password");
confirm_password.addEventListener("input", function(e) {


    var password = document.getElementById("password").value;
    var confPass = confirm_password.value;
    if (password == confPass && password.length > 0) {
        document.getElementById("error-msz-confPass").classList.add("hidden");
        document.getElementById('err-confPass-icon').classList.add("hidden");
        document.getElementById('matched-pass-icon').classList.remove("hidden");

    } else {

        document.getElementById('matched-pass-icon').classList.add("hidden");
        document.getElementById("error-msz-confPass").classList.remove("hidden");
        document.getElementById('err-confPass-icon').classList.remove("hidden");
        document.getElementById("error-msz-confPass").innerHTML = "Password did not match"
    }
})

function register_validation() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    var confirm_password = document.getElementById("confirm-password").value;
    if (password.length >= 6 && password.match(/\d+/) && password.match(/[a-zA-Z]/) && password == confirm_password) {
        document.getElementById('err-pass-icon').classList.remove("hidden");
        document.getElementById("error-msz-pass").classList.remove("hidden");
        document.getElementById("error-msz-pass").innerHTML = 'Password must be 8 characters long'

    } else {
        return false;
    }



}