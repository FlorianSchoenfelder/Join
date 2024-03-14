let checkbox = false;
let currentUser = [];
let guest = false;

function changeCheckbox() {
  if (!checkbox == true) {
    checkbox = true;
  } else {
    checkbox = false;
  }
  switchCheckboxImage();
}

function switchCheckboxImage() {
  if (!checkbox == false) {
    document.getElementById("notChecked").classList.add("d-none");
    document.getElementById("notChecked").classList.remove("d-block");
    document.getElementById("checked").classList.add("d-block");
    document.getElementById("checked").classList.remove("d-none");
  } else {
    document.getElementById("notChecked").classList.add("d-block");
    document.getElementById("notChecked").classList.remove("d-none");
    document.getElementById("checked").classList.add("d-none");
    document.getElementById("checked").classList.remove("d-block");
  }
}

function guestLogin(event) {
  event.preventDefault();
  guest = true;

  window.open('summary.html', '_self');
  initGreeting();
}

function loginUser() {
  guest = false;
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let user = users.find(
    (users) => users.email == email && users.password == password
  );
  
  if (!user) {
    // alert('Wrong Email or Password');
    loginEmail.style.border = "2px solid red";
    loginPassword.style.border = "2px solid red";
    document.getElementById("wrongPassword").classList.remove("d-none");
    rememberMe.classList.add("remember");
    document
      .getElementById("loginForm")
      .addEventListener("click", function (event) {
        event.stopPropagation();
      });
    console.log("Falsch");
  } else {
    console.log("Gefunden");
    getLoggedUser(user);
    
    window.open('summary.html', '_self');
    initGreeting();
  }
}

function initGreeting() {
  let windowWidth = window.innerWidth;
  
  if (windowWidth <= 1024) {
    document.getElementById('right-lower-main').classList.add('greetingAnimation');

  }

  // if (windowWidth <= 1024 && (!history.back("add_task_n_include.html" || "contacts.html" || "board.html"))) {

  // }
}

async function getLoggedUser(user) {
  currentUser.push({
    name: user.userName,
    email: user.email,
  });
  await setItem("loggedUser", JSON.stringify(currentUser));
}

function closeDropdownMenu() {
  document.getElementById("submenuContainer").classList.add("d-none");
}

function openDropdownMenu() {
  document.getElementById("submenuContainer").classList.remove("d-none");
}

