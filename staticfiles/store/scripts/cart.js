const summarySection = document.getElementById("summary-section")
const orderSummary = document.getElementById("order-summary")
const shoppingHeader = document.getElementById("shoppingheader")
const gridParent = document.getElementById("main")
let bucket = JSON.parse(localStorage.getItem("selectedData")) || []
let calculation = () => {//Incharge of recalculatx the total items on the nav bar
    let notification = document.getElementsByClassName('notification')[0]
    let cal = notification.innerHTML = bucket.map((x) => x.item).reduce((x, y) => x + y, 0)
}
calculation()
let generateCartItems = () => {
    if (bucket.length !== 0) {//Things to do when there are items in the cart
        summarySection.innerHTML = `
        <div class="summary-header bold-text">Summary</div>
        <div class="summary-details">
            <p class="subtotal">
                <span>Cart Subtotal: <i class="bi bi-question-circle-fill"></i></span>
                <span class="estimatedTotal-amount bold-text" ></span>
            </p>
            <p class="subtotal">
                <span>Shipping: <i class="bi bi-question-circle-fill"></i></span>
                <span>$0.00</span>
            </p>
            <p class="subtotal">
                <span>Tax: <i class="bi bi-question-circle-fill"></i></span>
                <span>$0.00</span>
            </p>
            <p class="subtotal bold-text">
                <span>Estimated Total</span>
                <span class="estimatedTotal-amount bold-text" ></span>
            </p>
        </div>
        <div class="proceedToCheckout-button">
            <a href="#">
                <button>PROCEED TO CHECKOUT</button>
            </a>
        </div>
        `
        orderSummary.innerHTML = `
        <div class="sumarry-section" id="order-summary-section">
        <div class="summary-header bold-text">Order Summary</div>
        <div class="summary-details" id="summary-details">
            <p class="subtotal">
                <span>Cart Subtotal: <i class="bi bi-question-circle-fill"></i></span>
                <span  class="estimatedTotal-amount bold-text"></span>
            </p>
            <p class="subtotal">
                <span>Shipping: <i class="bi bi-question-circle-fill"></i></span>
                <span>$0.00</span>
            </p>
            <p class="subtotal">
                <span>Tax: <i class="bi bi-question-circle-fill"></i></span>
                <span>$0.00</span>
            </p>
            <p class="subtotal bold-text background">
                <span>Estimated Total</span>
                <span class="estimatedTotal-amount bold-text"></span>
            </p>
        </div>
        <div class="proceedToCheckout-button">
            <a href="#">
                <button>PROCEED TO CHECKOUT</button>
            </a>
        </div>
    </div>
        `
        return (gridParent.innerHTML = bucket.map((x) => {
            let { id, item } = x
            let itemSearch = bucket.find((x)=> x.id ===id) || []
            let search = shopItemsData.find((y) => y.id === id) || []
            return `
            <div class="grid-container" id="product-id-${search.id}">
            <div class="flex-container">
                <div class="line">
                    <div class="main-section" id="main-section">
                        <div class="image-productid">
                            <div class="image">
                                <img src="${search.img}" alt="" width="200" heigth="250">
                            </div>
                            <div class="productid-qty-trash">
                                <div class="productid bold-text">${search.id}</div>
                                <div class="decrease-qty-increase">
                                    <span>
                                        <i onclick="decrement(${search.id})" class="bi bi-dash"></i>
                                    </span>
                                    <span id="${search.id}" class="quantity">
                                    ${itemSearch.item === undefined? 0: itemSearch.item}
                                    </span>
                                    <span>
                                        <i onclick="increment(${search.id})" class="bi bi-plus"></i>
                                    </span>
                                </div>
                                <div class="trash">
                                    <i onclick="removeItem(${id})" class="bi bi-trash3"></i>
                                </div>
                            </div>
                        </div>
                        <div class="price bold-text">
                            <p>$${(item*search.price).toFixed(2)}</p>
                        </div>
                </div>
                </div>
            </div>
        </div>
           `
       }).join(" "))

    }
    else {//Things to do when there are no items in the cart
        gridParent.innerHTML = `
            <div class="empty-cart">
                <p> You have no items in your shopping cart</p>
            </div>
        `

    }
}
let increment = (id) => {
    let selectedProduct = id
    let search = bucket.find((x) => x.id === selectedProduct.id)
    if (search === undefined) {
        bucket.push({
            id: selectedProduct.id,
            item:1
        })
    } else {
        search.item +=1
    }
    localStorage.setItem("selectedData", JSON.stringify(bucket))
    update(selectedProduct.id)
    window.location.reload()
    generateCartItems()
}
let decrement = (id) => {//incharge of reducing the number of items in the cart
    let selectedProduct = id
    let search = bucket.find((x) => x.id === selectedProduct.id)
    if(search.item === undefined) return
    else if (search.item === 0) return
    else {
        search.item -=1
    }
    update(selectedProduct.id)
    bucket= bucket.filter((x)=>x.item !== 0)
    localStorage.setItem("selectedData", JSON.stringify(bucket))
    window.localStorage.reload()
    generateCartItems()

}
let update = (id) => {//Updates the total number of items in the cart
    let search = bucket.find((x) => x.id === id)
    document.getElementById(id).innerHTML= search.item
    calculation()
    estimatedTotal()
}
let removeItem = (id) => { //incharge of permanently deletx items 4rm the cart
    let selectedItem = id
   // console.log(selectedItem.id)
    bucket = bucket.filter((x) => x.id !== selectedItem.id)
    calculation()
    generateCartItems()
    estimatedTotal()
     window.location.reload()
    localStorage.setItem("selectedData", JSON.stringify(bucket))
}
let estimatedTotal = (id) => { //incharge of calculatibg and displayx the totals
    if (bucket.length !== 0) {
        let amount = bucket.map((x) => {
            let { id, item } = x
            let search = shopItemsData.find((y) => y.id === id) || []
            return item * search.price

        }).reduce((x,y)=>x+y,0)
        //console.log(amount)
        let cartTotalAmount = document.getElementsByClassName("estimatedTotal-amount")
        for (let i = 0; i < cartTotalAmount.length; i++){
            cartTotalAmount[i].textContent = `$${(amount).toFixed(2)}`
        }
    }else return
}
generateCartItems()
estimatedTotal()