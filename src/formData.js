import './formDataStyle.css';
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
    const country = params.get('country') || params.get('selected') || '';
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
    const submissionTable = document.getElementById('submission-list');
    const submissionTbody = document.getElementById('submission-tbody');

    const submissions = readSubmissions();

    if(!submissions.length) {
        submissionTable.style.display = 'none';
        submissionTable.insertAdjacentHTML('afterend', '<p id="no-submissions">No submissions yet.</p>');
        return;
    }

    submissionTable.style.display = 'table';
    const noSubmissionsMsg = document.getElementById('no-submissions');
    if(noSubmissionsMsg) noSubmissionsMsg.remove();

    submissionTbody.innerHTML = '';

    submissions.forEach((s) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.email}</td>
            <td>${s.password}</td>
            <td>${s.confirmPassword}</td>
            <td>${s.country}</td>
        `;
        submissionTbody.appendChild(row);
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

