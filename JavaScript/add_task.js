
let DROP_DOWN_OPEN = false;


function addNameInitialToContacts(dataContacts) {
    for (let i = 0; i < dataContacts.length; i++) {
        let name = dataContacts[i].name;
        let initials = name.substring(0, 1).toUpperCase();
        dataContacts[i].ini_name = initials;
    }
}





function addInitialsOfFirstNames(dataContacts) {
    for (let i = 0; i < dataContacts.length; i++) {
        let first = dataContacts[i].first;
        let inits = first.substring(0, 1).toUpperCase();
        dataContacts[i].ini_first = inits;
    }
}
addNameInitialToContacts(dataContacts);
addInitialsOfFirstNames(dataContacts);



function toggleDropDown(){

if (DROP_DOWN_OPEN == false) {

// insert filterfunction for names in input Element
document.getElementById('assigned-dropdown-div').innerHTML = '';
document.getElementById('assigned-dropdown-div').innerHTML = `

<input onkeyup="filterContacts()" id="assign-search-input" type="text">
<img id="turned-drop-down-image" src="./assets/img/add_task/turned_arrow_drop_down.svg">
`
renderDropDown()
DROP_DOWN_OPEN = true;
document.getElementById('drop-down-content').classList.remove('d-none')

focusInputField()
}

else{

    document.getElementById('assigned-dropdown-div').innerHTML = '';
    document.getElementById('assigned-dropdown-div').innerHTML = `
    <span class="add-task-font-styling">Select contacts to assign</span>
    <img class="hover-lg" id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
    `
document.getElementById('drop-down-content').classList.add('d-none')

DROP_DOWN_OPEN = false;
}
} 

function focusInputField(){
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

let prioButtons = document.querySelectorAll('.priority-button');

prioButtons.forEach(function(button) {
    button.addEventListener('click', function() {
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
        } else {
            // Toggle zwischen den Bildern entsprechend des Button-Ids
            toggleImages(image, button.id);

            // Setze die Hintergrundfarbe entsprechend des Index
            let index = Array.from(button.parentNode.children).indexOf(button);
            button.style.backgroundColor = getBackgroundColor(index);

            // Markiere den ausgewählten Button
            button.classList.add('selected');
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



function addNewSubtask(){
let subInput = document.getElementById('subtask-input-field').value;

document.getElementById('created-subtasks').innerHTML = '';
document.getElementById('created-subtasks').innerHTML += `
<div id="subtasks-column">
<span>${subInput}</span>
</div>
`
document.getElementById('subtask-input-field').value = '';


}






//prio hover neu

/*

// ...prio Hover

//urgent

function toggleUrgent(){
 
    document.getElementById('urgent-button').classList.toggle('red-bg');
    document.getElementById('urgent-button').classList.toggle('white-font')
    toggleUrgentImage()
}

function toggleUrgentImage(){
let changeUrgentImage = document.getElementById('urgent-image');
changeUrgentImage.src ="/assets/img/add_task/urgent.svg";
}




//urgent

function toggleMedium(){
document.getElementById('medium-button').classList.toggle('yellow-bg');
document.getElementById('medium-button').classList.toggle('white-font')
toggleMediumImaage();
}

function toggleMediumImaage(){
let changeMediumImage = document.getElementById('medium-image');
changeMediumImage.src ="/assets/img/add_task/equity_white.svg";
} 





function toggleLow(){
    document.getElementById('low-button').classList.toggle('green-bg');
    document.getElementById('low-button').classList.toggle('white-font')
    toggleLowImage();
}



function toggleLowImage(){
let changeLowImage = document.getElementById('low-image');
changeLowImage.src ="/assets/img/add_task/low.svg";
}


// ...prio hover
*/



function filterContacts(){

    addNameInitialToContacts(dataContacts);
    addInitialsOfFirstNames(dataContacts);

    let search = document.getElementById('assign-search-input').value;
    search = search.toLowerCase();
    let searchedContactContainer = document.getElementById('drop-down-content');
    searchedContactContainer.innerHTML ='';

    console.log('Search value:', search);

    for (let i = 0; i < dataContacts.length; i++) {
        let searchedContact = dataContacts[i];
        if (searchedContact['first'].toLowerCase().includes(search) || searchedContact['name'].toLowerCase().includes(search) ) {
            searchedContactContainer.innerHTML +=`
            <label class="f-btw" onclick="selectOption(${i})">
            <div class="dropdown-span-block">
                <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${searchedContact.avatarColor};">${searchedContact.ini_first}${searchedContact.ini_name}</span>
                <span>${searchedContact.first} ${searchedContact.name}</span>
            </div>
            <input  type="checkbox">
        </label>  
            `
        }
    }
}



    // document.getElementById('drop-down-content').classList.remove('d-none');


// 




function renderDropDown() {
    document.getElementById('drop-down-content').innerHTML = '';

    for (let i = 0; i < dataContacts.length; i++) {
        let singleContact = dataContacts[i];
        
        document.getElementById('drop-down-content').innerHTML += `
            <label class="f-btw" onclick="selectOption(${i})">
                <div class="dropdown-span-block">
                
                    <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${singleContact.avatarColor};">${singleContact.ini_first}${singleContact.ini_name}</span>
          
                    <span>${singleContact.first} ${singleContact.name}</span>
                </div>
                <input  type="checkbox">
          
            </label>
        `;
    }
}






// function renderDropDown(){

// document.getElementById('drop-down-content').innerHTML = '';

// for (let i = 0; i < dataContacts.length; i++) {
//     let singleContact = dataContacts[i];
    
// document.getElementById('drop-down-content').innerHTML += `

// <label class="f-btw" onclick="selectOption(i)">
// <div class="dropdown-span-block">
// <span id="specificColor${i}"  class="initials-dropdown-styling" style="background-color: ${singleContact.avatarColor}>${singleContact.ini_first}${singleContact.ini_name}"</span>
// <span>${singleContact.first} ${singleContact.name}</span>
// </div>
// <input  type="checkbox">
// </label>
// `

// }
// }



// console.log(dataContacts);


{/* <option value="personA">
    
<div class="b-r">
<span class="assign-contact-initials">${assingnableContact.ini_first}${assingnableContact.ini_name}</span>
<span>${assingnableContact.first} ${assingnableContact.name}</span>
 </div>
  <input type="checkbox" id="${i}" value="${i}">

</option> */}
