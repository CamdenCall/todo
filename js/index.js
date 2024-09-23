var checkboxes = document.querySelectorAll("input[type=checkbox]")
checkboxes.forEach(element => {
    element.addEventListener("click", function() {
        if (element.checked) {
            element.parentElement.parentElement.style.backgroundColor = "#5fffc8"
        } else {
            element.parentElement.parentElement.style.backgroundColor = "transparent"
        }
    })
})