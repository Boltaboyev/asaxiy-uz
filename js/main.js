import {useFetch, showDataUi, countCartLength} from "./utils/index.js"

const products = document.querySelector(".products")
const cartCounter = document.querySelector(".counter")
const likeCounter = document.querySelector(".like-counter")
const loader = document.querySelector(".loader-box")
const category = document.querySelector(".filter-btns")
const noUser = document.querySelector(".no-user")
const hasUser = document.querySelector(".has-user")
const userInfo = document.querySelector(".userInfo")
const logoutBtn = document.querySelector(".logout")

let categoryId = localStorage.getItem("sortId") || "all"
let userId = localStorage.getItem("userId")

const request = useFetch()
let productData = []

request({url: "products"})
    .then((data) => {
        loader.classList.add("flex")
        productData = data
        getData(productData)
        loader.classList.add("hidden")
    })
    .catch((err) => console.log(err))

let cartStore = JSON.parse(localStorage.getItem("carts")) || []
let likeStore = JSON.parse(localStorage.getItem("likes")) || []

function getData(data) {
    products.innerHTML = ""
    if (categoryId !== "all") {
        data = data.filter((element) => element.category === categoryId)
    }

    data.forEach((value) => {
        showDataUi(value, products)
    })

    // cart button
    let cartButtons = document.querySelectorAll(".btn-cart")
    cartButtons.forEach((value, idx) => {
        value.addEventListener("click", () => {
            if (!userId) {
                window.location.href = "./login.html"
            } else {
                addToCart(data[idx])
            }
        })
    })

    // like button
    let likeButtons = document.querySelectorAll(".bx-heart, .bxs-heart")
    likeButtons.forEach((button, idx) => {
        const productId = data[idx]?.id

        if (likeStore.some((item) => item.id === productId)) {
            button.classList.remove("bx-heart")
            button.classList.add("bxs-heart")
        }

        button.addEventListener("click", () => {
            const isLiked = likeStore.some((item) => item.id === productId)

            if (isLiked) {
                likeStore = likeStore.filter((item) => item.id !== productId)
                button.classList.remove("bxs-heart")
                button.classList.add("bx-heart")
            } else {
                likeStore.push(data[idx])
                button.classList.remove("bx-heart")
                button.classList.add("bxs-heart")
            }

            localStorage.setItem("likes", JSON.stringify(likeStore))
            countCartLength(likeStore, likeCounter)
        })
    })
}

function addToCart(data) {
    cartStore = [...cartStore, data]
    localStorage.setItem("carts", JSON.stringify(cartStore))
    countCartLength(cartStore, cartCounter)
}

// category
category.addEventListener("click", (e) => {
    const id = e.target.id
    if (id !== "") {
        categoryId = id
        localStorage.setItem("sortId", id)
        getData(productData)
    }
})

// check admin

if (userId) {
    noUser.style.display = "none"
    logoutBtn.style.display = "flex"
    userInfo.style.display = "flex"

    fetch(`https://677a303e671ca03068334652.mockapi.io/users/${userId}`)
        .then((res) => res.json())
        .then((user) => {
            if (userId === "admin") {
                hasUser.textContent = "Admin"
                window.location.href = "./admin.html"
            } else {
                hasUser.textContent = `${user.name}`
            }
        })
        .catch((err) => {
            console.log(err)
        })
} else {
    noUser.style.display = "flex"
    logoutBtn.style.display = "none"
    userInfo.style.display = "none"
}

// search
const searchForm = document.getElementById("search")
const searchInput = searchForm.querySelector("input")
const searchBtn = searchForm.querySelector("button")

searchForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const searchValue = searchInput.value
    const searchResult = productData.filter((product) =>
        product.title.toLowerCase().includes(searchValue.toLowerCase())
    )
    if (searchResult.length > 0) {
        getData(searchResult)
        searchForm.style.borderColor = ""
        searchBtn.style.background = ""
    } else {
        searchForm.style.borderColor = "red"
        searchBtn.style.background = "red"
        getData(productData)
    }
})

// logout
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

countCartLength(cartStore, cartCounter)
countCartLength(likeStore, likeCounter)
