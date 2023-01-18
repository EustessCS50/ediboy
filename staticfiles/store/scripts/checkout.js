const continueAsGuessBtn = document.getElementById('continueAsGuess');
const progress = document.getElementById('progress');
const registerationForm = document.getElementById('registrationForms');
const progressSteps = document.querySelectorAll('.progress-step');
const nextBtns = document.querySelectorAll('.next-btn');
const formSteps = document.querySelectorAll('.formstep');
const parent = document.querySelector('.parent');
const sidebar = document.querySelector('.sidebar');
const shippingInfos = document.querySelectorAll('.shippinginfo');

let formStepsNum = 0;
let formStepsNumCal = 0;
nextBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
        formStepsNum++;//1
        formStepsNumCal++;
        updateFormSteps();
        updateProgressBar();
      if (sidebar.classList.contains('hidden')) {
            sidebar.classList.remove('hidden')
      } else {
          return
        };

       /* if (parent.classList.contains('hidden')) {
            parent.classList.remove('hidden')
        } else {
            parent.classList.add('hidden')
        }
        if (hidden.classList.contains('hidden')) {
            hidden.classList.remove('hidden')
        } else {
            hidden.classList.add('hidden')
        }*/
    });
})
function updateFormSteps() {
    formSteps.forEach(formStep => {
        formStep.classList.contains("formstep-active") &&
        formStep.classList.remove("formstep-active")
    })
    formSteps[formStepsNum].classList.add("formstep-active")
}

/*proceedToPaymentBtn.addEventListener("click", function () {
    formStepsNum++;
    updateFormSteps();
    updateProgressBar();

   /* if (parent.classList.contains('hidden')) {
        parent.classList.remove('hidden')
    } else {
        parent.classList.add('hidden')
    }
    if (hidden.classList.contains('hidden')) {
        hidden.classList.remove('hidden')
    } else {
        hidden.classList.add('hidden')
    }*/
//});




function updateProgressBar() {
    const method = document.querySelector('.round');
    progressSteps.forEach((progressStep, idx) => {
        if (progressStep.classList.contains("progress-step-active")) {
            progressStep.classList.remove("progress-step-active")
        }
        else {
            return;
        }
    })

    progressSteps[formStepsNum].classList.add('progress-step-active');
    formStepsNumCal--;
    console.log(formStepsNumCal)
    progressSteps[formStepsNumCal].classList.add('progress-step-check');
    method.classList.add('progress-step-check');
    formStepsNumCal++;
    console.log(formStepsNumCal)
    shippingInfos.forEach((shippingInfo) => {
        if (formStepsNumCal === 2) {
            shippingInfo.classList.add("show")
        }else {return}
    })


};


//THE X BTN
const fesToggleBtn = document.querySelector('.toggle-btn')
const importantshippinginfos = document.querySelectorAll('.importantshippinginfo')
const watchesContainer = document.querySelector('.watchesContainer')


fesToggleBtn.addEventListener("click", function (event) {
    if (watchesContainer.classList.contains('close')) {
        watchesContainer.classList.remove("close")
    }
    else {
        watchesContainer.classList.add("close")
    }
});

importantshippinginfos.forEach((importantshippinginfo) => {
    importantshippinginfo.addEventListener("click", function (event) {
        if (watchesContainer.classList.contains('close')) {
            watchesContainer.classList.remove("close")
        }
        else {
            watchesContainer.classList.add("close")
        }
    });
})

const loginBtn = document.querySelector('.login')
const preRegisterBtn = document.querySelector('.pre-register')
loginBtn.addEventListener("click", function (event) {
    window.location.replace("logIn.html")
})
preRegisterBtn.addEventListener("click", function (event) {
    window.location.replace("pre-register.html")
})


