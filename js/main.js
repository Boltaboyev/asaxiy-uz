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

    let cartButtons = document.querySelectorAll(".btn-cart")
    cartButtons.forEach((value, idx) => {
        value.addEventListener("click", () => {
            addToCart(data[idx])
        })
    })

    let likeButtons = document.querySelectorAll(".bx-heart")
    likeButtons.forEach((value, idx) => {
        value.addEventListener("click", () => {
            addToLikes(data[idx])
        })
    })
}

function addToCart(data) {
    cartStore = [...cartStore, data]
    localStorage.setItem("carts", JSON.stringify(cartStore))
    countCartLength(cartStore, cartCounter)
}

function addToLikes(data) {
    likeStore = [...likeStore, data]
    localStorage.setItem("likes", JSON.stringify(likeStore))
    countCartLength(likeStore, likeCounter)
}

category.addEventListener("click", (e) => {
    const id = e.target.id
    if (id !== "") {
        categoryId = id
        localStorage.setItem("sortId", id)
        getData(productData)
    }
})

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



const logoutPopup = document.getElementById("logout-popup");
const yesBtn = document.getElementById("yes-btn");
const noBtn = document.getElementById("no-btn");

logoutBtn.addEventListener("click", (e) => {
    logoutPopup.classList.add("show"); 
});

yesBtn.addEventListener("click", () => {
    localStorage.removeItem("userId");
    location.reload();
});

noBtn.addEventListener("click", () => {
    logoutPopup.classList.remove("show"); 
});



countCartLength(cartStore, cartCounter)
countCartLength(likeStore, likeCounter)

