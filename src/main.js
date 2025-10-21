import "./style.css"

const form = document.querySelector('form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const termsCheckBox = document.getElementById('terms');
const submitButton = document.getElementById('submitBtn');
const inputs = document.querySelectorAll('input');

function syncConfirmValidity() {
    const mismatch = passwordInput.value !== '' &&
        confirmPasswordInput.value !== '' &&
        passwordInput.value !== confirmPasswordInput.value;

    confirmPasswordInput.setCustomValidity(mismatch ? 'Passwords do not match' : '');
}

function updateSubmitState() {
    submitButton.disabled = !(form.checkValidity() && termsCheckBox.checked);

    if(!submitButton.disabled){
        submitButton.classList.add('btn-enabled')
    } else {
        submitButton.classList.remove('btn-enabled')
    }
}

function updateInputValidClass(input) {
    if (input.type === 'checkbox') return;
    
    if (input.value.trim() !== '' && input.checkValidity()) {
        input.classList.add('is-valid');
    } else {
        input.classList.remove('is-valid');
    }
}

form.addEventListener('input', (event) => {
    syncConfirmValidity();
    updateSubmitState();

    if (event.target.tagName === 'INPUT' || event.target.tagName === 'SELECT') {
        updateInputValidClass(event.target);

        if (event.target === passwordInput) {
            updateInputValidClass(confirmPasswordInput);
        }
    }
});

termsCheckBox.addEventListener('change', updateSubmitState);

form.addEventListener('submit', (event) => {
    syncConfirmValidity();

    if(!form.checkValidity()){
        event.preventDefault();
        form.reportValidity();

    }else{

        inputs.forEach(input => {
            if (input.type !== 'checkbox') {
                updateInputValidClass(input);
            }
        });
    }

});

syncConfirmValidity();
updateSubmitState();

