let products = document.querySelector(".products")
let cart = JSON.parse(localStorage.getItem("likes")) || []

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

                <p class="month">${
                    value?.month.toLocaleString("uz-UZ").replace(/,/g, " ") || 0
                } so'm x 12 oy</p>

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

renderCart(cart)
