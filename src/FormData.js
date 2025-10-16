const storageKey = 'formSubmissions';

function readSubmissions() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function writeSubmissions(submissions) {
    localStorage.setItem(storageKey, JSON.stringify(submissions));
}

function displaySubmission() {
    const submissionList = document.getElementById('submission-list');

    const submissions = readSubmissions();

    if(!submissions.length) {
        submissionList.innerHTML = '<p>No submissions yet.</p>';
        return;
    }

    submissionList.innerHTML = '';

    submissions.forEach((s) => {
        const listItem = document.createElement('li');
        listItem.className = 'submission-item';
        listItem.innerHTML = `
            <p><strong>Name:</strong> ${s.name}</p>
            <p><strong>Email:</strong> ${s.email}</p>
            <p><strong>Password:</strong> ${s.password}</p>
            <p><strong>Confirm Password:</strong> ${s.confirmPassword}</p>
            <p><strong>Country:</strong> ${s.country}</p>
            <hr>
        `
        submissionList.appendChild(listItem);
    });
}

displaySubmission();

document.getElementById('clear-button').addEventListener('click', () => {
    if(confirm('Are you sure you want to clear all submissions?')) {
        writeSubmissions([]);
        displaySubmission();
    }
});

