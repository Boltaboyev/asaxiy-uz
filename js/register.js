const eyeIcon = document.querySelector(".fa-eye")
const passwordType = document.querySelector(".pass-type")
const form = document.getElementById("reg-form")
const nameInput = document.getElementById("name")
const surnameInput = document.getElementById("surname")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const toast = document.getElementById("toast")

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const userData = {
        name: nameInput.value.trim(),
        surname: surnameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
    }

    fetch("https://677a303e671ca03068334652.mockapi.io/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    })
        .then((res) => res.json())
        .then(() => {
            toast.style.transition = ".3s"
            toast.style.right = "20px"
            setTimeout(() => {
                toast.style.transition = ".3s"
                toast.style.right = "-100%"
                form.reset()
                window.location.href = "./login.html"
            }, 2000)
        })
        .catch((err) => console.log(err))
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
