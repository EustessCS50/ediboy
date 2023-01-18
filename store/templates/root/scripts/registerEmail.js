/*


DONE BY ALVIERI


*/



const validateForm = formSelector => {//this finds the form within the doc
    const formElelment = document.querySelector(formSelector)

    //VALIDATION CRITERIAS

    const validationOptions = [
        {
            attribute: 'minlength',
            isValid: input => input.value && input.value.length >= parseInt(input.minLength, 10),
            errorMessage: (input, label) => `The ${label.textContent.replace("*", " ")} must be at least ${input.minLength}characters and include uppercase letters, lowercase letters and numbers.`
        },
        {
            attribute: 'pattern',
            isValid: input => {
                const patternRegex =new RegExp(input.pattern)
                return patternRegex.test(input.value)
            },
            errorMessage: (input, label) => `${label.textContent.replace("*", " ")} is incorrect.`
        },
        {
            attribute: 'required',
            isValid: input => input.value.trim() !== '',
            errorMessage: (input, label) => `Please enter ${label.textContent.replace("*", " ")}`
        },
    ]

    const validateSingleFormGroup = formGroup => {//checks if every input field meets the criteria
        const label = formGroup.querySelector('label')
        const input = formGroup.querySelector('input, select')
        const errorContainer = formGroup.querySelector('.error')
        const sucessIcon = document.querySelector('.check')
        const errorIcon = document.querySelector('.xmark')


        let formGroupError = false;
        for (const option of validationOptions) {
            if (input.hasAttribute(option.attribute) && !option.isValid(input)) {//If  there's an error
                errorContainer.textContent = option.errorMessage(input, label);
                input.classList.add('errorStyle');
                input.classList.remove('noError');
                /*
                WORK ON THE ICONS LATER
                 */
                sucessIcon.classList.add('.show')//check icon does'nt show up
                errorIcon.classList.remove('.show')//x icon shows up
                formGroupError = true;
            }
        }
        if (!formGroupError) {//if There's no errors
            errorContainer.textContent = ''
            input.classList.remove('errorStyle')
            input.classList.add('noError')
            sucessIcon.classList.remove('.show')
            errorIcon.classList.add('.show')
        }
        return !formGroupError //This returns true if there're no errors
    }





    formElelment.setAttribute("novalidate", '');

    Array.from(formElelment.elements).forEach(element => {
        element.addEventListener('blur', event => {
            validateSingleFormGroup(event.srcElement.parentElement)
    })
})
    const validateAllFormGroups = formToValidate => {
        const formGroups = Array.from(
            formToValidate.querySelectorAll('.formGroup')
        );
        return formGroups.every(formGroup => validateSingleFormGroup(formGroup));
    };

    formElelment.addEventListener('submit', event => {
        const formValid = validateAllFormGroups(formElelment)
        if (!formValid) {
            event.preventDefault();
        }else{
            event.preventDefault();
        }
    })

}
validateForm('#registrationForm')