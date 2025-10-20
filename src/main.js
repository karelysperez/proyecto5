import "./style.css"

const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckBox = document.getElementById('terms');
const submitButton = document.getElementById('submitBtn');

function  updateSubmitState() {
    submitButton.disabled = !(form.checkValidity() && termsCheckBox.checked);
}

form.addEventListener('input', updateSubmitState);
termsCheckBox.addEventListener('change', updateSubmitState);

form.addEventListener('submit', (event) => {

    if(passwordInput.value !== confirmPasswordInput.value){
        event.preventDefault();
        alert('Passwords do not match');
    }
});

updateSubmitState();





