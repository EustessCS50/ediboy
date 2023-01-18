const toggleBtns = document.getElementsByClassName("footer-toggle-btn")
for (i = 0; i < toggleBtns.length; i++) {
    let toggleButton = toggleBtns[i]
    toggleButton.addEventListener('click', function (event) {
        let buttonClicked = event.target/*returns the class and id*/
        let container =buttonClicked.parentElement.parentElement/*gets the Container that has the class Basic information */
        let display = container.querySelector('.description')
        if (display.classList.contains('lock')) {
            display.classList.remove("lock")
        }
        else {
            display.classList.add("lock")
        }
    })
}