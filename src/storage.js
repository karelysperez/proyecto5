export  function getFormData() {
    return JSON.parse(localStorage.getItem('formData')) || {};
}

export function setFormData(formData) {
    localStorage.setItem('formData', JSON.stringify(formData));
}