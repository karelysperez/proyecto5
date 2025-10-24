import './formStyle.css';
import './cardFormStyle.css';

// convert to uppercase
const cardHolderInput = document.getElementById('card-holder-name');
cardHolderInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// format with spaces (4 groups of 4)
const cardNumberInput = document.getElementById('card-number');
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, ''); // Remove spaces
    value = value.replace(/\D/g, ''); // Remove non-digits
    

    if (value.length > 16) {
        value = value.slice(0, 16);
    }
    

    e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
});

const yearInput = document.getElementById('card-expiry-year');
yearInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 4);
});

// CVC - only numbers, max 3 characters
const cvcInput = document.getElementById('card-cvc');
cvcInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 3);
});

// Form submission
const form = document.getElementById('card-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const yearValue = yearInput.value;
    const expiryMonth = document.getElementById('card-expiry-month').value;

    if (yearValue.length !== 4){
        alert('Please enter a valid year');
        return;
    }

    const expiryYear = parseInt(yearValue);
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const expiryMonthInt = parseInt(expiryMonth);

    if (expiryYear < currentYear || (expiryYear === currentYear && expiryMonthInt < currentMonth)){
        alert('Please enter a valid expiry date');
        return;
    }
    
    const cardData = {
        holderName: cardHolderInput.value,
        cardNumber: cardNumberInput.value.replace(/\s/g, ''), // Remove spaces for storage
        expiryMonth: document.getElementById('card-expiry-month').value,
        expiryYear: document.getElementById('card-expiry-year').value,
        cvc: cvcInput.value,
        saveCard: document.getElementById('save-card').checked
    };
    
    console.log('Card Data:', cardData);
    alert('Payment Applied Successfully!');
});

