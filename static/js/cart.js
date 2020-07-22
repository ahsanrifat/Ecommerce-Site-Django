window.onload = setCartItem();
var update_store = document.getElementsByClassName("update-cart-store")
var update_cart = document.getElementsByClassName("update-cart")

for (var i = 0; i < update_store.length; i++) {
    update_store[i].addEventListener('click', function() {
        var product_id = this.dataset.product
        var action = this.dataset.action
        console.log(product_id, action)
        if (user == 'AnonymousUser') {
            addCookieItem(product_id, action);
        } else {
            update_user_order(product_id, action);
        }
    })
}

for (var i = 0; i < update_cart.length; i++) {
    update_cart[i].addEventListener('click', function() {
        var product_id = this.dataset.product
        var action = this.dataset.action
        console.log(product_id, action, user);
        if (user == 'AnonymousUser') {
            addCookieItem(product_id, action);
        } else {
            update_user_order2(product_id, action);
        }
    })
}

function update_user_order(product_id, action) {
    console.log("User is authenticated...sending data...")
    console.log("CSRF TOken: ", csrftoken);
    var url = "/update_item/"
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,

            },
            body: JSON.stringify({ 'product_id': product_id, "action": action })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Data:", data);
            document.getElementById('nav-cart').innerHTML = data;
            // location.reload()
        });

}


function update_user_order2(product_id, action) {
    console.log("User is authenticated...sending data...")
    console.log("CSRF TOken: ", csrftoken);
    var url = "/update_item/"
    fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,

            },
            body: JSON.stringify({ 'product_id': product_id, "action": action })
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log("Data:", data);
            // document.getElementById('nav-cart').innerHTML = data;
            location.reload()
        });

}






function getCookie(name) {
    var cookieArr = document.cookie.split(";");
    for (var i = 0; i < cookieArr.length; i++) {
        var cookiePair = cookieArr[i].split("=");
        if (name == cookiePair[0].trim()) {
            return decodeURIComponent(cookiePair[1]);
        }
    }
    return null;
}

var cart = JSON.parse(getCookie('cart'));
if (cart == undefined) {
    cart = {};
    console.log("Cart was created")
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/ "
}
console.log("cart:", cart);


function addCookieItem(product_id, action) {
    console.log("Using cookie as not logged in");
    if (action == 'add') {
        if (cart[product_id] == undefined) {
            cart[product_id] = { 'quantity': 1 };
        } else {
            cart[product_id]['quantity'] += 1;
        }
    }
    if (action == 'remove') {
        if (cart[product_id]['quantity'] > 0) {
            cart[product_id]['quantity'] -= 1;
        }
        if (cart[product_id]['quantity'] != 0) {
            delete cart[product_id];
        }
    }
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain;path=/ "
    var quan = 0;
    for (const id in cart) {
        quan += (cart[id]['quantity']);
    }
    document.getElementById('nav-cart').innerHTML = quan;
}

function setCartItem() {
    if (user != 'AnonymousUser') {
        var url = '/get_cart_item/'
        fetch('/get_cart_item/', {
                method: 'POST',
                headers: {
                    'X-CSRFToken': csrftoken,
                },

            })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log("Data:", data);
                document.getElementById('nav-cart').innerHTML = data;
            });
    } else {
        var cart = JSON.parse(getCookie('cart'));
        // console.log("Getting item number from cookie")
        var quan = 0;
        for (const id in cart) {
            quan += (cart[id]['quantity']);
        }
        // console.log(quan)
        document.getElementById('nav-cart').innerHTML = quan;
    }
}