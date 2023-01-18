
/*
FOR THE TOGGLE BUTTONS AT THE FOOTER
*/
const toggleBtns = document.getElementsByClassName("footer-toggle-btn")
for (i = 0; i < toggleBtns.length; i++) {
    let toggleButton = toggleBtns[i]
    toggleButton.addEventListener('click', function (event) {
        let buttonClicked = event.target/*returns the class and id*/
        let container = buttonClicked.parentElement.parentElement/*gets the Container that has the class Basic information */
        let display = container.querySelector('.description')
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

/*
FOR THE TOGGLE BTNS BEFORE THE PRODUCTS
*/
const watchesContainer = document.querySelector(".watches-gshock")//THe main container
const fesToggleBtn = watchesContainer.querySelector('.fes-toggle-btn')
const secToggleBtn = document.querySelector('.toggle-btn')
secToggleBtn.addEventListener("click", function (event) {
    if (watchesContainer.classList.contains('close')) {
        watchesContainer.classList.remove("close")
    }
    else {
        watchesContainer.classList.add("close")
    }
});
fesToggleBtn.addEventListener("click", function (event) {
    if (watchesContainer.classList.contains('close')) {
        watchesContainer.classList.remove("close")
    }
    else {
        watchesContainer.classList.add("close")
    }
});
/*
const silderViewPort =document.querySelector('.image-slider_viewport')
const silderImageContainer = silderViewPort.querySelector('.image-slider_container')
const numberOfSliderImages =
    silderImageContainer.querySelectorAll('img').length;
let slideOffset = 0;
const moveSlides = offset => {
    const imagewidth =
        silderImageContainer.querySelector('img').offsetWidth;
    silderImageContainer.style.transform = `translateX(-${offset * imagewidth}px)`;
};

setInterval(() => {
    slideOffset =
        slideOffset < numberOfSliderImages - 1
            ? slideOffset + 1
            : 0;
    moveSlides(slideOffset);
}, 2000);*/