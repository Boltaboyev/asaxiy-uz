const form = document.getElementById("form")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const toast = document.getElementById("toast")
const eyeIcon = document.querySelector(".fa-eye")
const passwordType = document.querySelector(".pass-type")
const error = document.querySelector(".error")

if (localStorage.getItem("userId")) {
    window.location.href = "./index.html"
}

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    fetch("https://677a303e671ca03068334652.mockapi.io/users")
        .then((res) => res.json())
        .then((data) => {
            // Adminni tekshiramiz
            if (email === "admin@gmail.com" && password === "123") {
                error.classList.add("hidden")
                toast.style.transition = ".3s"
                toast.style.right = "20px"
                localStorage.setItem("userId", "admin") // Admin ID sifatida maxsus qiymat
                setTimeout(() => {
                    window.location.href = "./admin.html"
                }, 2000)
                return // Admin topilgan bo'lsa, keyingi tekshirishni o'tkazib yuboramiz
            }

            // Oddiy foydalanuvchini tekshiramiz
            const user = data.find(
                (e) => e.email === email && e.password === password
            )

            if (user) {
                error.classList.add("hidden")
                toast.style.transition = ".3s"
                toast.style.right = "20px"
                localStorage.setItem("userId", user.id) // User ID ni saqlash
                setTimeout(() => {
                    window.location.href = "./index.html"
                }, 2000)
            } else {
                error.classList.remove("hidden")
                toast.style.transition = ".3s"
                toast.style.right = "-300px"
            }
        })
        .catch((err) => {
            console.error("Error:", err)
            error.classList.remove("hidden")
            toast.style.transition = ".3s"
            toast.style.right = "-300px"
        })
})

eyeIcon.addEventListener("click", () => {
    if (passwordType.type === "password") {
        passwordType.type = "text"
        eyeIcon.classList.remove("fa-eye")
        eyeIcon.classList.add("fa-eye-slash")
    } else {
        passwordType.type = "password"
        eyeIcon.classList.remove("fa-eye-slash")
        eyeIcon.classList.add("fa-eye")
    }
})


