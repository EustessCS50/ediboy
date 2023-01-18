const toggleBtns = document.getElementsByClassName("footer-toggle-btn")
for (i = 0; i < toggleBtns.length; i++) {
    let toggleButton = toggleBtns[i]
    toggleButton.addEventListener('click', function (event) {
        let buttonClicked = event.target/*returns the class and id*/
        let container = buttonClicked.parentElement.parentElement/*gets the main*2 Container that has toggle-btn */
        console.log(container)
        let display = container.querySelector('.signin')
        if (display.classList.contains('lock')) {
            display.classList.remove("lock")
        }
        else {
            display.classList.add("lock")
        }
        if (buttonClicked.classList.contains('toggleBtnRotate')) {
            buttonClicked.classList.remove("toggleBtnRotate")
        }
        else {
            buttonClicked.classList.add("toggleBtnRotate")
        }
    })
}