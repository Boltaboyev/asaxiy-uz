import {countCartLength} from "./utils/index.js"
let cartProducts = document.querySelector(".productsList")
let cart = JSON.parse(localStorage.getItem("carts")) || []
let ttPrice = document.querySelector(".totalPrice")
let cartCounter = document.querySelector(".counter")

function groupCartItems(cart) {
    let groupedCart = []
    cart.forEach((item) => {
        let existingItem = groupedCart.find((product) => product.id === item.id)
        if (existingItem) {
            existingItem.count += 1
        } else {
            groupedCart.push({...item, count: 1})
        }
    })
    return groupedCart
}

function renderCart(cart) {
    cartProducts.innerHTML = ""
    let groupedCart = groupCartItems(cart)
    groupedCart.forEach((value) => {
        let cartPr = document.createElement("div")
        cartPr.classList.add("cartProducts")
        cartPr.innerHTML = `
            <div class="shop-card">
                <div class="shop-img">
                    <img src="${
                        value?.img
                    }" alt="">
                </div>

                <div class="shop-title">
                    <h1>${value?.title}</h1>
                </div>
                            
                <h1 class="shop-price">${value?.price
                    .toLocaleString("uz-UZ")
                    .replace(/,/g, " ")} so'm</h1>
            </div>

            <div class="shop-bottom">
                <p>Buyurtmalar miqdori : ${
                    value?.count
                } ta</p>

                <button class="delete-btn" data-id="${
                    value.id
                }">
                    <i class='bx bx-trash'></i>
                </button>
            </div>
        `
        cartProducts.append(cartPr)
    })

    deleteCart()
    totalPrice(groupedCart)
    countCartLength(cart, cartCounter)
}

function totalPrice(cart) {
    let totalPrice = cart.reduce(
        (sum, product) => sum + (product?.price || 0) * (product?.count || 1),
        0
    )
    ttPrice.textContent = `${totalPrice
        .toLocaleString("uz-UZ")
        .replace(/,/g, " ")} so'm`
}

function deleteCart() {
    let deleteButtons = document.querySelectorAll(".delete-btn")
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            let productId = e.target.closest(".delete-btn").dataset.id
            deleteProduct(productId)
        })
    })
}

function deleteProduct(cartId) {
    cart = cart.filter((item) => item.id !== cartId)
    localStorage.setItem("carts", JSON.stringify(cart))
    renderCart(cart)
}

renderCart(cart)
