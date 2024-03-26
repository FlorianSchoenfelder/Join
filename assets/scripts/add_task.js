let DROP_DOWN_OPEN = false;

function addNameInitialToContacts(contactData) {   //check
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let name = contactData[0].contacts[i].name;
        let initials = name.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_name = initials;
    }
}

function addInitialsOfFirstNames(contactData) {   //check
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let first = contactData[0].contacts[i].first;
        let inits = first.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_first = inits;
    }
}

addNameInitialToContacts(contactData); //check
addInitialsOfFirstNames(contactData);  //check

function renderDropDown() {   //HTML auslagern, sonst kurz genug
    document.getElementById('drop-down-content').innerHTML = '';
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let singleContact = contactData[0].contacts[i];
        document.getElementById('drop-down-content').innerHTML += `
            <label class="f-btw" >
                <div class="dropdown-span-block">
                    <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${singleContact.avatarColor};">${singleContact.ini_first}${singleContact.ini_name}</span>
                    <span>${singleContact.first} ${singleContact.name}</span>
                </div>
                <input type="checkbox" data-contact-id="${i}">
            </label>
        `;
    }
}

document.getElementById('add-task-title-input').addEventListener('input', checkRequiredFields);  //check
document.getElementById('due-date-input').addEventListener('input', checkRequiredFields);   //check
document.getElementById('task-category-select').addEventListener('change', checkRequiredFields);  //check


document.addEventListener('DOMContentLoaded', function () {
    checkRequiredFields();
});  //check

function checkRequiredFields() {    //check
    let titleInput = document.getElementById('add-task-title-input');
    let dueDateInput = document.getElementById('due-date-input');
    let categorySelect = document.getElementById('task-category-select');
    let createTaskButton = document.getElementById('create-task-button');
    if (titleInput.checkValidity() && titleInput.value.trim() !== '' &&
        dueDateInput.checkValidity() && dueDateInput.value.trim() !== '' &&
        categorySelect.checkValidity() && categorySelect.value.trim() !== 'Select Task Category') {
        createTaskButton.removeAttribute('disabled');
    } 
    else {
        createTaskButton.setAttribute('disabled', 'true');
    }
}

function filterContacts() {    //HTML auslagern    dann 14 Zeilen lang
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

function toggleDropDown() {   //HTML auslagern 
    if (DROP_DOWN_OPEN == false) {
        document.getElementById('assigned-dropdown-div').innerHTML = '';
        document.getElementById('assigned-dropdown-div').innerHTML = `
<input onkeyup="filterContacts()" id="assign-search-input" type="text">
<img id="turned-drop-down-image" src="assets/img/add_task/turned_arrow_drop_down.svg">
`
        renderDropDown();
        DROP_DOWN_OPEN = true;
        document.getElementById('drop-down-content').classList.remove('d-none')
        focusInputField();
    }
    else {   //else in separate Funktion auslagern  HTML in template auslagern
        document.getElementById('assigned-dropdown-div').innerHTML = '';
        document.getElementById('assigned-dropdown-div').innerHTML = `
    <span class="add-task-font-styling">Select contacts to assign</span>
    <img class="hover-lg" id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
    `
        document.getElementById('drop-down-content').classList.add('d-none')
        DROP_DOWN_OPEN = false;
    }
}

function focusInputField() { //kurz genug  Namen ändern
    let inputField = document.getElementById('assign-search-input');
    inputField.focus();
    inputField.select()
}

function focusDueDate() { //check
    let dateInput = document.getElementById('div-dateformchange')
    dateInput.focus();
    dateInput.focus();
}

let selectedPriorityIndex = null;   //Zweige in separate Funktionen packen
let prioButtons = document.querySelectorAll('.priority-button');
prioButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
        let image = button.querySelector('img');
        let selectedButton = document.querySelector('.selected');
        if (selectedButton && selectedButton !== button) {
            selectedButton.classList.remove('selected');
            selectedButton.style.backgroundColor = ''
            let selectedImage = selectedButton.querySelector('img');
            resetImage(selectedImage, selectedButton.id);
        }
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            button.style.backgroundColor = '';
            resetImage(image, button.id);
            selectedPriorityIndex = null; 
        } else {
            toggleImages(image, button.id);
            button.style.backgroundColor = getBackgroundColor(index);
            button.classList.add('selected');
            selectedPriorityIndex = index;
        }
    });
});

function toggleImages(image, buttonId) {  //check
    switch (buttonId) {
        case 'urgent-button':
            image.src = image.src.includes('urgent-red.svg') ? './assets/img/add_task/urgent.svg' : './assets/img/add_task/urgent-red.svg';
            break;
        case 'medium-button':
            image.src = image.src.includes('equity_yellow.svg') ? './assets/img/add_task/equity_white.svg' : './assets/img/add_task/equity_yellow.svg';
            break;
        case 'low-button':
            image.src = image.src.includes('low-green.svg') ? './assets/img/add_task/low.svg' : './assets/img/add_task/low-green.svg';
            break;
    }
}

function getBackgroundColor(index) {  //check
    switch (index) {
        case 0:
            return 'red';
        case 1:
            return 'yellow';
        case 2:
            return 'green';
        default:
            return '';
    }
}

function resetImage(image, buttonId) {   //check
    switch (buttonId) {
        case 'urgent-button':
            image.src = './assets/img/add_task/urgent-red.svg';
            break;
        case 'medium-button':
            image.src = './assets/img/add_task/equity_yellow.svg';
            break;
        case 'low-button':
            image.src = './assets/img/add_task/low-green.svg';
            break;
    }
}

