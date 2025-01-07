import {useFetch, showDataUi, countCartLength} from "./utils/index.js"

const products = document.querySelector(".products")
const cartCounter = document.querySelector(".counter")
const likeCounter = document.querySelector(".like-counter")

const request = useFetch()

request({url: "products"})
    .then((data) => getData(data))
    .catch((err) => console.log(err))

let cartStore = JSON.parse(localStorage.getItem("carts")) || []
let likeStore = JSON.parse(localStorage.getItem("likes")) || [] 

function getData(data) {
    products.innerHTML = ""
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

countCartLength(cartStore, cartCounter)
countCartLength(likeStore, likeCounter)
