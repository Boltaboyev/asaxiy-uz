let products = document.querySelector(".products")
let cart = JSON.parse(localStorage.getItem("likes")) || []
const noUser = document.querySelector(".no-user")
const hasUser = document.querySelector(".has-user")
const userInfo = document.querySelector(".userInfo")
const logoutBtn = document.querySelector(".logout")
const likeSection = document.getElementById("like-section")
const emptyLike = document.getElementById("like-empty")

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
    products.innerHTML = ""
    if (cart.length === 0) {
        emptyLike.style.display = "block"
        likeSection.style.display = "none"
        return
    } else {
        emptyLike.style.display = "none"
        likeSection.style.display = "block"
    }
    let groupedCart = groupCartItems(cart)
    groupedCart.forEach((value) => {
        let card = document.createElement("div")
        card.classList.add("card")
        card.innerHTML = `
            <div class="card-img relative">
                <div class="like absolute right-[10px] top-[10px]">
                    <i class='bx bxs-heart text-red-500 z-10 text-[25px] cursor-pointer' data-id="${
                        value.id
                    }"></i>
                </div>
                <img src="${value?.img}" alt="">
            </div>

            <h1 class="card-title">
                ${value?.title || "Noma'lum mahsulot"}
            </h1>
            <div class="card-info">
                <div class="card-rate">
                    <div class="card-stars">
                        ${ratingStars(value?.rate)}
                    </div>
                    <small class="comment">${
                        value?.comment || "0"
                    } ta sharh</small>
                </div>

                <div class="card-price">
                    <p>${
                        value?.price
                            ? (value.price + Math.round(Math.random() * 150000))
                                  .toLocaleString("uz-UZ")
                                  .replace(/,/g, " ")
                            : "0"
                    } so'm</p>
                    <h1>${
                        value?.price
                            .toLocaleString("uz-UZ")
                            .replace(/,/g, " ") || 0
                    } so'm</h1>
                </div>

                    <p class="text-[14px] text-green-500 font-[500]">
                    ${(Number(value?.month.toFixed(0))).toLocaleString().replace(/,/g , " ")} so'm / 12 oy
                    </p>

                <div class="card-action">
                    <button class="btn">Hoziroq xarid qilish</button>
                    <button class="btn-cart"><i class='bx bxs-cart'></i></button>
                </div>
            </div>
        `

        products.append(card)
    })

    deleteCart()
}

function ratingStars(rating) {
    let stars = ""
    for (let i = 1; i <= 5; i++) {
        stars += `<i class="bx bxs-star ${
            i <= Math.round(rating) ? "yellow-star" : "gray-star"
        }"></i>`
    }
    return stars
}

function deleteCart() {
    let deleteButtons = document.querySelectorAll(".bxs-heart")
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            let productId = e.target.dataset.id
            deleteProduct(productId)
        })
    })
}

function deleteProduct(cartId) {
    cart = cart.filter((item) => item.id !== cartId)
    localStorage.setItem("likes", JSON.stringify(cart))
    renderCart(cart)
}

const userId = localStorage.getItem("userId")

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
