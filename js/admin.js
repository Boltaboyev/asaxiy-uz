const userId = localStorage.getItem("userId")
const logoutPopup = document.getElementById("logout-popup")
const yesBtn = document.getElementById("yes-btn")
const noBtn = document.getElementById("no-btn")
const hasUser = document.querySelector(".has-user")
const userInfo = document.querySelector(".userInfo")
const logoutBtn = document.querySelector(".logout")
const addBtn = document.getElementById("add-btn")
const editBtn = document.getElementById("edit-btn")
const removeBtn = document.getElementById("remove-btn")
const allBtn = document.getElementById("all-btn")
const addSection = document.getElementById("add-section")
const editSection = document.getElementById("edit-section")
const removeSection = document.getElementById("remove-section")
const allProducts = document.getElementById("all-product")
const toast = document.getElementById("toast")

if (userId == "admin") {
    logoutBtn.style.display = "flex"
    userInfo.style.display = "flex"

    fetch(`https://677a303e671ca03068334652.mockapi.io/users/3`)
    hasUser.textContent = "Admin"
} else {
    logoutBtn.style.display = "none"
    userInfo.style.display = "none"
}

// append -----------------------------------------------------------------------
const appendAllProduct = document.getElementById("append-all-product")
const appendEditProduct = document.getElementById("append-edit-pr")
const appendRemoveProduct = document.getElementById("append-remove-pr")

