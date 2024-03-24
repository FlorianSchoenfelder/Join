function additionalFunctionsOnload() {
  //functions onload
  greetUser();
  countToDos();
  countDoneTasks();
  countInProgressTasks();
  countAwaitingFeedbackTasks();
  countAllTasks();
  countPriorityZeroTasks();
  findClosestDueDatePrioZero();
}

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

function greetUser() {
  let currentDate = new Date();
  let currentHour = currentDate.getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Guten Morgen";
  } else if (currentHour < 18) {
    greeting = "Guten Tag";
  } else {
    greeting = "Guten Abend";
  }
  // let userName = contactData[0].userName;
  // let userFirstName = contactData[0].userFirstName;
  document.getElementById("right-lower-main").innerHTML = "";
  document.getElementById("right-lower-main").innerHTML = `

  <span id="greeting-with-daytime">${greeting},</span>
  <span id="greeting-username">  
  
  ${currentUser}
  </span>
  
  `;
}

function countToDos() {
  let toDoTasks = contactData[0].tasks[0].toDo;
  let numberOfToDos = toDoTasks.length;
  document.getElementById("summary-to-do-div").innerHTML = "";
  document.getElementById("summary-to-do-div").innerHTML = `
  <span id="amount-of-to-do">${numberOfToDos}</span>
  <span id="to-do-span">To-do</span>
  `;
}

function countDoneTasks() {
  let doneTasks = contactData[0].tasks[0].done;
  let numberOfDoneTasks = doneTasks.length;
  document.getElementById("summary-done-div").innerHTML = "";
  document.getElementById("summary-done-div").innerHTML = `
  <span id="summary-amount-done">${numberOfDoneTasks}</span>
  <span id="summary-done-span">Done</span>
  `;
}

function countInProgressTasks() {
  let inProgressTasks = contactData[0].tasks[0].inProgress;
  let numberOfInProgressTasks = inProgressTasks.length;

  document.getElementById("third-line-middle-div").innerHTML = "";
  document.getElementById("third-line-middle-div").innerHTML = `
  
  <span class="third-line-number-style" id="summary-amount-progress">${numberOfInProgressTasks}</span>
  <span class="third-line-span-style" id="summary-task-progress-span">Tasks in Progress</span>
  `;
}

function countAwaitingFeedbackTasks() {
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback;
  let numberOfAwaitingFeedbackTasks = awaitFeedbackTasks.length;

  document.getElementById("third-line-right-div").innerHTML = "";
  document.getElementById("third-line-right-div").innerHTML = `
  <span class="third-line-number-style" id="summary-awaiting-feedback-number">${numberOfAwaitingFeedbackTasks}</span>
  <span class="third-line-span-style" id="summary-awaiting-feedback-span">Awaiting Feedback</span>
  `;
}

function countAllTasks() {
  let toDoTasks = contactData[0].tasks[0].toDo;
  let inProgressTasks = contactData[0].tasks[0].inProgress;
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback;
  let doneTasks = contactData[0].tasks[0].done;

  let totalTasks =
    toDoTasks.length +
    inProgressTasks.length +
    awaitFeedbackTasks.length +
    doneTasks.length;

  document.getElementById("third-line-left-div").innerHTML = "";
  document.getElementById("third-line-left-div").innerHTML = `
  <span class="third-line-number-style" id="summary-amount-tasks">${totalTasks}</span>
  <span class="third-line-span-style" id="summary-number-tasks-span">Tasks in Board</span>
  `;
}

function countPriorityZeroTasks() {
  let toDoTasks = contactData[0].tasks[0].toDo.filter(
    (task) => task.prio === 0
  );
  let inProgressTasks = contactData[0].tasks[0].inProgress.filter(
    (task) => task.prio === 0
  );
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback.filter(
    (task) => task.prio === 0
  );
  let doneTasks = contactData[0].tasks[0].done.filter(
    (task) => task.prio === 0
  );

  let totalPriorityZeroTasks =
    toDoTasks.length +
    inProgressTasks.length +
    awaitFeedbackTasks.length +
    doneTasks.length;

  document.getElementById("summary-urgent-right").innerHTML = "";
  document.getElementById("summary-urgent-right").innerHTML = `
  <span id="summary-amount-urgent">${totalPriorityZeroTasks}</span>
  <span id="summary-urgent-span">Urgent</span>
  `;
}

function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
}

