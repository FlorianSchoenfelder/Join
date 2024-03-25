
let DROP_DOWN_OPEN = false;


function addNameInitialToContacts(contactData) {
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let name = contactData[0].contacts[i].name;
        let initials = name.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_name = initials;
    }
}

function addInitialsOfFirstNames(contactData) {
    for (let i = 0; i < contactData[0].contacts.length; i++) {
        let first = contactData[0].contacts[i].first;
        let inits = first.substring(0, 1).toUpperCase();
        contactData[0].contacts[i].ini_first = inits;
    }
}

// Die aktualisierten Funktionen aufrufen
addNameInitialToContacts(contactData);
addInitialsOfFirstNames(contactData);


function renderDropDown() {
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


// Fügen Sie Event Listener für Eingabe- und Änderungsereignisse hinzu
document.getElementById('add-task-title-input').addEventListener('input', checkRequiredFields);
document.getElementById('due-date-input').addEventListener('input', checkRequiredFields);
document.getElementById('task-category-select').addEventListener('change', checkRequiredFields);

// Fügen Sie auch einen Event Listener für das Laden der Seite hinzu, um den Button zu initialisieren
document.addEventListener('DOMContentLoaded', function () {
    checkRequiredFields();
});

// Aktualisierte checkRequiredFields-Funktion
function checkRequiredFields() {
    let titleInput = document.getElementById('add-task-title-input');
    let dueDateInput = document.getElementById('due-date-input');
    let categorySelect = document.getElementById('task-category-select');
    let createTaskButton = document.getElementById('create-task-button');

    // Überprüfen Sie, ob alle Felder gültig sind und nicht leer sind
    if (titleInput.checkValidity() && titleInput.value.trim() !== '' &&
        dueDateInput.checkValidity() && dueDateInput.value.trim() !== '' &&
        categorySelect.checkValidity() && categorySelect.value.trim() !== 'Select Task Category') {
        createTaskButton.removeAttribute('disabled');
    } else {
        createTaskButton.setAttribute('disabled', 'true');
    }
}

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




function toggleDropDown() {

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

    else {

        document.getElementById('assigned-dropdown-div').innerHTML = '';
        document.getElementById('assigned-dropdown-div').innerHTML = `
    <span class="add-task-font-styling">Select contacts to assign</span>
    <img class="hover-lg" id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
    `
        document.getElementById('drop-down-content').classList.add('d-none')

        DROP_DOWN_OPEN = false;
    }
}

function focusInputField() {
    let inputField = document.getElementById('assign-search-input');
    inputField.focus();
    inputField.select()
}
// 



function focusDueDate() {
    let dateInput = document.getElementById('div-dateformchange')
    dateInput.focus();
    dateInput.focus();
}




// prio hover neu

let selectedPriorityIndex = null;

let prioButtons = document.querySelectorAll('.priority-button');

prioButtons.forEach(function (button, index) {
    button.addEventListener('click', function () {
    
        // Finde das Image-Element innerhalb des Buttons
        let image = button.querySelector('img');

        // Deselektiere den vorher ausgewählten Button, wenn er unterschiedlich zum aktuellen ist
        let selectedButton = document.querySelector('.selected');
        if (selectedButton && selectedButton !== button) {
            selectedButton.classList.remove('selected');
            selectedButton.style.backgroundColor = '';
            // Setze das Bild des vorher ausgewählten Buttons auf das ursprüngliche Bild zurück
            let selectedImage = selectedButton.querySelector('img');
            resetImage(selectedImage, selectedButton.id);
        }

        // Wenn der gleiche Button erneut geklickt wird, setze den ursprünglichen Zustand zurück
        if (button.classList.contains('selected')) {
            button.classList.remove('selected');
            button.style.backgroundColor = '';
            resetImage(image, button.id);
            selectedPriorityIndex = null; // Zurücksetzen auf null
        } else {
            // Toggle zwischen den Bildern entsprechend des Button-Ids
            toggleImages(image, button.id);

            // Setze die Hintergrundfarbe entsprechend des Index
            button.style.backgroundColor = getBackgroundColor(index);

            // Markiere den ausgewählten Button
            button.classList.add('selected');

            // Setze den ausgewählten Index
            selectedPriorityIndex = index;
        }
    });
});




function toggleImages(image, buttonId) {
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

function getBackgroundColor(index) {
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

function resetImage(image, buttonId) {
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




function addNewSubtask() {
    // Get input field value
    let subtaskInput = document.getElementById('subtask-input-field');
    let subtaskValue = subtaskInput.value.trim();

    // Check if the input is not empty
    if (subtaskValue !== '') {
        // Get the container for created subtasks
        let createdSubtasksDiv = document.getElementById('created-subtasks');

        // Check if there are already two tasks, remove the oldest one
        if (createdSubtasksDiv.children.length >= 2) {
            createdSubtasksDiv.removeChild(createdSubtasksDiv.firstChild);
        }

        // Create a new task element
        let newSubtask = document.createElement('div');
        newSubtask.className = 'created-subtask';

        // Task text
        let subtaskText = document.createElement('span');
        subtaskText.textContent = subtaskValue;
        newSubtask.appendChild(subtaskText);

        // Delete button
        let deleteButton = document.createElement('span');
        deleteButton.className = 'delete-subtask';
        deleteButton.textContent = 'x';
        deleteButton.onclick = function () {
            createdSubtasksDiv.removeChild(newSubtask);
        };
        newSubtask.appendChild(deleteButton);

        // Append the new task to the container
        createdSubtasksDiv.appendChild(newSubtask);

        // Clear the input field
        subtaskInput.value = '';
    }
}




function handleFormSubmit(event) {
    // Überprüfe, ob das auslösende Element der "Create Task" Button ist
    if (event.submitter && event.submitter.id === 'create-task-button') {
        // Füge hier Code hinzu, um die Prio-Buttons zu handhaben (falls erforderlich)
        addTask();
        // Lösche den letzten Task nachdem addTask ausgeführt wurde
        deleteLastTask();
    } else {
        // Verhindere das Standardverhalten (Absenden des Formulars)
        event.preventDefault();
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Event-Listener für das Formular hinzufügen
    let form = document.getElementById('add-task-form');
    form.addEventListener('submit', handleFormSubmit);

    // Event-Listener für Prio-Buttons hinzufügen
    let prioButtons = document.querySelectorAll('.priority-button');
    prioButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            // Verhindere das Standardverhalten (Absenden des Formulars)
            event.preventDefault();
            // Rufe die Funktion auf, die den Formularsubmit behandelt
            handleFormSubmit(event);
        });
    });


});


