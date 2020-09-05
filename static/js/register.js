var formField = document.getElementById("register-form");

var flag1 = false;
var flag2 = false;

var password = document.getElementById("password");
password.addEventListener("click", function(event) {
    document.getElementById("error-msz-pass").classList.remove("hidden");
    document.getElementById("error-msz-pass").innerHTML =
        "Password must be at leat 6 characters long containing numbers and alphabets";
});

password.addEventListener("input", function(event) {
    flag1 = false;
    pass = password.value;
    if (pass.length >= 6 && pass.match(/\d+/) && pass.match(/[a-zA-Z]/)) {
        document.getElementById("error-msz-pass").classList.add("hidden");
        document.getElementById("pass-icon").classList.remove("hidden");
        flag1 = true;
    } else {
        document.getElementById("pass-icon").classList.add("hidden");
        document.getElementById("error-msz-pass").classList.remove("hidden");
        document.getElementById("error-msz-pass").innerHTML =
            "(Still not satisfied) Password must be at leat 6 characters long containing numbers and alphabets";
    }
});

var confirm_password = document.getElementById("confirm-password");
confirm_password.addEventListener("input", function(e) {
    flag2 = false;
    var password = document.getElementById("password").value;
    var confPass = confirm_password.value;
    if (password == confPass && password.length > 0) {
        document.getElementById("error-msz-confPass").classList.add("hidden");
        document.getElementById("err-confPass-icon").classList.add("hidden");
        document.getElementById("matched-pass-icon").classList.remove("hidden");
        flag2 = true;
    } else {
        document.getElementById("matched-pass-icon").classList.add("hidden");
        document.getElementById("error-msz-confPass").classList.remove("hidden");
        document.getElementById("err-confPass-icon").classList.remove("hidden");
        document.getElementById("error-msz-confPass").innerHTML =
            "Password did not match";
    }
});

function register_validation(e) {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var address = document.getElementById("address").value;
    var password = document.getElementById("password").value;
    if (flag1 && flag2) {
        var url = "/register_user_db/"
        fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': csrftoken,

                },
                body: JSON.stringify({
                    'name': name,
                    'email': email,
                    'phone': phone,
                    'address': address,
                    'password': password

                })
            })
            .then((response) => {
                // return response.json();
                console.log('response:', response)
            })
            .then((data) => {
                console.log("Data:", data);
                // document.getElementById('nav-cart').innerHTML = data;
                // location.reload()
            });

        e.preventDefault();
        return false;
    } else {
        alert("Not Okey");
        e.preventDefault();
        return false;
    }
}