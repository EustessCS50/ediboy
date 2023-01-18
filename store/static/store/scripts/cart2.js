var user = '{{ request.user }}'

console.log(user)


function getToken(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== ''){
        var cookies = document.cookie.split(';');
        for (var i=0; i<cookies.length; i++){
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want ?
            if (cookie.substring(0, name.length + 1) === (name + '=')){
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getToken('csrftoken');

function getCookie(name){
    // split cookie strings and get individual name=values pairs in an array
    var cookieArr = document.cookie.split(";");

    // Loop through the array elements
    for (var i=0; i < cookieArr.length; i++){
        var cookiePair = cookieArr[i].split("=");

        // Removing whitespaces at the beginning of the cookie name
        // and compare it with the given string
        if (name == cookiePair[0].trim()){
            // Decode the cookie value and return
            return decodeURIComponent(cookiePair[1]);
        }

    }
    // Return null if not found
    return null;
}
var cart = JSON.parse(getCookie('cart'))

if (cart == undefined){
    cart = {}
    console.log('Cart Created!', cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"
}
console.log('cart:', cart)


var updateBtns = document.getElementsByClassName('update-cart')


for(var i=0; i < updateBtns.length; i++){
    updateBtns[i].addEventListener('click', function(){
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('productId:', productId, 'action:', action)

        console.log('USER:', user)
        if(user === 'AnonymousUser'){
            addCookieItem()
        }else{
            updateUserOrder(productId, action)
        }
    })
}

function addCookieItem(productId, action){
    console.log("Not Logged in...")
    if (action == 'add'){
        if (cart[productId] == undefined){
            cart[productId] = {'quantity':1}
        }else if (cart[productId]['quantity'] < 3) {
            cart[productId]['quantity'] += 1
        }
    }

    if (action == 'remove'){
        cart[productId]['quantity'] -= 1

        if (cart[productId]['quantity'] <= 0){
            console.log("Item should be deleted")
            delete cart[productId];
        }
    }

    if (action == 'delete'){
            console.log("Item should be deleted")
            delete cart[productId];
    }
    console.log("Cart: ", cart)
    document.cookie = 'cart=' + JSON.stringify(cart) + ";domain=;path=/"


//    cart = {
//          1:{'quantity':2},
//          3:{'quantity':1},
//          4:{'quantity':1},
//    }
}

function updateUserOrder(productId, action){
    console.log('User is logged in, sending Data..')

    var url = '/update_item'

    fetch(url, {
        method: 'POST',
        headers:{
            'Content-Type':'application/json',
            'X-CSRFToken': csrftoken,
        },
        body:JSON.stringify({'productId':productId, 'action': action})
    })
    .then((response) =>response.json())
    .then((data) =>{
        console.log('data:', data['data'])
//        location.reload()
        if (data['exceed'] == true){
            alert('Maximum order/product is 3!.');
        }
    })
}