//
function addTask() {
    // Titel aus dem Inputfeld abrufen
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

    // IDs der ausgewählten Kontakte aus dem Dropdown-Menü abrufen
    let selectedContactIds = getSelectedContactIds();

    // Die ausgewählten Kontakte aus dem JSON-Datenobjekt abrufen
    let assignedContacts = selectedContactIds.map(id => contactData[0].contacts[id]);



    // Neuen Task erstellen

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
    // Hier können Sie weitere Aktionen durchführen, z.B. die Anzeige aktualisieren
  
}

function getSelectedContactIds() {
    // Get all checkboxes in the dropdown content
    let checkboxes = document.querySelectorAll('#drop-down-content input[type="checkbox"]');
    
    // Filter out only the checked checkboxes and get their corresponding index
    let selectedIds = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => parseInt(checkbox.getAttribute('data-contact-id')));

    return selectedIds;
    
}


function deleteLastTask() {
    // Überprüfen, ob es überhaupt Tasks gibt
    if (contactData[0].tasks[0]['toDo'].length > 0) {
        // Das letzte Element aus dem Array entfernen
        contactData[0].tasks[0]['toDo'].pop();

        // Hier können Sie weitere Aktionen durchführen, z.B. die Anzeige aktualisieren
        console.log("Last Task Deleted:", contactData[0].tasks[0]['toDo']);

      
    } 
}









function getSubtasks() {
    // Get container for created subtasks
    let createdSubtasksDiv = document.getElementById('created-subtasks');

    // Get all subtask elements
    let subtaskElements = createdSubtasksDiv.getElementsByClassName('created-subtask');

    // Map subtask elements to their text content without 'x'
    let subtasks = Array.from(subtaskElements).map(element => {
        let textContent = element.textContent.trim();
        return textContent.substring(0, textContent.length - 1); // Entfernt das 'x'
    });

    return subtasks;

}


function clearForm() {
    // Clear Title input
    document.getElementById('add-task-title-input').value = '';

    // Clear Description textarea
    document.getElementById('add-task-description-textarea').value = '';

    // Clear Assigned to dropdown and content
    document.getElementById('assigned-dropdown-div').innerHTML = '<span class="add-task-font-styling">Select contacts to assign</span><img id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">';
    document.getElementById('drop-down-content').innerHTML = '';

    // Clear Due date input
    document.getElementById('due-date-input').value = '';

    // Clear Prio buttons
    document.querySelectorAll('.priority-button').forEach(button => {
        button.classList.remove('selected');
        button.style.backgroundColor = '';
        let image = button.querySelector('img');
        resetImage(image, button.id);
    });

    // Clear Category select
    document.getElementById('task-category-select').selectedIndex = 0;

    // Clear Subtasks input and container
    document.getElementById('subtask-input-field').value = '';
    document.getElementById('created-subtasks').innerHTML = '';

    // Clear any other fields or elements as needed

    // Set the DROP_DOWN_OPEN flag to false
    DROP_DOWN_OPEN = false;
    disableCreateTaskButton()
}

function disableCreateTaskButton() {
    let createTaskButton = document.getElementById("create-task-button");
    createTaskButton.disabled = true;
}

function saveTasksToLocalStorage() {

    localStorage.setItem('contactData', JSON.stringify(contactData));
 }
 
 
 function loadTasksFromLocalStorage() {
    
    let storedData = localStorage.getItem('contactData');
    if (storedData) {
        contactData = JSON.parse(storedData);
    }
 }
 


// Attach the clearForm function to the Clear button
document.getElementById('clear-button').addEventListener('click', clearForm);