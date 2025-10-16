

const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const countrySlect = document.getElementById('country');
const termsCheckBox = document.getElementById('terms');
const submitButton = document.querySelector('button');

function validateForm() {
    const allFilled = nameInput.value &&
        emailInput.value &&
        passwordInput.value &&
        confirmPasswordInput.value &&
        countrySlect.value &&
        termsCheckBox.checked;

    submitButton.disabled = !allFilled;
}

[nameInput, emailInput, passwordInput, confirmPasswordInput, countrySlect, termsCheckBox, submitButton]
    .forEach(element => element.addEventListener('input', validateForm));

termsCheckBox.addEventListener('change', validateForm);

form.addEventListener('submit', (event) => {
    if(passwordInput.value !== confirmPasswordInput.value) {
        event.preventDefault();
        alert('Passwords do not match');
    }
});





