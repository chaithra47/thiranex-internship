// Dark Mode Toggle

const modeButton = document.getElementById("mode");

modeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        modeButton.innerHTML = "☀ Light Mode";
    } else {
        modeButton.innerHTML = "🌙 Dark Mode";
    }
});