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

//Country Select with Flags
const countries = [
    { name: "Argentina", flag: "🇦🇷" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Chile", flag: "🇨🇱" },
    { name: "Colombia", flag: "🇨🇴" },
    { name: "Ecuador", flag: "🇪🇨" },
    { name: "Mexico", flag: "🇲🇽" },
    { name: "Peru", flag: "🇵🇪" },
    { name: "Spain", flag: "🇪🇸" }
];

const select = document.querySelector('.custom-select');
const selected = select.querySelector('.selected');
const optionsList = select.querySelector('.options');
const hiddenCountryInput = document.getElementById('country');

countries.forEach(country => {

    const li = document.createElement('li');

    li.innerHTML = `${country.flag} ${country.name}`;

    li.addEventListener('click', () => {
        selected.innerHTML = `${country.flag} ${country.name}`;
        // cuando el usuario selecciona un país:
        hiddenCountryInput.value = country.name; // o country.code, lo que quieras enviar
        select.classList.remove('open');
    });
    optionsList.appendChild(li);
});

select.addEventListener('click', (event) => {
    event.stopPropagation();
    select.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    if(!select.contains(event.target)) {
        select.classList.remove('open');
    }
})

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

