/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./**.{html,js}", "./js/**.js", "./*.html"],
    theme: {
        extend: {
            colors: {
                primary: "#006bff",
                hover: "#092dd3",
                light: "#00bfaf",
                tx: "#141821",
                bg: "#f4f7fd",
                orange: "#fe7300",
                comment: "#c2c6d1"
            },
        },
    },
    plugins: [],
}
