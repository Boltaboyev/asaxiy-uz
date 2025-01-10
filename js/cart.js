import {countCartLength} from "./utils/index.js"
let cartProducts = document.querySelector(".productsList")
let cart = JSON.parse(localStorage.getItem("carts")) || []
let ttPrice = document.querySelector(".totalPrice")
let cartCounter = document.querySelector(".counter")
const noUser = document.querySelector(".no-user")
const hasUser = document.querySelector(".has-user")
const userInfo = document.querySelector(".userInfo")
const logoutBtn = document.querySelector(".logout")
const cartSection = document.getElementById("cart-section")
const emptySection = document.getElementById("empty-section")
const userId = localStorage.getItem("userId")

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
    if (!userId) {
        cart.length = 0
        cartCounter = 0
        localStorage.setItem("carts", JSON.stringify(cart)) 
    }
    if (cart.length === 0) {
        cartSection.style.display = "none"
        emptySection.style.display = "block"
    } else {
        cartSection.style.display = "block"
        emptySection.style.display = "none"
    }
    let groupedCart = groupCartItems(cart)
    groupedCart.forEach((value) => {
        let cartPr = document.createElement("div")
        cartPr.classList.add("cartProducts")
        cartPr.innerHTML = `
            <div class="shop-card">
                <div class="shop-img">
                    <img src="${value?.img}" alt="">
                </div>

                <div class="shop-title">
                    <h1>${value?.title}</h1>
                </div>
                            
                <h1 class="shop-price">${value?.price
                    .toLocaleString("uz-UZ")
                    .replace(/,/g, " ")} so'm</h1>
            </div>

            <div class="shop-bottom">
                <p>Buyurtmalar miqdori : ${value?.count} ta</p>

                <button class="delete-btn" data-id="${value.id}">
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

if (userId) {
    noUser.style.display = "none"
    logoutBtn.style.display = "flex"
    userInfo.style.display = "flex"

    fetch(`https://677a303e671ca03068334652.mockapi.io/users/${userId}`)
        .then((res) => res.json())
        .then((user) => {
            hasUser.textContent = `${user.name}`
        })
        .catch((err) => {
            console.log(err)
        })
} else {
    noUser.style.display = "flex"
    logoutBtn.style.display = "none"
    userInfo.style.display = "none"
}

const logoutPopup = document.getElementById("logout-popup")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")

logoutBtn.addEventListener("click", (e) => {
    logoutPopup.classList.add("show")
})

yesBtn.addEventListener("click", () => {
    localStorage.removeItem("userId")
    window.location.href = "./index.html"
})

noBtn.addEventListener("click", () => {
    logoutPopup.classList.remove("show")
})

renderCart(cart)
