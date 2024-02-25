

function updateHTML() {
    filterTasksByCategory()
    renderToDos();
    renderInProgress()
    renderAwaitFeedback()
    renderDone()
}


let currentDraggedElement;


function startDragging(taskID){
   currentDraggedElement = taskID;
console.log("Ist:", currentDraggedElement)
}

function moveTo(category) {
    // Finde den Task in der aktuellen Kategorie
    let sourceCategory = null;
    let taskToMove = null;

    for (let categoryKey in contactData[0].tasks[0]) {
        let categoryTasks = contactData[0].tasks[0][categoryKey];
        let taskInCategory = categoryTasks.find(task => task.taskID === currentDraggedElement);

        if (taskInCategory) {
            sourceCategory = categoryKey;
            taskToMove = taskInCategory;
            break;
        }
    }

    // Wenn der Task gefunden wurde, entferne ihn aus der aktuellen Kategorie
    if (taskToMove) {
        contactData[0].tasks[0][sourceCategory] = contactData[0].tasks[0][sourceCategory].filter(task => task.taskID !== currentDraggedElement);

        // Füge den Task der gewünschten Kategorie hinzu
        contactData[0].tasks[0][category].push(taskToMove);
        console.log(`Task ${currentDraggedElement} wurde von ${sourceCategory} nach ${category} verschoben.`);

        updateHTML();
        console.log(`Task ${currentDraggedElement} wurde von ${sourceCategory} nach ${category} verschoben.`);
    } else {
        console.log(`Task ${currentDraggedElement} wurde nicht gefunden.`);
    }
    
}

// Beispielaufruf mit einer Zielkategorie
moveTo('done');








function allowDrop(event) {
    event.preventDefault();
}


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

function calculateFillWidth(toDoTask) {
    let doneSubtasksCount = getDoneSubtasksCount(toDoTask);
    let totalSubtasksCount = getTotalSubtasksCount(toDoTask);
    // Überprüfe, ob die Gesamtanzahl der Subtasks größer als 0 ist, um Division durch Null zu vermeiden
    if (totalSubtasksCount > 0) {
        // Berechne den Prozentsatz der erledigten Subtasks
        let fillPercentage = (doneSubtasksCount / totalSubtasksCount) * 100;
        // Begrenze den Prozentsatz auf das Intervall [0, 100]
        fillPercentage = Math.min(100, Math.max(0, fillPercentage));
        return `${fillPercentage}%`;
    } else {
        return '0%';
    }
}

function renderToDos() {
    let toDoTasks = contactData[0].tasks[0].toDo;
    document.getElementById('to-do-column').innerHTML ='';
    if (toDoTasks.length > 0) {


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
                    categoryBackgroundColor = "#1fd7c1";
                    break;
                default:
                    categoryBackgroundColor = "#FFFFFF";
            }

            let doneSubtasksCount = getDoneSubtasksCount(toDoTask);
            let totalSubtasksCount = getTotalSubtasksCount(toDoTask);
            let fillWidth = calculateFillWidth(toDoTask);

            // Hier wird die separate Template-Funktion direkt in die innerHTML-Eigenschaft eingefügt
         
            document.getElementById('to-do-column').innerHTML += `
            <div draggable="true" ondragstart="startDragging(${toDoTask.taskID})"  class="card-for-task cursor-pointer">
                <span class="task-category-span"  style="background-color: ${categoryBackgroundColor};">${toDoTask.category}
                </span>
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
                <div class="fuellung" style="width: ${fillWidth};">
                </div>
            </div>
            <div class="sub-span-subtask">
                <span class="subtask-number-class">${doneSubtasksCount}
                </span>
                <span class="slash">
                /</span>
                <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
            </div>
            &nbsp;
            <span class="subtasks-span">Subtasks</span>
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
            `;
        }
    }
    else {
        document.getElementById('to-do-column').innerHTML = `
    <div class="no-task cursor-pointer">
        <span class="no-task-span">No tasks To do</span>
    </div>
`;
    }
}

function getDoneSubtasksCount(toDoTask) {
    let doneSubtasksCount = 0;
    // Überprüfe, ob der ToDo-Task Subtasks hat
    if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
        // Iteriere über die Subtasks
        for (let i = 0; i < toDoTask.subtasks.length; i++) {
            let subtasks = toDoTask.subtasks[i];
            // Iteriere über die Subtask-Objekte
            for (const key in subtasks) {
                if (subtasks.hasOwnProperty(key) && subtasks[key] === 'done') {
                    doneSubtasksCount++;
                }
            }
        }
    }

    return doneSubtasksCount;
}

