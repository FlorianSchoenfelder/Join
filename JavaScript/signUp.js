
async function init(){
    loadUsers();
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


async function registerUser() {
    if (password.value !== confirmPassword.value) {
        
        password.style.border = '2px solid red';
        confirmPassword.style.border = '2px solid red';
        alert('The Passwords does not match to each other!');
    } else {
        if (checkbox !== true) {
            alert('Please accept the Privacy Policy!');
        } else {
            users.push({
            userName: userName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value
            });
            await setItem('users', JSON.stringify(users));
            resetForm();
            console.info('Erfolgreich registriert!');
        }
    }
}

function resetForm() {
    userName.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    password.style.border = '';
    confirmPassword.style.border = '';
    changeCheckbox();
    // document.getElementById('registerButton').disabled = false;
}

