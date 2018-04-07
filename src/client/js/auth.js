const user = JSON.parse(localStorage.getItem('user'));
if (user !== null && user.tokenExpire > Math.floor(Date.now() / 1000) + 60) {
    document.getElementById('form').remove();
    const newP = document.createElement('p');
    newP.style = 'color: green';
    const newContent = document.createTextNode('Already connected !');
    newP.appendChild(newContent);
    document.getElementById('content').appendChild(newP);
}

function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (email !== '' && password !== '') {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/auth/login', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (this.status === 200) {
                console.log('success login', JSON.parse(this.response));
                localStorage.setItem('user', this.response);
                document.getElementById('form').remove();
                const newP = document.createElement('p');
                newP.style = 'color: green';
                const newContent = document.createTextNode('Login success !');
                newP.appendChild(newContent);
                document.getElementById('content').appendChild(newP);
            }
            else {
                console.log('error', this.response);
                if (this.response === 'Unauthorized') {
                    error.innerHTML = 'Email or password false';
                }
            }
        }
        xhr.send(JSON.stringify({ email: email, password: password}));
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
        xhr.onload = function() {
            if (this.status === 200) {
                console.log('success register', JSON.parse(this.response));
                localStorage.setItem('user', this.response);
                document.getElementById('form').remove();
                const newP = document.createElement('p');
                newP.style = 'color: green';
                const newContent = document.createTextNode('Register success !');
                newP.appendChild(newContent);
                document.getElementById('content').appendChild(newP);
            }
            else {
                const resp = JSON.parse(this.response);
                console.log('error', this.response);
                error.innerHTML = resp.error;
            }
        }
        xhr.send(JSON.stringify({ email: email, password: password}));
    }
}