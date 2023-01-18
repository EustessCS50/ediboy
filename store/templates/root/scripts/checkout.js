const continueAsGuessBtn = document.getElementById('continueAsGuess');
const progress = document.getElementById('progress');
const registerationForm = document.getElementById('registrationForms');
const hidden = document.querySelector('.hidden');
const progressSteps = document.querySelectorAll('.progress-step');
const parent = document.querySelector('.parent');
const sidebar = document.querySelector('.sidebar');


formStepsNum = 0;
continueAsGuessBtn.addEventListener("submit", function () {
    formStepsNum++;
    updateProgressBar();
    if (sidebar.classList.contains('hidden')) {
        sidebar.classList.remove('hidden')
    } else {
        sidebar.classList.add('hidden')
    }
    if (parent.classList.contains('hidden')) {
        parent.classList.remove('hidden')
    } else {
        parent.classList.add('hidden')
    }
    if (hidden.classList.contains('hidden')) {
        hidden.classList.remove('hidden')
    } else {
        hidden.classList.add('hidden')
    }
});
function updateProgressBar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add('progress-step-active');
        } else {
            progressStep.classList.remove('progress-step-active');
        }
    })
};