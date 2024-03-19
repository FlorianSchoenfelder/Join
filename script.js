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
    console.log(user.userName);
    await setItem('currentUser', JSON.stringify(user));
    helloUser = JSON.parse(await getItem('currentUser'));

    // currentUser.push(user);
    // initGreeting();
    // window.open("summary.html", "_self");
  }
}

// async function initUser() {
//   await includeHTML();
//   // loadCurrentUser();
//   initOthers();
//   // if (guest == true) {
//   //   initGreeting(guest);
//   // }
//   // initGreeting(currentUser);
//   // greetUser();
//   // getGreeting();
//   // checkforUser();
//   // filterTasksByCategory();
//   // renderToDos();
// }

function initGreeting(userOrGuest) {
  let windowWidth = window.innerWidth;
  // userOrGuest.push(helloUser);
  console.log(userOrGuest);
  // debugger;
  if (userOrGuest == "guest" && windowWidth <= 1024) {
    // debugger
    document.getElementById("greetUser").classList.remove("d-none");
    document.getElementById("greetUser").classList.add("greetingAnimation");
    document.getElementById("greetUser").innerHTML = /*html*/ `
      <h1>Hello Guest</h1>
    `;
  } else if (userOrGuest == "user" && windowWidth <= 1024) {
    document.getElementById("greetUser").classList.remove("d-none");
    document.getElementById("greetUser").classList.add("greetingAnimation");
    document.getElementById("greetUser").innerHTML = /*html*/ `
      <h1>Hello ${userOrGuest}</h1>
    `;
  }

  return userOrGuest;
}

// async function getLoggedUser(user) {
//   currentUser.push({
//     name: user.userName,
//     email: user.email,
//   });

//   await setItem("loggedUser", JSON.stringify(currentUser));
//   // return currentUser;
// }

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
