let users = [];

async function init(){
    await loadUsers();
    // await includeHTML();
    // console.log(users);
}

async function loadUsers(){
    try {
        users = JSON.parse(await getItem('users'));
        // console.log(users);
    } catch(e){
        console.error('Loading error:', e);
    }
}

async function registerUser() {
    if (password.value !== confirmPassword.value) {
        
        password.style.border = '2px solid red';
        confirmPassword.style.border = '2px solid red';
        document.getElementById("passwordNotMatch").classList.remove("d-none");
        PPContainer.style.bottom = '92px';
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

