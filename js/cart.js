import { countCartLength } from "./utils/index.js";
let cartProducts = document.querySelector(".productsList");
let cart = JSON.parse(localStorage.getItem("carts")) || [];
let ttPrice = document.querySelector(".totalPrice");

function groupCartItems(cart) {
    let groupedCart = [];
    cart.forEach((item) => {
        let existingItem = groupedCart.find((product) => product.id === item.id);
        if (existingItem) {
            existingItem.count += 1; 
        } else {
            groupedCart.push({ ...item, count: 1 });
        }
    });
    return groupedCart;
}

function renderCart(cart) {
    cartProducts.innerHTML = ""; 
    let groupedCart = groupCartItems(cart);
    groupedCart.forEach((value) => {
        let cartPr = document.createElement("div");
        cartPr.classList.add("cartProducts");
        cartPr.innerHTML = `
            <div class="flex justify-between items-center gap-[20px] border-b border-comment border-opacity-25 max-[560px]:flex-col max-[560px]:pb-[10px] max-[560px]:justify-start max-[560px]:items-start">
                <div class="shop-img w-[100px] h-[100px] overflow-hidden max-[560px]:self-center max-[560px]:h-[140px] max-[560px]:w-[140px]">
                    <img src="${value?.img}" alt="" class="w-full h-full object-contain">
                </div>

                <div class="shop-title flex flex-col justify-start items-start gap-[10px]">
                    <h1>${value?.title}</h1>
                </div>
                            
                <h1 class="text-primary font-[700] text-nowrap">${value?.price
                    .toLocaleString("uz-UZ")
                    .replace(/,/g, " ")} so'm</h1>
            </div>

            <div class="shop-bottom flex justify-between items-center max-[290px]:flex-col max-[290px]:gap-[10px] max-[290px]:justify-start max-[290px]:items-start">
                <p class="text-[14px] opacity-55">Buyurtmalar miqdori : ${value?.count} ta</p>

                <button class="max-[290px]:w-full delete-btn" data-id="${value.id}">
                    <i class='border border-red-500 max-[290px]:w-full text-red-500 p-[5px_10px] rounded bx bx-trash hover:text-[#fff] hover:bg-red-500 transition duration-[.2s] active:scale-[.96]'></i>
                </button>
            </div>
        `;
        cartProducts.append(cartPr);
    });

    deleteCart();
    totalPrice(groupedCart); 
}

function totalPrice(cart) {
    let totalPrice = cart.reduce(
        (sum, product) => sum + (product?.price || 0) * (product?.count || 1),
        0
    );
    ttPrice.textContent = `${totalPrice
        .toLocaleString("uz-UZ")
        .replace(/,/g, " ")} so'm`;
}

function deleteCart() {
    let deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            let productId = e.target.closest(".delete-btn").dataset.id;
            deleteProduct(productId);
        });
    });
}

function deleteProduct(cartId) {
    cart = cart.filter((item) => item.id !== cartId);
    localStorage.setItem("carts", JSON.stringify(cart)); 
    renderCart(cart);
}

renderCart(cart);
