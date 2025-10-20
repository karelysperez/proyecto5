const storageKey = 'formSubmissions';

function readSubmissions() {
    return JSON.parse(localStorage.getItem(storageKey)) || [];
}

function writeSubmissions(submissions) {
    localStorage.setItem(storageKey, JSON.stringify(submissions));
}

function getFormData() {
    const params = new URLSearchParams(window.location.search);
    if([...params.keys()].length === 0) return null;

    const name = params.get('name');
    const email = params.get('email');
    const password = params.get('password');
    const confirmPassword = params.get('confirmPassword');
    const country = params.get('country');
    return { name, email, password, confirmPassword, country };
}

function addSubmission() {
    const submission = getFormData();
    if(!submission) return;

    if(!submission.name || !submission.email || !submission.password || !submission.confirmPassword || !submission.country) {
        alert('Please fill in all fields');
        return;
    }

    const submissions = readSubmissions();
    submissions.push(submission);
    writeSubmissions(submissions);

    if(window.history && window.history.replaceState) {
        window.history.replaceState(null, '', window.location.pathname);
    }

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

addSubmission();
displaySubmission();

document.getElementById('clear-button').addEventListener('click', () => {
    if(confirm('Are you sure you want to clear all submissions?')) {
        writeSubmissions([]);
        displaySubmission();
    }
});