function findClosestDueDatePrioZero() {
  let toDoTasks = contactData[0].tasks[0].toDo.filter(
    (task) => task.prio === 0
  );
  let inProgressTasks = contactData[0].tasks[0].inProgress.filter(
    (task) => task.prio === 0
  );
  let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback.filter(
    (task) => task.prio === 0
  );
  let doneTasks = contactData[0].tasks[0].done.filter(
    (task) => task.prio === 0
  );

  let allPrioZeroTasks = [
    ...toDoTasks,
    ...inProgressTasks,
    ...awaitFeedbackTasks,
    ...doneTasks,
  ];

  let currentDate = new Date();
  let closestDueDate = null;
  let closestDiff = Infinity;

  allPrioZeroTasks.forEach((task) => {
    let dueDate = new Date(task.dueDate);
    let timeDiff = Math.abs(dueDate - currentDate);

    if (timeDiff < closestDiff) {
      closestDiff = timeDiff;
      closestDueDate = dueDate;
    }
  });

  document.getElementById("second-line-right-div").innerHTML = "";
  document.getElementById("second-line-right-div").innerHTML = `
  <span id="date-deadline">${formatDate(closestDueDate)}</span>
  <span id="summary-deadline-span">Upcoming Deadline</span>
  `;
}

let currentUser = [];

async function initUser() {
  await includeHTML();
  await getUser();
  initNavbarHighlight();
  getUserLogo();
  if (document.getElementById("right-lower-main") !== null) {
    greetUser();
  }
}

async function getUser() {
  try {
    let currentUserData = JSON.parse(await getItem('currentUser'));
    console.log(currentUserData.userName);
    currentUser.push(currentUserData.userName);
  } catch(e) {
    console.error('Loading error:', e);
  }
}

function getUserLogo() {
  getInitials();
  if (currentUser != 'Guest') {
    document.getElementById("header-userprofile").innerHTML = /*html*/`
      <p>${initials}</p>
    `;
  }else {
    document.getElementById("header-userprofile").innerHTML = /*html*/`
      <p>${initials}</p>
    `;
  }
}

function getInitials() {
  if (currentUser[0].includes(' ')) {
    initials = currentUser[0].split(' ').map(word => word.charAt(0)).join('');
} else {
    initials = currentUser[0].toUpperCase().slice(0, 2);
}
console.log(initials);
}


async function clearUser() {
  await clearItem('currentUser');
  window.open("index.html", "_self");
}

function initNavbarHighlight() {
  let whereIAM = window.location.pathname;

  switch (whereIAM) {
    case "/Join/summary.html":
      document.getElementById("summary-list-element").classList.add("active");
      break;
    case "/summary.html":
      document.getElementById("summary-list-element").classList.add("active");
      additionalFunctionsOnload();
      break;
    case "/Join/add_task_n_include.html":
      document.getElementById("addTask-list-element").classList.add("active");
      break;
    case "/add_task_n_include.html":
      document.getElementById("addTask-list-element").classList.add("active");
      break;
    case "/Join/board.html":
      document.getElementById("board-list-element").classList.add("active");
      updateHTML()
      break;
    case "/board.html":
      document.getElementById("board-list-element").classList.add("active");
      break;
    case "/Join/contacts.html":
      document.getElementById("contacts-list-element").classList.add("active");
      break;
    case "/contacts.html":
      document.getElementById("contacts-list-element").classList.add("active");
      break;

    case "/Join/privacyPolicy.html":
      document.getElementById("privacy-list-element").classList.add("active");
      break;
    case "/privacyPolicy.html":
      document.getElementById("privacy-list-element").classList.add("active");
      break;
    case "/Join/legalNotice.html":
      document
        .getElementById("legalNotice-list-element")
        .classList.add("active");
      break;
    case "/legalNotice.html":
      document
        .getElementById("legalNotice-list-element")
        .classList.add("active");
      break;

    default:
      break;
  }
  console.log(whereIAM);
}

function getGreeting() {
  if (window.location.pathname == "/summary.html") {
    let hours = new Date().getHours();
    // document.getElementById("right-lower-main").style.display = "block";
    switch (
      true // Abfrage ob es stimmt das hours kleiner als X-Case ist.
    ) {
      case hours <= 4:
        document.getElementById("right-lower-main").innerHTML += "Good night";
        break;
      case hours <= 12:
        document.getElementById("right-lower-main").innerHTML += "Good Morning";
        break;
      case hours <= 18:
        document.getElementById("right-lower-main").innerHTML +=
          "Good Afternoon";
        break;
      case hours <= 23:
        document.getElementById("right-lower-main").innerHTML += "Good Evening";
        break;
      default:
        break;
    }
  }
}
