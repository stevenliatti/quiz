
function authorized(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null || (user !== null && user.tokenExpire < Math.floor(Date.now() / 1000))) {
        document.getElementById(id).remove();
        const newP = document.createElement('p');
        const newContent = document.createTextNode('You must be connected');
        const newA = document.createElement('a');
        newA.href = '/static/login.html';
        newA.appendChild(newContent);
        newP.appendChild(newA);
        document.getElementById('content').appendChild(newP);
        return false;
    }
    return true;
}

function alreadyConnected(id) {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.tokenExpire > Math.floor(Date.now() / 1000) + 60) {
        document.getElementById(id).remove();
        const newP = document.createElement('p');
        newP.style = 'color: green';
        const newContent = document.createTextNode('Already connected !');
        newP.appendChild(newContent);
        document.getElementById('content').appendChild(newP);
    }
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email !== '' && password !== '') {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status === 200) {
                console.log('success login', JSON.parse(this.response));
                localStorage.setItem('user', this.response);
                document.getElementById('form').remove();
                const newP = document.createElement('p');
                newP.style = 'color: green';
                const newContent = document.createTextNode('Authentification réussie, redirection sur la page d\'accueil !');
                newP.appendChild(newContent);
                document.getElementById('content').appendChild(newP);
                window.setTimeout(function () {
                    window.location.href = "index.html";
                }, 1500);
            } else {
                console.log('error', this.response);
                if (this.response === 'Unauthorized') {
                    error.innerHTML = 'Email or password false';
                }
            }
        };
        xhr.send(JSON.stringify({email: email, password: password}));
    }
}

function register() {
    let error = document.getElementById('error');
    // error.style = 'color: red';
    error.innerHTML = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const repeatedPassword = document.getElementById('repeat_password').value;

    if (email !== '' && password !== '' && repeatedPassword !== '') {
        if (password !== repeatedPassword) {
            console.log('Passwords mismatch');
            error.innerHTML = 'Passwords doesn\'t match';
            return;
        }

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/register', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function () {
            if (this.status === 200) {
                console.log('success register', JSON.parse(this.response));
                localStorage.setItem('user', this.response);
                document.getElementById('form').remove();
                const newP = document.createElement('p');
                newP.style = 'color: green';
                const newContent = document.createTextNode('Register success !');
                newP.appendChild(newContent);
                document.getElementById('content').appendChild(newP);
            } else {
                const resp = JSON.parse(this.response);
                console.log('error', this.response);
                error.innerHTML = resp.error;
            }
        }
        xhr.send(JSON.stringify({email: email, password: password}));
    }
}


function edit() {
    let error = document.getElementById('error');
    error.innerHTML = '';
    const email = document.getElementById('email').value;
    const pseudo = document.getElementById('pseudo').value;
    const password = document.getElementById('password').value;
    const repeatedPassword = document.getElementById('repeat_password').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/auth/account', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let token = '';
    //xhr.setRequestHeader('Authorization', token);
     if (pseudo !== '' && email !== '' && password !== '' && repeatedPassword !== '') {
            if (password !== repeatedPassword) {
                console.log('Passwords mismatch');
                error.innerHTML = 'Passwords doesn\'t match';
                return;
            }
    console.log("onload");
    xhr.onload = function() {
            if (this.status === 200) {
                console.log('success editing', JSON.parse(this.response));
                localStorage.setItem('edit', this.response);
                document.getElementById('form').remove();
                const newP = document.createElement('p');
                newP.style = 'color: green';
                const newContent = document.createTextNode('Editing success !');
                newP.appendChild(newContent);
                document.getElementById('content').appendChild(newP);
            }
            else {
                const resp = JSON.parse(this.response);
                console.log('error', this.response);
                error.innerHTML = resp.error;
            }
        }
        xhr.send(JSON.stringify({ email: email, pseudo: pseudo, password: password}));
    }
}
