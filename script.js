let checkbox = false;

function changeCheckbox() {
    if (!checkbox == true) {
        checkbox = true;
    }else {
        checkbox = false;
    }
    switchCheckboxImage();
}

function switchCheckboxImage(){
    if (!checkbox == false) {
        document.getElementById('notChecked').classList.add('d-none');
        document.getElementById('notChecked').classList.remove('d-block');
        document.getElementById('checked').classList.add('d-block');
        document.getElementById('checked').classList.remove('d-none');
    }else {
        document.getElementById('notChecked').classList.add('d-block');
        document.getElementById('notChecked').classList.remove('d-none');
        document.getElementById('checked').classList.add('d-none');
        document.getElementById('checked').classList.remove('d-block');
    }
}

function guestLogin(event) {
    event.preventDefault();
    location.href = "http://127.0.0.1:5502/summary.html";
}

function loginUser() {
    let email = document.getElementById('loginEmail').value;
    let password = document.getElementById('loginPassword').value;
    let user = users.find(users => users.email == email.value && users.password == password.value);
    console.log(user);
    if (user) {
        console.log('Gefunden');
    }
}