fetch("https://677a303e671ca03068334652.mockapi.io/products")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((product) => {
            // all product section
            let allProductDiv = document.createElement("div")
            allProductDiv.innerHTML += `
                <div
                    class="px-[20px] h-[100%] rounded-lg flex flex-col justify-between relative bg-white p-[20px] items-start gap-[20px] border border-green-400">
                    <p
                        class="absolute top-[5px] left-[5px] text-[12px] text-[#fff] bg-green-500 p-[2px_6px] rounded-md">
                        ${product?.category}</p>
                    <div class="h-[130px] w-[130px] m-auto">
                        <img src="${
                            product?.img
                        }" alt="" class="object-contain h-[130px] w-[130px]">
                    </div>

                    <h1 class="text-gray-600 leading-[120%]">${
                        product?.title
                    }</h1>

                    <div class="flex flex-col w-full gap-[2px]">
                        <h1 class="text-[20px] font-[600] text-primary">${product?.price
                            .toLocaleString('uz-UZ')
                            .replace(/,/g, " ")} so'm</h1>
                    <p class="text-[14px] text-green-500 font-[500]">
                    ${(Number(product.month.toFixed(0))).toLocaleString('uz-UZ').replace(/,/g , " ")} so'm / 12 oy
                    </p>

                    </div>
                </div>
                `
            appendAllProduct.append(allProductDiv)

            // edit product section
            let editProductDiv = document.createElement("div")
            editProductDiv.classList.add("edit-product-box")
            editProductDiv.innerHTML += `
                <div
                    class="px-[20px] h-[100%] rounded-lg flex flex-col justify-between relative bg-white p-[20px] items-start gap-[20px] border border-blue-400">
                    <p class="absolute top-[5px] left-[5px] text-[12px] text-[#fff] bg-blue-500 p-[2px_6px] rounded-md">${
                        product?.category
                    }</p>
                    <div class="h-[130px] w-[130px] m-auto">
                        <img src="${
                            product?.img
                        }" alt="" class="h-[130px] w-[130px] object-contain">
                    </div>

                    <h1 class="text-gray-600 leading-[120%]">${
                        product?.title
                    }</h1>


                    <div class="flex flex-col w-full gap-[2px]">
                        <h1 class="text-[20px] font-[600] text-primary">${product?.price
                            .toLocaleString('uz-UZ')
                            .replace(/,/, " ")} so'm</h1>
                    <p class="text-[14px] text-green-500 font-[500]">
                    ${(Number(product.month.toFixed(0))).toLocaleString('uz-UZ').replace(/,/g , " ")} so'm / 12 oy
                    </p>
                    </div>

                    <i
                        class="bx bxs-edit w-full text-center  p-[10px_20px]  bg-blue-500 text-white hover:bg-blue-600 transition duration-[.2s] active:scale-[.97] rounded-md cursor-pointer"></i>
                </div>
                `
            appendEditProduct.append(editProductDiv)

            // remove product section
            let removeProductDiv = document.createElement("div")
            removeProductDiv.classList.add("remove-product-box")
            removeProductDiv.innerHTML += `
                <div
                    class="px-[20px] h-[100%] rounded-lg flex flex-col justify-between relative bg-white p-[20px] items-start gap-[20px] border border-red-400">
                    <p class="absolute top-[5px] left-[5px] text-[12px] text-[#fff] bg-red-500 p-[2px_6px] rounded-md">${
                        product?.category
                    }</p>
                    <div class="h-[130px] w-[130px] m-auto">
                        <img src="${
                            product?.img
                        }" alt="" class="h-[130px] w-[130px] object-contain">
                    </div>

                    <h1 class="text-gray-600 leading-[120%]">${
                        product?.title
                    }</h1>


                    <div class="flex flex-col w-full gap-[2px]">
                        <h1 class="text-[20px] font-[600] text-primary">${product?.price
                            .toLocaleString('uz-UZ')
                            .replace(/,/, " ")} so'm</h1>
                    <p class="text-[14px] text-green-500 font-[500]">
                    ${(Number(product.month.toFixed(0))).toLocaleString('uz-UZ').replace(/,/g , " ")} so'm / 12 oy
                    </p>
                    </div>

                    <i
                        class="bx bxs-trash w-full text-center  p-[10px_20px]  bg-red-500 text-white hover:bg-red-600 transition duration-[.2s] active:scale-[.97] rounded-md cursor-pointer"></i>
                </div>
                `
            appendRemoveProduct.append(removeProductDiv)

            // remove product -----------------------------------------------------------------------
            const removeProductBox = document.querySelectorAll(
                ".remove-product-box"
            )
            removeProductBox.forEach((box) => {
                box.addEventListener("click", (e) => {
                    if (e.target.classList.contains("bxs-trash")) {
                        fetch(
                            `https://677a303e671ca03068334652.mockapi.io/products/${product.id}`,
                            {
                                method: "DELETE",
                            }
                        )
                        toast.textContent = "Product removed successfully"
                        toast.classList.remove("bg-green-400")
                        toast.classList.add("bg-red-400")
                        toast.classList.remove("bottom-[-100%]")
                        toast.classList.add("bottom-[20px]")
                        toast.style.transition = "all .5s"
                        setTimeout(() => {
                            toast.classList.remove("bottom-[20px]")
                            toast.classList.add("bottom-[-100%]")
                            toast.classList.remove("bg-red-400")
                            toast.classList.add("bg-green-400")
                            location.reload()
                        }, 2000)
                    }
                })
            })

            // edit product -----------------------------------------------------------------------
            const editForm = document.getElementById("edit-form")
            const editFormBox = document.querySelector(".editFormBox")
            const closeForm = document.querySelector(".bx-x")
            const editProductBox =
                document.querySelectorAll(".edit-product-box")
            const editTitle = document.getElementById("edit-title")
            const editCategory = document.getElementById("edit-category")
            const editPrice = document.getElementById("edit-price")
            const editMonth = document.getElementById("edit-monthlyPay")
            const editImg = document.getElementById("edit-img")

            editProductBox.forEach((box, index) => {
                box.productId = data[index].id

                box.addEventListener("click", (e) => {
                    if (e.target.classList.contains("bxs-edit")) {
                        const productId = box.productId

                        fetch(
                            `https://677a303e671ca03068334652.mockapi.io/products/${productId}`
                        )
                            .then((res) => res.json())
                            .then((product) => {
                                editFormBox.classList.remove("hidden")
                                editFormBox.classList.add("flex")
                                editTitle.value = product.title
                                editCategory.value = product.category
                                editPrice.value = product.price
                                editMonth.value = product.month.toFixed(0)
                                editImg.dataset.oldImage = product.img

                                closeForm.addEventListener("click", () => {
                                    if (
                                        editFormBox.classList.contains("flex")
                                    ) {
                                        editFormBox.classList.remove("flex")
                                        editFormBox.classList.add("hidden")
                                    }
                                })

                                editForm.addEventListener("submit", (e) => {
                                    e.preventDefault()

                                    const file = editImg.files[0]
                                    if (file) {
                                        const editReader = new FileReader()
                                        editReader.onload = () => {
                                            const editedBaseImg = editReader.result
                                            updateProduct(
                                                productId,
                                                editedBaseImg
                                            )
                                        }
                                        editReader.readAsDataURL(file)
                                    } else {
                                        updateProduct(
                                            productId,
                                            editImg.dataset.oldImage
                                        )
                                    }
                                })
                            })
                    }
                })
            })

            function updateProduct(productId, editedBaseImg) {
                fetch(
                    `https://677a303e671ca03068334652.mockapi.io/products/${productId}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            title: editTitle.value,
                            category: editCategory.value,
                            price: +editPrice.value,
                            month: +editMonth.value,
                            img: editedBaseImg,
                        }),
                    }
                )
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Failed to update product")
                        }
                        return response.json()
                    })
                    .then(() => {
                        toast.textContent = "Product updated successfully"
                        toast.classList.remove("bottom-[-100%]")
                        toast.classList.add("bottom-[20px]")
                        toast.style.transition = "all .5s"

                        editFormBox.classList.remove("flex")
                        editFormBox.classList.add("hidden")

                        setTimeout(() => {
                            toast.classList.remove("bottom-[20px]")
                            toast.classList.add("bottom-[-100%]")
                            location.reload()
                        }, 2000)
                    })
                    .catch((err) => console.log(err))
            }
        })
    })

    .catch((error) => {
        console.log(error)
    })

// add product -----------------------------------------------------------------------
const addForm = document.getElementById("add-form")
const addTitle = document.getElementById("add-title")
const addPrice = document.getElementById("add-price")
// const addMonth = document.getElementById("add-monthlyPay")
const addImg = document.getElementById("add-img")
const addSubmit = document.getElementById("add-submit")

addForm.addEventListener("submit", (e) => {
    e.preventDefault()

    const file = addImg.files[0]
    if (!file) {
        alert("Please select an image file.")
        return
    }

    const reader = new FileReader()
    reader.onload = () => {
        const baseImg = reader.result

        fetch("https://677a303e671ca03068334652.mockapi.io/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: addTitle.value,
                category: "new",
                price: +addPrice.value,
                month: +addPrice.value / 12,
                img: baseImg,
                comment: 0,
                rate: 0,
                count: 1,
                isNew: "new",
            }),
        })
            .then((res) => res.json())
            .then(() => {
                toast.textContent = "Product added successfully"
                toast.classList.remove("bottom-[-100%]")
                toast.classList.add("bottom-[20px]")
                toast.style.transition = "all .5s"
                addTitle.value = ""
                addPrice.value = ""
                // addMonth.value = ""
                addImg.value = ""
                setTimeout(() => {
                    toast.classList.remove("bottom-[20px]")
                    location.reload()
                    toast.classList.add("bottom-[-100%]")
                }, 2000)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    reader.readAsDataURL(file)
})

// section active -----------------------------------------------------------------------
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

function hideSections() {
    document.querySelectorAll(".section").forEach((section) => {
        section.classList.remove("active")
    })
}

addBtn.addEventListener("click", () => {
    hideSections()
    addSection.classList.add("active")
})

editBtn.addEventListener("click", () => {
    hideSections()
    editSection.classList.add("active")
})

removeBtn.addEventListener("click", () => {
    hideSections()
    removeSection.classList.add("active")
})

allBtn.addEventListener("click", () => {
    hideSections()
    allProducts.classList.add("active")
})

hideSections()
allProducts.classList.add("active")
