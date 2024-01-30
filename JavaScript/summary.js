function highlightFirstDiv() {
  document.getElementById("first-line-left-div").classList.add("darken-div");
  changePencilHhover();
  document
    .getElementById("summary-pencil-image")
    .classList.add("on-hover-pencil");
  document.getElementById("amount-of-to-do").classList.add("color-white");
  document.getElementById("to-do-span").classList.add("color-white");
}

function delightFirstDiv() {
  document.getElementById("first-line-left-div").classList.toggle("darken-div");
  changePencilDishover();
  document.getElementById("amount-of-to-do").classList.remove("color-white");
  document.getElementById("to-do-span").classList.remove("color-white");
}

function changePencilHhover() {
  let pencilOnHover = document.getElementById("summary-pencil-image");
  pencilOnHover.src = "/assets/img/summary/summary_pencil_image_white.svg";
}

function changePencilDishover() {
  let pencilOnDishover = document.getElementById("summary-pencil-image");
  pencilOnDishover.src = "/assets/img/summary/summary_pencil_image.png";
}

function highlightSecondDiv() {
  document.getElementById("first-line-right-div").classList.add("darken-div");
  document.getElementById("summary-amount-done").classList.add("color-white");
  document.getElementById("summary-done-span").classList.add("color-white");
  changeCheckHover();
}

function delightSecondDiv() {
  changeCheckDishover();
  document
    .getElementById("first-line-right-div")
    .classList.remove("darken-div");
  document
    .getElementById("summary-amount-done")
    .classList.remove("color-white");
  document.getElementById("summary-done-span").classList.remove("color-white");
}

function changeCheckHover() {
  let checkOnHover = document.getElementById("summary-check-image");
  checkOnHover.src = "/assets/img/summary/summary_check_white.svg";
}

function changeCheckDishover() {
  let checkOnDishover = document.getElementById("summary-check-image");
  checkOnDishover.src = "/assets/img/summary/summary_check.svg";
}

function highlightSecondLine() {
  document.getElementById("left-second-line").classList.add("darken-div");
  document.getElementById("summary-amount-urgent").classList.add("color-white");
  document.getElementById("summary-urgent-span").classList.add("color-white");
  document
    .getElementById("second-line-seperateline-div")
    .classList.add("background-white");
  document.getElementById("date-deadline").classList.add("color-white");
  document.getElementById("summary-deadline-span").classList.add("color-white");
}

function delightSecondLine() {
  document.getElementById("left-second-line").classList.remove("darken-div");
  document
    .getElementById("summary-amount-urgent")
    .classList.remove("color-white");
  document
    .getElementById("summary-urgent-span")
    .classList.remove("color-white");
  document
    .getElementById("second-line-seperateline-div")
    .classList.remove("background-white");
  document.getElementById("date-deadline").classList.remove("color-white");
  document
    .getElementById("summary-deadline-span")
    .classList.remove("color-white");
}

// let currentLoggedUser = [];

function initUser() {
  loadCurrentUser();
}

async function loadCurrentUser() {
  try {
    currentUser = JSON.parse(await getItem("loggedUser"));

    console.log(currentUser);
  } catch (e) {
    console.error("Loading error:", e);
  }
}