function getTotalSubtasksCount(toDoTask) {
    let totalSubtasksCount = 0;
    // Überprüfe, ob der ToDo-Task Subtasks hat
    if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
        // Iteriere über die Subtasks
        for (let i = 0; i < toDoTask.subtasks.length; i++) {
            let subtasks = toDoTask.subtasks[i];

            // Erhöhe den Gesamtanzahl-Zähler um die Anzahl der Subtasks in diesem Subtask-Objekt
            totalSubtasksCount += Object.keys(subtasks).length;
        }
    }
    return totalSubtasksCount;
}

// In Progress

function renderInProgress() {
    let inProgressTasks = contactData[0].tasks[0].inProgress;
    document.getElementById('in-progress-column').innerHTML ='';


    if (inProgressTasks.length > 0) {

        for (let i = 0; i < inProgressTasks.length; i++) {
            let inProgressTask = inProgressTasks[i];
            addInitialsToAssignedContacts(inProgressTask);
            let assignedContactsHTML = '';
            for (let j = 0; j < inProgressTask.assigned_contacts.length; j++) {
                assignedContactsHTML += `
                <div class="round-user-profile" style="background-color:${inProgressTask.assigned_contacts[j].avatarColor}">
                    <span class="assigned-testuser">${inProgressTask.assigned_contacts[j].ini_first}${inProgressTask.assigned_contacts[j].ini_name}</span>
                </div>
            `;
            }

            let priorityImagePath;
            switch (inProgressTask.prio) {
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

            switch (inProgressTask.category) {
                case "User Story":
                    categoryBackgroundColor = "#0038FF";
                    break;
                case "Technical Task":
                    categoryBackgroundColor = "#1fd7c1";
                    break;
                default:
                    categoryBackgroundColor = "#FFFFFF";
            }

            let doneSubtasksCount = getDoneSubtasksCount(inProgressTask);
            let totalSubtasksCount = getTotalSubtasksCount(inProgressTask);
            let fillWidth = calculateFillWidth(inProgressTask);
        
            document.getElementById('in-progress-column').innerHTML += `
            <div draggable="true" ondragstart="startDragging(${inProgressTask.taskID})" class="card-for-task cursor-pointer">
                <span class="task-category-span"  style="background-color: ${categoryBackgroundColor};">${inProgressTask.category}</span>
                <div class="task-board-div">
                    <span class="task-heading-span">${inProgressTask.title}</span>
                    <span class="task-description-span">${inProgressTask.description}</span>
                </div>
                <div class="board-subtask-div">
                    <div class="balken">
                        <div class="fuellung" style="width: ${fillWidth};"></div>
                    </div>
                    <div class="sub-span-subtask">
                        <span class="subtask-number-class">${doneSubtasksCount}</span>
                        <span class="slash">/</span>
                        <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
                    </div>
                    &nbsp;
                    <span class="subtasks-span">Subtasks</span>
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
        `;
        }
    }
    else {

        document.getElementById('in-progress-column').innerHTML = `
    <div class="no-task cursor-pointer">
        <span class="no-task-span">No tasks In progress</span>
    </div>
`;
    }



}

// Beispiel-Nutzung:
// renderInProgress(); // Rufen Sie diese Funktion auf, um die In-Progress-Aufgaben zu rendern

function renderAwaitFeedback() {
    let awaitFeedbackTasks = contactData[0].tasks[0].awaitFeedback;
    document.getElementById('await-feedback-column').innerHTML ='';


    if (awaitFeedbackTasks.length > 0) {

        for (let i = 0; i < awaitFeedbackTasks.length; i++) {
            let awaitFeedbackTask = awaitFeedbackTasks[i];
            addInitialsToAssignedContacts(awaitFeedbackTask);
            let assignedContactsHTML = '';
            for (let j = 0; j < awaitFeedbackTask.assigned_contacts.length; j++) {
                assignedContactsHTML += `
                    <div class="round-user-profile" style="background-color:${awaitFeedbackTask.assigned_contacts[j].avatarColor}">
                        <span class="assigned-testuser">${awaitFeedbackTask.assigned_contacts[j].ini_first}${awaitFeedbackTask.assigned_contacts[j].ini_name}</span>
                    </div>
                `;
            }

            let priorityImagePath;
            switch (awaitFeedbackTask.prio) {
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
            switch (awaitFeedbackTask.category) {
                case "User Story":
                    categoryBackgroundColor = "#0038FF";
                    break;
                case "Technical Task":
                    categoryBackgroundColor = "#1fd7c1";
                    break;
                default:
                    categoryBackgroundColor = "#FFFFFF";
            }

            let doneSubtasksCount = getDoneSubtasksCount(awaitFeedbackTask);
            let totalSubtasksCount = getTotalSubtasksCount(awaitFeedbackTask);
            let fillWidth = calculateFillWidth(awaitFeedbackTask);
         
            document.getElementById('await-feedback-column').innerHTML += `
                <div draggable="true" ondragstart="startDragging(${awaitFeedbackTask.taskID})" class="card-for-task cursor-pointer">
                    <span class="task-category-span" style="background-color: ${categoryBackgroundColor};">${awaitFeedbackTask.category}</span>
                    <div class="task-board-div">
                        <span class="task-heading-span">${awaitFeedbackTask.title}</span>
                        <span class="task-description-span">${awaitFeedbackTask.description}</span>
                    </div>
                    <div class="board-subtask-div">
                        <div class="balken">
                            <div class="fuellung" style="width: ${fillWidth};"></div>
                        </div>
                        <div class="sub-span-subtask">
                            <span class="subtask-number-class">${doneSubtasksCount}</span>
                            <span class="slash">/</span>
                            <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
                        </div>
                        &nbsp;
                        <span class="subtasks-span">Subtasks</span>
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
            `;
        }
    }

    else {

        document.getElementById('await-feedback-column').innerHTML = `
            <div class="no-task cursor-pointer">
                <span class="no-task-span">No tasks Await feedback</span>
            </div>
        `;
    }



}

function renderDone() {
    let doneTasks = contactData[0].tasks[0].done;
    document.getElementById('done-column').innerHTML = '';


    if (doneTasks.length > 0) {
        for (let i = 0; i < doneTasks.length; i++) {
            let doneTask = doneTasks[i];
            addInitialsToAssignedContacts(doneTask);
            let assignedContactsHTML = '';
            for (let j = 0; j < doneTask.assigned_contacts.length; j++) {
                assignedContactsHTML += `
                    <div class="round-user-profile" style="background-color:${doneTask.assigned_contacts[j].avatarColor}">
                        <span class="assigned-testuser">${doneTask.assigned_contacts[j].ini_first}${doneTask.assigned_contacts[j].ini_name}</span>
                    </div>
                `;
            }

            let priorityImagePath;
            switch (doneTask.prio) {
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
            switch (doneTask.category) {
                case "User Story":
                    categoryBackgroundColor = "#0038FF";
                    break;
                case "Technical Task":
                    categoryBackgroundColor = "#1fd7c1";
                    break;
                default:
                    categoryBackgroundColor = "#FFFFFF";
            }

            let doneSubtasksCount = getDoneSubtasksCount(doneTask);
            let totalSubtasksCount = getTotalSubtasksCount(doneTask);
            let fillWidth = calculateFillWidth(doneTask);
            document.getElementById('done-column').innerHTML += `
                <div draggable="true" ondragstart="startDragging(${doneTask.taskID})" class="card-for-task cursor-pointer">
                    <span class="task-category-span" style="background-color: ${categoryBackgroundColor};">${doneTask.category}</span>
                    <div class="task-board-div">
                        <span class="task-heading-span">${doneTask.title}</span>
                        <span class="task-description-span">${doneTask.description}</span>
                    </div>
                    <div class="board-subtask-div">
                        <div class="balken">
                            <div class="fuellung" style="width: ${fillWidth};"></div>
                        </div>
                        <div class="sub-span-subtask">
                            <span class="subtask-number-class">${doneSubtasksCount}</span>
                            <span class="slash">/</span>
                            <span class="total-numbers-subtask-class">${totalSubtasksCount}</span>
                        </div>
                        &nbsp;
                        <span class="subtasks-span">Subtasks</span>
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
            `;
        }
    }

    else {

        document.getElementById('done-column').innerHTML = `
        <div class="no-task cursor-pointer">
            <span class="no-task-span">No tasks Done</span>
        </div>
    `;
    }



}

function focuSearchInput(){
    let searchFocus = document.getElementById('board-input-field')
    searchFocus.focus()

}










/*

function filterContacts() {
    addNameInitialToContacts(contactData);
    addInitialsOfFirstNames(contactData);

    let search = document.getElementById('assign-search-input').value;
    search = search.toLowerCase();
    let searchedContactContainer = document.getElementById('drop-down-content');
    searchedContactContainer.innerHTML = '';

    console.log('Search value:', search);

    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let searchedContact = contactData[0].contacts[i];
        if (searchedContact['first'].toLowerCase().includes(search) || searchedContact['name'].toLowerCase().includes(search)) {
            searchedContactContainer.innerHTML += `
                <label class="f-btw" onclick="selectOption(${i})">
                    <div class="dropdown-span-block">
                        <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${searchedContact.avatarColor};">${searchedContact.ini_first}${searchedContact.ini_name}</span>
                        <span>${searchedContact.first} ${searchedContact.name}</span>
                    </div>
                    <input type="checkbox">
                </label>
            `;
        }
        
    }
}

*/

