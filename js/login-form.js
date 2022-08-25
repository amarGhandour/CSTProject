let users = [
    {username: "JhonDoe", password: "123456"},
];

if(document.cookie!=""){
    getCookie();
}

// username validation
let username = document.getElementById('username');
let password = document.getElementById('password');

username.focus();

document.forms[0].addEventListener('submit', (event) => {

    let error = document.getElementById('invalid-login');
    if (!isValidLogin(username.value, password.value)) {
        event.preventDefault();
        // add validation error
        let errors = document.getElementsByClassName('errors')[0];
        if (!error) {
            let error = document.createElement('div');
            error.innerText = `* invalid username or password`;
            error.id = 'invalid-login';
            errors.appendChild(error);
        }

    }else{
        document.cookie = `studentName=${username.value}`;
        //alert('here')
    }

});

document.forms[0].addEventListener('reset', (event) => {
    if (!confirm('Are you sure?')){
        event.preventDefault();
    }
});

function isValidLogin(_username, _password) {
    for (let i = 0; i < users.length; i++) {
        console.log(users);
        if (users[i].username.toLowerCase() === _username.toLowerCase() && users[i].password === _password)
            return true;
    }
    return false;
}

function getCookie(){
    let queryArray = document.cookie.split(';');
    let newUser = {};
    queryArray.map(function (ele) {
        let arr = ele.split('=');
        arr[0] = arr[0].trim();
        if (arr[0] === 'username' || arr[0] === 'password')
            newUser[arr[0]] = arr[1];
    });

    users.push(newUser);

}

