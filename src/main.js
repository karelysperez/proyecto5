const storageKey = 'formSubmissions';
const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const countrySlect = document.getElementById('country');
const termsCheckBox = document.getElementById('terms');
const submitButton = document.getElementById('submitBtn');

function readSubmissions() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function writeSubmissions(submissions) {
    localStorage.setItem(storageKey, JSON.stringify(submissions));
}

function  updateSubmitState() {
    submitButton.disabled = !(form.checkValidity() && termsCheckBox.checked);
}

form.addEventListener('input', updateSubmitState);
termsCheckBox.addEventListener('change', updateSubmitState);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if(passwordInput.value !== confirmPasswordInput.value){
        alert('Passwords do not match');
        return;
    }

    const submission = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
        confirmPassword: confirmPasswordInput.value.trim(),
        country: countrySlect.value,
        termsCheckBox: termsCheckBox.checked,
    }

    const list = readSubmissions();
    list.push(submission);
    writeSubmissions(list);

    window.location.href = 'result.html';
});

updateSubmitState();