function addNewSubtask() {   //gute Frage ?
    let subtaskInput = document.getElementById('subtask-input-field');
    let subtaskValue = subtaskInput.value.trim();
    if (subtaskValue !== '') {
        let createdSubtasksDiv = document.getElementById('created-subtasks');
        if (createdSubtasksDiv.children.length >= 2) {
            createdSubtasksDiv.removeChild(createdSubtasksDiv.firstChild);
        }
        let newSubtask = document.createElement('div');
        newSubtask.className = 'created-subtask';
        let subtaskText = document.createElement('span');
        subtaskText.textContent = subtaskValue;
        newSubtask.appendChild(subtaskText);
        let deleteButton = document.createElement('span');
        deleteButton.className = 'delete-subtask';
        deleteButton.textContent = 'x';
        deleteButton.onclick = function () {
            createdSubtasksDiv.removeChild(newSubtask);
        };
        newSubtask.appendChild(deleteButton);
        createdSubtasksDiv.appendChild(newSubtask);
        subtaskInput.value = '';
    }
}

function handleFormSubmit(event) {  //check
    if (event.submitter && event.submitter.id === 'create-task-button') {
        addTask();
        deleteLastTask();
    } else {
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function () {   //check
    let form = document.getElementById('add-task-form');
    form.addEventListener('submit', handleFormSubmit);
    let prioButtons = document.querySelectorAll('.priority-button');
    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.preventDefault();
            handleFormSubmit(event);
        });
    });
});

function addTask() {   //gute Frage ?
    let newTitle = document.getElementById("add-task-title-input").value;
    let newDescription = document.getElementById("add-task-description-textarea").value;
    let subtasks = getSubtasks();
    let dueDateInput = document.getElementById("due-date-input");
    let dueDateString = dueDateInput.value;
    contactData[0].tasks[0]['toDo'].forEach(task => {
        task.prio = selectedPriorityIndex;
    });
    let selectedCategory = document.getElementById("task-category-select");
    let newCategory = selectedCategory.options[selectedCategory.selectedIndex].value;
    let selectedContactIds = getSelectedContactIds();
    let assignedContacts = selectedContactIds.map(id => contactData[0].contacts[id]);
    let maxTaskID = Math.max(...contactData[0].tasks[0]['toDo'].map(task => task.taskID), 0);
    let newTask = {
        "taskID": maxTaskID + 1,
        "title": newTitle,
        "description": newDescription,
        "assigned_contacts": assignedContacts,
        "dueDate": dueDateString,
        "category": newCategory,
        "subtasks": subtasks,
        "prio": selectedPriorityIndex,
    };
    contactData[0].tasks[0]['toDo'].push(newTask);
    saveTasksToLocalStorage();
    console.log("New Task Data:", newTask);
    clearForm();      
    let succButton = document.getElementById('success-button');
    succButton.classList.add('visible');
    setTimeout(function() {
        succButton.classList.remove('visible');
      }, 3000); 
      disableCreateTaskButton() 
}

function getSelectedContactIds() { //check
    let checkboxes = document.querySelectorAll('#drop-down-content input[type="checkbox"]');
    let selectedIds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute('data-contact-id')));
    return selectedIds;    
}

function deleteLastTask() {  //check
    if (contactData[0].tasks[0]['toDo'].length > 0) {  
        contactData[0].tasks[0]['toDo'].pop(); 
        console.log("Last Task Deleted:", contactData[0].tasks[0]['toDo']); 
    } 
}

function getSubtasks() {   //check
    let createdSubtasksDiv = document.getElementById('created-subtasks');
    let subtaskElements = createdSubtasksDiv.getElementsByClassName('created-subtask');
    let subtasks = Array.from(subtaskElements).map(element => {
        let textContent = element.textContent.trim();
        return textContent.substring(0, textContent.length - 1); // Entfernt das 'x'
    });
    return subtasks;
}

function clearForm() {   // HTML auslagern ; Funktion zergliedern in kurze Funktionen
    document.getElementById('add-task-title-input').value = '';
    document.getElementById('add-task-description-textarea').value = '';
    document.getElementById('assigned-dropdown-div').innerHTML = `
    <span class="add-task-font-styling">Select contacts to assign</span><img id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
    `;
    document.getElementById('drop-down-content').innerHTML = '';
    document.getElementById('due-date-input').value = '';
    document.querySelectorAll('.priority-button').forEach(button => {
        button.classList.remove('selected');
        button.style.backgroundColor = '';
        let image = button.querySelector('img');
        resetImage(image, button.id);
    });
    document.getElementById('task-category-select').selectedIndex = 0;
    document.getElementById('subtask-input-field').value = '';
    document.getElementById('created-subtasks').innerHTML = '';
    DROP_DOWN_OPEN = false;
    disableCreateTaskButton()
}

function disableCreateTaskButton() { //check
    let createTaskButton = document.getElementById("create-task-button");
    createTaskButton.disabled = true;
}

function saveTasksToLocalStorage() { //check
    localStorage.setItem('contactData', JSON.stringify(contactData));
 }
 
 function loadTasksFromLocalStorage() { //check
    let storedData = localStorage.getItem('contactData');
    if (storedData) {
        contactData = JSON.parse(storedData);
    }
 }

document.getElementById('clear-button').addEventListener('click', clearForm);  //check