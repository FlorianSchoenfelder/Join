let checkbox = false;
// let currentUser = [];
let helloUser = [];

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

async function guestLogin(event) {
  event.preventDefault();
  await setItem('currentUser', 'guest');
  window.open("summary.html", "_self");
}

async function loginUser() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;
  let user = users.find(
    (users) => users.email == email && users.password == password
  );

  if (!user) {
    getErrorMessage();
    console.log("Falsch");
  } else {
    console.log("Gefunden");
    // let guest = false;

    // getLoggedUser(user);
    // console.log(user.userName);
    await setItem('currentUser', JSON.stringify(user));
    helloUser = JSON.parse(await getItem('currentUser'));

    // currentUser.push(user);
    // initGreeting();
    window.open("summary.html", "_self");
  }
}

function getErrorMessage() {
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
}

function checkforUser() {
  if (guest == true) {
    document.getElementById("right-lower-main").innerHTML += "Guest";
    document.getElementById("header-userprofile").src =
      "./assets/img/guestAvatar.svg";
  } else {
    document.getElementById("header-userprofile").src =
      "./assets/img/aside_and_header/header-userprofile.png";
  }
}

function closeDropdownMenu() {
  document.getElementById("submenuContainer").classList.add("d-none");
}

function openDropdownMenu() {
  document.getElementById("submenuContainer").classList.remove("d-none");
}
