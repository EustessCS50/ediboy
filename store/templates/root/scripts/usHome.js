/*if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {
    let addToCartButtons= document.getElementsByClassName('addtocart')
    for (let i = 0; i < addToCartButtons.length; i++){
        let button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }
}
function addToCartClicked(event) {
    let button = event.target
    let boxes = button.parentElement.parentElement.parentElement//grabx all the boxes
    let productImageClass = boxes.getElementsByClassName('product-image')[0]//grabing the parent class that holds the product-image class
    let productImageSrc = productImageClass.getElementsByClassName('image')[0].src
    let idClass = boxes.getElementsByClassName('brand-id-amount')[0]//grabing the parent class that holds the product-id
    let productId = idClass.getElementsByClassName('product-id')[0].innerHTML//grabing the product-id

    let productPrice = idClass.getElementsByClassName('amount')[0].innerHTML.replace('$', '')
    console.log(productId, productImageSrc, productPrice)
}*/
const newpage = document.getElementsByClassName('boxes')

for (i = 0; i < newpage.length; i++){
    let currentItem = newpage[i]
    currentItem.addEventListener('click', function () {
        window.location.href='productDesc/firstproduct.html'
    })
}

let bucket = JSON.parse(localStorage.getItem("selectedData")) || []
/*let renderShopitems =()=>{
    return (shopItems.innerHTML = shopItemsData.map((x) => {
        let {id,productName,img, price,} = x
        let search = bucket.find((x)=> x.id ===id) || []
        return `
            <div id="product-id-${id}" class="boxes" onclick="window.location.href="productDesc/firstproduct.html">
                <div class="new-heart">
                    <p class="availabilty">NEW</p>
                    <img src="USimages/heart.svg" alt="" width="18">
                </div>
                <div class="product-image">
                    <img class="image" src="${img}" alt="" width="200" >
                </div>
                <div class="brand-id-amount">
                    <p class="product-name" >${productName}</p>
                    <B class="product-id">${id}</B>
                    <p class="amount">$ ${price}</p>
                </div>
                <div class="buynow">
                <a href="../casio/checkout.html">
                    <button onclick="addToCart(${id})" id="${id}">BUY <span>NOW</span> </button></a>
                </div>
            </div>
        `
    }).join(""));
}
renderShopitems()
let addToCart = (id) => {
    let selectedItem = id
    let search = bucket.find((x) => x.id === selectedItem.id)
    if (search === undefined) {
        bucket.push({
            id: selectedItem.id,
            item:1,
        })
    } else {
        return
    }
    localStorage.setItem("selectedData", JSON.stringify(bucket))

    upadtecart(id)
}
let upadtecart = (id) => {
    let search = bucket.find((x)=> x.id ===id)
    let notification =document.getElementsByClassName('notification')[0]
    notification.innerHTML = bucket.map((x)=> x.item).reduce((x,y)=>x+y,0)
}
upadtecart()
/*let calculation = () => {

}*/
/*let increment = (prodCode) => {
    let selectedItem = prodCode
    let search = bucket.find((x) => x.prodCode === selectedItem)
    if (search === undefined) {
        bucket.push({
            prodCode: selectedItem,
            item:1,
        })
    } else {
        search.item += 1
    }

    console.log(bucket)
}*/
/*let decrement = (prodCode) => {
    let selectedItem = prodCode
    let search = bucket.find((x) => x.prodCode === selectedItem)
    if (search.item === 0) return
    else {
        search.item -= 1
    }

    console.log(bucket)
}*/

