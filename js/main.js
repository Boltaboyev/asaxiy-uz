import {useFetch, showDataUi, countCartLength} from "./utils/index.js"
const products = document.querySelector(".products")
const cartCounter = document.querySelector(".counter")

const request = useFetch()

request({url: "products"})
    .then((data) => getData(data))
    .catch((err) => console.log(err))

let cartStore = JSON.parse(localStorage.getItem("carts")) || []

function getData(data) {
    products.innerHTML = ""
    data.forEach((value) => {
        showDataUi(value, products)
    })
    let buttons = document.querySelectorAll(".btn-cart")
    buttons.forEach((value, idx) => {
        value.addEventListener("click", () => {
            addToCart(data[idx])
        })
    })
}

function addToCart(data) {
    countCartLength(cartStore, cartCounter)
    cartStore = [...cartStore, data]
    localStorage.setItem("carts", JSON.stringify(cartStore))
    let cartLength = cartStore.length
    cartCounter.innerHTML = cartLength
}

countCartLength(cartStore, cartCounter)
