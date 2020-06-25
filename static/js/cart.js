window.onload = setCartItem();
var update_store = document.getElementsByClassName("update-cart-store")
var update_cart = document.getElementsByClassName("update-cart")

for (var i = 0; i < update_store.length; i++) {
    update_store[i].addEventListener('click', function() {
        var product_id = this.dataset.product
        var action = this.dataset.action
        console.log(product_id, action)
        if (user == 'AnonymousUser') {
            console.log("Not Logged In")
        } else {
            update_user_order(product_id, action);
        }
    })
}

for (var i = 0; i < update_cart.length; i++) {
    update_cart[i].addEventListener('click', function() {
        var product_id = this.dataset.product
        var action = this.dataset.action
        console.log(product_id, action)
        if (user == 'AnonymousUser') {
            console.log("Not Logged In")
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

function setCartItem() {
    console.log("Finding Cart Items")
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
}