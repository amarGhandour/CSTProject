// username validation
let username = document.getElementById('username');
let password = document.getElementById('password');

username.focus();
setValidationError('username-error', username, password, ' invalid username', isValidUsername);

// userPass validation
let confirm = document.getElementById('password_confirm');
setValidationError('password-error', password, confirm, ' password must between 8 to 15 character', isValidPassword);

// password confirmation validation
let email = document.getElementById('email');
setValidationError('confirm-error', confirm, email, ' password must confirmed', isPassConfirmed);

// email validation
let gender = document.getElementsByName('gender')[0];
setValidationError('email-error', email, gender, ' email is invalid', isValidEmail);

// gender validation
let ok = document.querySelector('button[type="submit"]');
setValidationError('gender-error', gender, ok, ' must select one of gender', isGenderSelected);


document.forms[0].addEventListener('submit', () => {

    document.cookie = `username=${username.value};`;
    document.cookie = `password=${password.value};`;

});

document.forms[0].addEventListener('reset', (event) => {

    if (!confirm('Are you sure?')) {
        event.preventDefault()
    }

});

function setValidationError(errorId, currentField, nextField, message, callback) {
    currentField.addEventListener('blur', function () {

        let error = document.getElementById(errorId);
        if (!callback(currentField.value)) {
            currentField.focus();
            currentField.select();

            // add validation error
            let errors = document.getElementsByClassName('errors')[0];
            if (!error) {
                let error = document.createElement('div');
                error.innerText = `* ${message}`;
                error.id = errorId;
                errors.appendChild(error);
            }
        } else if (error) {
            error.remove();
            nextField.focus();
            nextField.select();
        } else {
            nextField.focus();
            nextField.select();
        }
    });
}

function isValidUsername(username) {
    const usernameRegex = /^[a-z0-9_.]+$/
    return usernameRegex.test(username)
}

function isPassConfirmed(confirm) {
    let password = document.getElementById('password').value;
    return confirm === password;
}

function isValidPassword(password) {

    const passwordRegex = /^[0-9A-Za-z]{8,15}$/;
    return passwordRegex.test(password);
}

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
}

function isGenderSelected(gender) {
    return !! document.querySelector('input[name="gender"]:checked');
}
