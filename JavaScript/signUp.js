let users = [];

async function init(){
    await loadUsers();
    // signdeUpSuccess();
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
            signdeUpSuccess();
            resetForm();
            console.info('Erfolgreich registriert!');
            window.open("index.html", "_self");
        }
    }
}

function signdeUpSuccess() {
    let popUp = document.getElementById('animationSignUp');
    popUp.classList.add('show'); // Füge die Klasse .show hinzu, um den Container anzuzeigen
    setTimeout(function() {
        popUp.classList.remove('show'); // Entferne die Klasse .show nach einer gewissen Zeit, um den Container auszublenden
    }, 2000); // Anpassen Sie die Zeit in Millisekunden nach Bedarf
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

