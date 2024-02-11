let checkbox = false;
let currentUser = [];

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
    let user = users.find(users => users.email == email && users.password == password);
    if (!user) {
        alert('Wrong Email or Password');
        loginEmail.style.border = '2px solid red';
        loginPassword.style.border = '2px solid red';
    } else {
       console.log(user);
    if (user) {
        console.log('Gefunden');
        getLoggedUser(user);
        location.href = "http://127.0.0.1:5502/summary.html";
    } 
    }
    
    
}

 async function getLoggedUser(user){
    currentUser.push({
        name: user.userName,
        email: user.email
        });
        await setItem('loggedUser', JSON.stringify(currentUser));
}

function closeDropdownMenu() {
    document.getElementById('submenuContainer').classList.add('d-none');
  }
  
  function openDropdownMenu() {
    document.getElementById('submenuContainer').classList.remove('d-none');
  }
