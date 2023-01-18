const toggleBtns = document.getElementsByClassName("toggle-btn")
for (i = 0; i < toggleBtns.length; i++) {
    let toggleButton = toggleBtns[i]
    toggleButton.addEventListener('click', function (event) {
        let buttonClicked = event.target/*returns the class and id*/
        let span = buttonClicked.querySelectorAll('span')[1]
        console.log(span)
        span.classList.toggle("close")
        let container =buttonClicked.parentElement.parentElement/*gets the Container that has the class Basic information */
        let display = container.querySelector('.description')
        display.classList.toggle("lock")
    })
}