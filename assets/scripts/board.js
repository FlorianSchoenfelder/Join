
function updateHTML(){
    includeHTML();
    filterTasksByCategory();
    renderToDos();
}



let currentDraggedElement;


function filterTasksByCategory(category) {
    let tasks = contactData[0].tasks[0]; // Annahme: Es gibt nur einen Benutzer in Ihrem contactData-Array

    let filteredTasks = {
        'toDo': tasks.toDo.filter(task => task.category === category),
        'inProgress': tasks.inProgress.filter(task => task.category === category),
        'awaitFeedback': tasks.awaitFeedback.filter(task => task.category === category),
        'done': tasks.done.filter(task => task.category === category)
    };

    return filteredTasks;
}

// Beispiel-Nutzung:
let filteredOpenTasks = filterTasksByCategory('User Story');
console.log(filteredOpenTasks.toDo); // Hier erhalten Sie alle offenen Aufgaben mit der angegebenen Kategorie
console.log(filteredOpenTasks.inProgress); // Hier erhalten Sie alle Aufgaben im Fortschritt mit der angegebenen Kategorie
console.log(filteredOpenTasks.awaitFeedback); // Hier erhalten Sie alle Aufgaben im Warten auf Feedback mit der angegebenen Kategorie
console.log(filteredOpenTasks.done); // Hier erhalten Sie alle abgeschlossenen Aufgaben mit der angegebenen Kategorie



function addInitialsToAssignedContacts(toDoTask) {
    for (let i = 0; i < toDoTask.assigned_contacts.length; i++) {
        let contact = toDoTask.assigned_contacts[i];
        let initialsFirst = contact.first.substring(0, 1).toUpperCase();
        let initialsName = contact.name.substring(0, 1).toUpperCase();
        contact.ini_first = initialsFirst;
        contact.ini_name = initialsName;
    }
}



function  renderToDos(){
    let toDoTasks = contactData[0].tasks[0].toDo;

    for (let i = 0; i < toDoTasks.length; i++) {
        let toDoTask = toDoTasks[i];

        addInitialsToAssignedContacts(toDoTask);

        let assignedContactsHTML = '';

        for (let j = 0; j < toDoTask.assigned_contacts.length; j++) {

            assignedContactsHTML += `
            
            <div class="round-user-profile" style="background-color:${toDoTask.assigned_contacts[j].avatarColor}">
            <span class="assigned-testuser">${toDoTask.assigned_contacts[j].ini_first}${toDoTask.assigned_contacts[j].ini_name}</span>
            </div>
            `;
        }


        let priorityImagePath;
        switch (toDoTask.prio) {
            case 0:
                priorityImagePath = "/assets/img/board/prio_high.svg";
                break;
            case 1:
                priorityImagePath = "/assets/img/board/prio_equation.svg";
                break;
            case 2:
                priorityImagePath = "/assets/img/board/prio_low.svg";
                break;
            default:
                priorityImagePath = "/assets/img/board/prio_equation.svg";
        }

        let categoryBackgroundColor;
        switch (toDoTask.category) {
            case "User Story":
                categoryBackgroundColor = "#0038FF";
                break;
            case "Technical Task":
                categoryBackgroundColor = "#FFA800";
                break;
            default:
                categoryBackgroundColor = "#FFFFFF";

        }

        // Hier wird die separate Template-Funktion direkt in die innerHTML-Eigenschaft eingefügt
        document.getElementById('to-do-column').innerHTML += `
        <div draggable="true" class="card-for-task cursor-pointer">
            <span class="task-category-span">${toDoTask.category}</span>
            <div class="task-board-div">
                <span class="task-heading-span">
                         ${toDoTask.title}
                </span>
                <span class="task-description-span">
                         ${toDoTask.description}
                </span>
            </div>
        <div class=board-subtask-div>
        <div class="balken">
        <div class="fuellung">
        </div> 
        </div>
        <div class="sub-span-subtask">
        <span class="subtask-number-class">Done ST</span>
        <span class="slash">/</span>
        <span class="total-numbers-subtask-class">${toDoTask.subtasks.length}</span>
        </div>
        &nbsp;
        </div>
        <div class="assigned-tasks-and-prio-div">
        <div id="assigned-users" class="assigned-users-div">
        ${assignedContactsHTML}
        </div>
        <div class="priority-div-taskcard">
        <img class="priority-symbol-taskcard" src="${priorityImagePath}">
        </div>
        </div>
        </div>
        `
    }


}















// tasks = [

//     {
//         "id": 1,
//         "category": "user_story",
//         "title": "User",
//         "assignedTo": [0, 5, 6],
//         "prio": 1,                            //urgent = 0; mid = 1; low = 2
//         "status": "in_progress"
//     },

//     {
//         "id": 2,
//         "category": "technical_task",
//         "subtasks": {
//             0                           //hier weiterarbeiten
//         },
//         "title": "User",
//         "description" : "testdescription",
//         "due_Date": 23042023,
//         "assigned_To": [0, 5, 6],
//         "prio": 1,                             //urgent = 0; mid = 1; low = 2
//         "status": "to_do"
//     }


// ];


// function init() {
//     renderBoardTasks()
// }



// function renderBoardTasks() {

//     let progressCat = tasks.filter(t => t['status'] == 'in_progress');
//     document.getElementById('in-progress-column').innerHTML = '';

//     for (let index = 0; index < progressCat.length; index++) {
//         const element = progressCat[index];
//         document.getElementById('in-progress-column').innerHTML += `
        

        
//         `
//     }

//     let todoCat = tasks.filter(t => t['status'] == 'to_do');
//     document.getElementById('to-do-column').innerHTML = '';

//     for (let index = 0; index < todoCat.length; index++) {
//         const element = todoCat[index];
//         document.getElementById('to-do-column').innerHTML += `
//     <div>to do column</div>
//     `

//     }



// }
