const BASE_URL = "https://677a303e671ca03068334652.mockapi.io"
const useFetch = () => {
    const response = ({url, method = "GET", data}) => {
        return fetch(`${BASE_URL}/${url}`, {
            method,
            headers: {"Content-Type": "application/json"},
            body: data,
        })
            .then((data) => data.json())
            .catch((err) => console.log(err))
    }
    return response
}

function showDataUi(value, products) {
    let card = document.createElement("div")
    card.classList.add("card")
    card.innerHTML = `
    <span class="${value?.isNew !== undefined ? 'newPr' : ""}">${value?.isNew !== undefined ? value?.isNew : ""}</span>
            <div class="card-img relative">
                <div class="like absolute right-[10px] top-[10px]">
                    <i class='bx bx-heart text-red-500 z-10 text-[25px] cursor-pointer'></i>
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
                <small class="comment">${value?.comment || "0"} ta sharh</small>
            </div>

            <div class="card-price">
                <p> ${
                    value?.price
                        ? (value.price + Math.round(Math.random() * 150000))
                              .toLocaleString("uz-UZ")
                              .replace(/,/g, " ")
                        : "0"
                } so'm</p>
                <h1>${
                    value?.price.toLocaleString("uz-UZ").replace(/,/g, " ") || 0
                } so'm</h1>
            </div>

                    <p class="text-[14px] text-green-500 font-[500]">
                    ${(Number(value?.month.toFixed(0))).toLocaleString().replace(/,/g , " ")} so'm / 12 oy
                    </p>

            <div class="card-action">
                <button class="btn">Hoziroq xarid qilish</button>
                <button class="btn-cart"><i class='bx bxs-cart'></i></button>
            </div>
        <div>
        `

    products.append(card)
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

function countCartLength(cartStore, cartCounter) {
    let cartLength =  cartStore.length
    cartCounter.innerHTML = cartLength
}


export {useFetch, showDataUi, countCartLength}
