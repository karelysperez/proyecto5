import './formStyle.css';
import './cardFormStyle.css';

// Populate year select with current year + 15 years
const yearSelect = document.getElementById('card-expiry-year');
const currentYear = new Date().getFullYear();

for (let i = 0; i < 16; i++) {
    const year = currentYear + i;
    const option = document.createElement('option');
    option.value = year.toString().slice(-2); // Last 2 digits
    option.textContent = year;
    yearSelect.appendChild(option);
}

// Card holder name - convert to uppercase
const cardHolderInput = document.getElementById('card-holder-name');
cardHolderInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.toUpperCase();
});

// Card number - format with spaces (4 groups of 4)
const cardNumberInput = document.getElementById('card-number');
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, ''); // Remove spaces
    value = value.replace(/\D/g, ''); // Remove non-digits
    
    // Limit to 16 digits
    if (value.length > 16) {
        value = value.slice(0, 16);
    }
    
    // Add spaces every 4 digits
    e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
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

