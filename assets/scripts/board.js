let detailwindow = false;
let DROP_DOWN_BOARD_OPEN = false;
let DROP_DOWN_ADD_BORD_VIEW = false;

let currentPrio;
let currentOverlayPrio;
  loadTasksFromLocalStorage();

  let currentFocusedDiv = null;


function initBoardFunctions(){

    updateHTMLBoard()
}



function updateHTMLBoard() {
   
   filterTasksByCategory()
   renderToDos();
   renderInProgress()
   renderAwaitFeedback()
   renderDone()
}

updateHTMLBoard()
//  Florian

// Florian


let currentDraggedElement;


function startDragging(taskID) {
   currentDraggedElement = taskID;
   console.log("Ist:", currentDraggedElement)
}

function moveTo(category) {
   
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

  
   if (taskToMove) {
       contactData[0].tasks[0][sourceCategory] = contactData[0].tasks[0][sourceCategory].filter(task => task.taskID !== currentDraggedElement);

     
       contactData[0].tasks[0][category].push(taskToMove);
       console.log(`Task ${currentDraggedElement} wurde von ${sourceCategory} nach ${category} verschoben.`);

       updateHTMLBoard();
       console.log(`Task ${currentDraggedElement} wurde von ${sourceCategory} nach ${category} verschoben.`);
   } else {
       console.log(`Task ${currentDraggedElement} wurde nicht gefunden.`);
   }

}


moveTo('done');



function allowDrop(event) {
   event.preventDefault();
}


function filterTasksByCategory(category) {
   let tasks = contactData[0].tasks[0]; 

   let filteredTasks = {
       'toDo': tasks.toDo.filter(task => task.category === category),
       'inProgress': tasks.inProgress.filter(task => task.category === category),
       'awaitFeedback': tasks.awaitFeedback.filter(task => task.category === category),
       'done': tasks.done.filter(task => task.category === category)
   };

   return filteredTasks;
}


let filteredOpenTasks = filterTasksByCategory('User Story');
console.log(filteredOpenTasks.toDo); 
console.log(filteredOpenTasks.inProgress); 
console.log(filteredOpenTasks.awaitFeedback); 
console.log(filteredOpenTasks.done); 

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
   
  
   if (totalSubtasksCount > 0) {
      
       let fillPercentage = (doneSubtasksCount / totalSubtasksCount) * 100;
      
       fillPercentage = Math.min(100, Math.max(0, fillPercentage));
       return `${fillPercentage}%`;
   } else {
       return '0%';
   }
}






function renderToDos(filteredTasks) {
   let toDoTasks = filteredTasks || contactData[0].tasks[0].toDo;
   document.getElementById('to-do-column').innerHTML = '';
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
           document.getElementById('to-do-column').innerHTML += `
           <div draggable="true" ondragstart="startDragging(${toDoTask.taskID})" onclick="openTaskDetail('${toDoTask.taskID}')" class="card-for-task cursor-pointer">
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

 
   if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
     
       for (let i = 0; i < toDoTask.subtasks.length; i++) {
           let subtask = toDoTask.subtasks[i];
           
           if (subtask.status && subtask.status.toLowerCase() === 'done') {
               doneSubtasksCount++;
           }
       }
   }

   return doneSubtasksCount;
}




function getTotalSubtasksCount(toDoTask) {
   let totalSubtasksCount = 0;


   if (toDoTask.subtasks && Array.isArray(toDoTask.subtasks)) {
       totalSubtasksCount = toDoTask.subtasks.length;
   }

   return totalSubtasksCount;
}






function renderInProgress(filteredTasks) {
   let inProgressTasks = filteredTasks || contactData[0].tasks[0].inProgress;
   document.getElementById('in-progress-column').innerHTML = '';


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


           let fillWidth = calculateFillWidth(inProgressTask);
           let doneSubtasksCount = getDoneSubtasksCount(inProgressTask);
           let totalSubtasksCount = getTotalSubtasksCount(inProgressTask)
           document.getElementById('in-progress-column').innerHTML += `
           <div draggable="true" ondragstart="startDragging(${inProgressTask.taskID})" onclick="openTaskDetail('${inProgressTask.taskID}')" class="card-for-task cursor-pointer">
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
                       <span class="total-numbers-subtask-class">${totalSubtasksCount }</span>
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




function renderAwaitFeedback(filteredTasks) {
   let awaitFeedbackTasks = filteredTasks || contactData[0].tasks[0].awaitFeedback;
   document.getElementById('await-feedback-column').innerHTML = '';


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


           let fillWidth = calculateFillWidth(awaitFeedbackTask);
           let doneSubtasksCount = getDoneSubtasksCount(awaitFeedbackTask);
           let totalSubtasksCount = getTotalSubtasksCount(awaitFeedbackTask)
           document.getElementById('await-feedback-column').innerHTML += `
               <div draggable="true" ondragstart="startDragging(${awaitFeedbackTask.taskID})" onclick="openTaskDetail('${awaitFeedbackTask.taskID}')" class="card-for-task cursor-pointer">
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

function renderDone(filteredTasks) {
   let doneTasks = filteredTasks || contactData[0].tasks[0].done;

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
           let totalSubtasksCount = getTotalSubtasksCount(doneTask)
           let fillWidth = calculateFillWidth(doneTask);
           document.getElementById('done-column').innerHTML += `
               <div draggable="true" ondragstart="startDragging(${doneTask.taskID})" onclick="openTaskDetail('${doneTask.taskID}')" class="card-for-task cursor-pointer">
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

function focusSearchInput() {
   let searchFocus = document.getElementById('board-input-field')
   searchFocus.focus()

}


function filterTasksBoard() {
   let search = document.getElementById('board-input-field').value.toLowerCase();

 
   if (contactData[0]?.tasks[0]) {
       let filteredTasks = {
           'toDo': filterTasksByCategory('toDo', search),
           'inProgress': filterTasksByCategory('inProgress', search),
           'awaitFeedback': filterTasksByCategory('awaitFeedback', search),
           'done': filterTasksByCategory('done', search)
       };

     
       renderToDos(filteredTasks.toDo);
       renderInProgress(filteredTasks.inProgress);
       renderAwaitFeedback(filteredTasks.awaitFeedback);
       renderDone(filteredTasks.done);
   }
}

function filterTasksByCategory(category, search) {
   let tasksInCategory = contactData[0].tasks[0][category] || []; 

   let filteredTasks = tasksInCategory.filter(task =>
       task.title.toLowerCase().includes(search) ||
       task.description.toLowerCase().includes(search)
   );

   return filteredTasks;
}



function slideIn() {

   if (detailwindow == false) {
         let taskDetailView = document.getElementById('detailview-container');
   taskDetailView.classList.add('show'); 
  
   }
   detailwindow = true;
 
 }

 function slideOut() {
  
   if (detailwindow == true) {
         document.getElementById('detailview-container').classList.remove('show');
         hideOverlay()
   }
   detailwindow = false;

}



function formatDate(dateString) {
   let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
   let formattedDate = new Date(dateString).toLocaleDateString(undefined, options).replace(/\./g, '/');
   return formattedDate;
}



function findTaskByID(taskID) {
   for (let categoryKey in contactData[0].tasks[0]) {
       let categoryTasks = contactData[0].tasks[0][categoryKey];
       let foundTask = categoryTasks.find(task => task.taskID == taskID); 

       console.log(`Checking category ${categoryKey} - Found Task:`, foundTask);

       if (foundTask) {
           return foundTask;
       }
   }
   console.log(`Task with ID ${taskID} not found.`);

   return null; // Task nicht gefunden
}

function taskPriority(priority) {
   switch (priority) {
       case 0:
           return { text: "Urgent", image: "/assets/img/board/prio_high.svg" };
       case 1:
           return { text: "Medium", image: "/assets/img/board/prio_equation.svg" };
       case 2:
           return { text: "Low", image: "/assets/img/board/prio_low.svg" };
       default:
           return { text: "", image: "" };
   }
}




function openTaskDetail(taskID) {
   slideIn();  
   console.log("Task ID:", taskID);
   let task = findTaskByID(taskID);
   let priorityInfo = taskPriority(task.prio);
   console.log("Found Task:", task);

   let categoryBackgroundColor;
   switch (task.category) {
       case "User Story":
           categoryBackgroundColor = "#0038FF";
           break;
       case "Technical Task":
           categoryBackgroundColor = "#1fd7c1";
           break;
       default:
           categoryBackgroundColor = "#FFFFFF";
   }
   let formattedDueDate = formatDate(task.dueDate);

   let assignedContactsHTML = '';

   for (let j = 0; j < task.assigned_contacts.length; j++) {
       let userFirstName = task.assigned_contacts[j].first;
       let userLastName = task.assigned_contacts[j].name;
   
       let isCurrentUser = false;
      
       if (userFirstName === contactData[0].userFirstName && userLastName === contactData[0].userName) {
           isCurrentUser = true;
       }
   
       assignedContactsHTML += `
           <div class="single-user-taskdetail"  tabindex="0" >
               <div class="round-user-profile" style="background-color:${task.assigned_contacts[j].avatarColor}">
                   <span class="assigned-testuser">${task.assigned_contacts[j].first.charAt(0)}${task.assigned_contacts[j].name.charAt(0)}</span>
               </div>
               <span class="detailview-user">${userFirstName} ${userLastName}${isCurrentUser ? " (You)" : ""}</span>
           </div>
       `;
   }


   let subtasksHTML = '';

   if (task.subtasks && task.subtasks.length > 0) {
       for (let i = 0; i < task.subtasks.length; i++) {
           let subtask = task.subtasks[i];

         
           let checkboxChecked = subtask.status && subtask.status.toLowerCase() === 'done';

           subtasksHTML += `
           <div class="subtask-item">
               <input type="checkbox" class="subtask-checkbox" id="subtask-${i}" ${checkboxChecked ? 'checked' : ''} onclick="toggleSubtaskStatus(${taskID}, ${i}, this)" />
               <label for="subtask-${i}" class="subtask-label">${subtask.description}</label>
           </div>
       `;
       }
   }

   document.getElementById('detailview-container').innerHTML = '';
   document.getElementById('detailview-container').innerHTML = `
       <div id="head-detailview">
           <span class="category-taskdetail-style" style="background-color: ${categoryBackgroundColor};">${task.category}</span>
           <img src="/assets/img/board/close.svg" class="close-button-taskdetail"  onclick="slideOut()">
       </div>
       <div class="taskdetail-middle-div">
       <span class="taskdetail-title-span">${task.title}</span>
       <span class="taskdetail-description-span">${task.description}</span>
       </div>
       <div class="taskdetail-dueDate-div">
       <span class="heading-detailviews-dueDate">Due Date:</span>
       <span class="rendered-information-taskdetail">${formattedDueDate}</span>
       </div>
       <div class="taskdetail-prio-div">
       <span class="heading-detailviews-inter blue-heading">Priority:</span>
       <div class="taskdetail-prio-text-img-div">
       <span class="heading-detailviews-inter">${priorityInfo.text}</span>
       <img src="${priorityInfo.image}">
       </div>
       </div
       <div class="taskdetail-container-assignedContacts">
       <span class="heading-detailviews-inter blue-heading">Assigned To:</span>
       <div id="render-assigned-contacts" class="taskdetails-assignedContacts">
       </div>
       </div>
       <div class="taskdetail-container-subtasks">
       <span class="heading-detailviews-inter blue-heading">Subtasks:</span>
       <div id="render-taskdetails-subtasks" class="taskdetails-subtasks">
       </div>
       </div>
       <div class="interaction-buttons">
       <div onmouseenter="toggleDeleteImageOnHover()" onclick="deleteTask('${taskID}')" class="taskdetails-delete-div">
       <img id="delete-image" src="/assets/img/board/delete.svg" class="taskdetail-interaction-buttons">
       <span class="taskdetails-button-bottom-spanstyle">Delete</span>
       </div>
   
       <span class="vertical-pipe">|</span>
       <div onmouseenter="toggleEditImageOnHover()" onclick="editTask('${taskID}')" class="taskdetails-edit-div">
       <img id="edit-image" src="/assets/img/board/edit.svg"  class="taskdetail-interaction-buttons">
       <span class="taskdetails-button-bottom-spanstyle">Edit</span>
       </div>
       </div>
   `;

   document.getElementById('render-assigned-contacts').innerHTML = assignedContactsHTML;
   document.getElementById('render-taskdetails-subtasks').innerHTML = subtasksHTML;
   showOverlay()
}




function toggleSubtaskStatus(taskID, subtaskIndex, checkbox) {
   let task = findTaskByID(taskID);


   if (subtaskIndex >= 0 && subtaskIndex < task.subtasks.length) {
       let subtask = task.subtasks[subtaskIndex];

       subtask.status = checkbox.checked ? 'done' : 'notDone';

       saveTasksToLocalStorage();
       updateHTMLBoard();  
   } else {
       console.error('Ungültiger Subtask-Index.');
   }
}







function getInitials(contact) {
   return contact.first.charAt(0).toUpperCase() + contact.name.charAt(0).toUpperCase();
}

function deleteTask(taskID) {
  
   let taskLists = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
   for (let status of taskLists) {
       let tasksInStatus = contactData[0].tasks[0][status];
      
       const indexToDelete = tasksInStatus.findIndex(task => task.taskID == taskID);
       
       if (indexToDelete !== -1) {
           tasksInStatus.splice(indexToDelete, 1);
           break; 
       }
   }

  
   console.log(contactData)
  
   slideOut();
   updateHTMLBoard();
}



function showOverlay() {
   let overlay = document.getElementById('overlay-identifier');
   overlay.classList.remove('overlay-d-none'); 
   overlay.classList.add('overlay'); 
 }
 

 function hideOverlay() {
   let overlay = document.getElementById('overlay-identifier');
   overlay.classList.remove('overlay');  
   overlay.classList.add('overlay-d-none'); 
 }
 

function toggleDeleteImageOnHover() {
   let deleteDiv = document.querySelector('.taskdetails-delete-div');
   deleteDiv.addEventListener('mouseover', () => {
       document.getElementById('delete-image').src = "/assets/img/board/delete_light.svg";
       deleteDiv.classList.add('taskdetails-delet-edit-blue');
   });

   deleteDiv.addEventListener('mouseout', () => {
       document.getElementById('delete-image').src = "/assets/img/board/delete.svg";
       deleteDiv.classList.remove('taskdetails-delet-edit-blue');
   });
}

function toggleEditImageOnHover() {
   let editDiv = document.querySelector('.taskdetails-edit-div');
   editDiv.addEventListener('mouseover', () => {
       document.getElementById('edit-image').src = "/assets/img/board/edit_light.svg";
       editDiv.classList.add('taskdetails-delet-edit-blue');
   });

   editDiv.addEventListener('mouseout', () => {
       document.getElementById('edit-image').src = "/assets/img/board/edit.svg";
       editDiv.classList.remove('taskdetails-delet-edit-blue');
   });
}

function formatEditDate(dueDate) {
  
   let dateObject = new Date(dueDate);

  
   let day = String(dateObject.getDate()).padStart(2, '0'); 
   let month = String(dateObject.getMonth() + 1).padStart(2, '0'); 
   let year = dateObject.getFullYear();

  
   let formattedEditDate = `${day}/${month}/${year}`;

   return formattedEditDate;
}

function editTask(taskID) {

   console.log("Task ID:", taskID);
   let task = findTaskByID(taskID);
   console.log("Der verlorene Task ist:", task);
   let currentAssignedContactsHTML = '';
   for (let j = 0; j < task.assigned_contacts.length; j++) {
       let userFirstName = task.assigned_contacts[j].first;
       let userLastName = task.assigned_contacts[j].name;
    
       if (userFirstName === contactData[0].userFirstName && userLastName === contactData[0].userName) {
           isCurrentUser = true;
       }
   
       currentAssignedContactsHTML += `
               <div class="round-user-profile" style="background-color:${task.assigned_contacts[j].avatarColor}">
                   <span class="assigned-testuser">${task.assigned_contacts[j].first.charAt(0)}${task.assigned_contacts[j].name.charAt(0)}</span>
               </div>    
       `;
   }

   let subtasksHTML = '';
   if (task.subtasks && task.subtasks.length > 0) {
       for (let i = 0; i < task.subtasks.length; i++) {
           let subtask = task.subtasks[i];
           subtasksHTML += `
               <li  id="listelement-subtaskID${subtask.id}" onmouseover="showImages('${subtask.id}')" onmouseout="hideImages('${subtask.id}')" class="single-list-element">&#8226; ${subtask.description}
               <div class="edit-subtast-edit-delete-div d-none" id="hover-box-edit${subtask.id}" >
               <img class="edit-delete-image cp"" onclick="editsubtasks('${subtask.id}', '${subtask.description}', ${taskID})" id="editST('${subtask.id}')" src="/assets/img/board/edit.svg">
               <span class="slash-edit">
               |</span>
               <img onclick="deleteCurrentSubtask(${taskID}, ${subtask.id}, renderEditTaskView)"" class="edit-delete-image cp"" id="deleteST${subtask.id}" src="/assets/img/board/delete.svg">
               </div >
               </li>    
           `;
       }
   }
  
   let formattedDueDate = formatDate(task.dueDate);
  
   document.getElementById('detailview-container').innerHTML = '';
   document.getElementById('detailview-container').innerHTML = `
   
   
   
   <div class="flex-end ">
   <img src="/assets/img/board/close.svg" class="close-button-taskdetail"  onclick="slideOut()">
   </div>

   <form class="scrollbar-edit">
   <div class="flex-clmn">

   <div class="edit-task-title-div">
   <label class="user-none edit-headings-style">Title</label>
   <input id="edit-title-value-input" class="cp edit-input-title"  required placeholder="${task.title}">
   </div>

   <div class="edit-task-description-div">
   <label class="user-none edit-headings-style">Description</label>
   <textarea id="edit-textarea-input" class="border-text cp fontstyle-edit">${task.description}</textarea>
   </div>

 
   <div>
   <span>Due date</span>
   <div class="date-render-image-div">

   <input id="taskdetail-date-input" onfocus="(this.type='date')"
       onblur="(this.type='text')" 
       placeholder="${formattedDueDate}" class="edit-date-placeholder" required>
   <img src="/assets/img/board/calendar.svg" onclick="focusEditDueDate()"  class="calendar-image">
   </div>
   </div>

   <div>
   <span>Priority</span>
   <div  id="edit-prio-sup-div">
   <div onfocus="addUrgentStatus()" onblur="removeUrgentStatus()" class="edit-prio-div" id="edit-urgent-div" tabindex="1">
   <span id="edit-urgent-span">Urgent</span>
   <img id="edit-urgent-image" src="/assets/img/board/urgent-red.svg">
   </div>
   <div onfocus="addMediumStatus()" onblur="removeMediumStatus()" class="edit-prio-div"  id="edit-medium-div" tabindex="2">
   <span id="edit-medium-span">Medium</span>
   <img id="edit-medium-image" src="/assets/img/board/equity_yellow.svg">
   </div>
   <div onfocus="addLowStatus()" onblur="removeLowStatus()" class="edit-prio-div" id="edit-low-div" tabindex="3">
   <span id="edit-low-span">Low</span>
   <img id="edit-low-image" src="/assets/img/board/low-green.svg">
   </div>
   </div>
   </div>

   
   <div id="assigned-to-div" class="add-task-font-styling">


       <span class="add-task-font-styling">Assigned to</span>
       <div id="assigned-dropdown-div" onclick="toggleDropDown()">
           <span class="add-task-font-styling">Select contacts to assign</span>
           <img id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg" >
       </div>
           <div id="drop-down-content" class=" scrollbar-contacts-edit">
           </div>

       <div id="current-assigned-contacts" style="display:flex; gap: 20px; padding-top: 6px">
       </div>          
   </div>


   <div class="edit-subtask-whole-container">
       <span class="edit-subtask-heading edit-headings-style" >Subtasks</span>
       <div class="edit-subtask-input-container">
           <input  id="edit-subtask-input" type="text" placeholder="Add new subtask">
           <img class="edit-subtask-plus-image cp"  onclick="editAddSubtask(${taskID})" src="/assets/img/board/add_dark.svg">
       </div>
       <div class="edit-subtask-list-div">
           <ul id="edit-subtask-list">
           </ul>
       </div>

   </div>
</div>
<div class="place-button-div">
<button onclick="saveEditedChanges(${taskID})" id="change-task-button"><span>Ok</span><img src="/assets/img/board/check.svg"></button>
</div>

   </form  
   `
   document.getElementById('current-assigned-contacts').innerHTML =  currentAssignedContactsHTML;
   document.getElementById('edit-subtask-list').innerHTML = subtasksHTML;
}


// save changes


function saveEditedChanges(taskID){
   let title = document.getElementById('edit-title-value-input').value;
   let description = document.getElementById('edit-textarea-input').value;
   let dueDate = document.getElementById('taskdetail-date-input').value;
   let parsedDueDate = new Date(dueDate);

   task = findTaskByID(taskID);


   let selectedContactIDs = getSelectedContactIDs();

   task.assigned_contacts = contactData[0].contacts.filter(contact => selectedContactIDs.includes(contact.id));

   console.log("Prio ist:" , currentPrio )

   if (!isNaN(parsedDueDate.getTime())) {
      
       task.title = title;
       task.description = description;
       task.dueDate = dueDate;
       if (currentPrio !== undefined) {
           task.prio = currentPrio;
       }
       else{
           task.prio = 1;
       }

       console.log("Der veränderte Task nach Funktion", task);

       slideOut();

       saveTasksToLocalStorage();

      
       updateHTMLBoard();
   } else {
     
       console.log("Ungültiges Datum!");
      
   }
   currentPrio = undefined;
   console.log("Der veränderte Task nach Funktion", task);
   return false;
}



function getSelectedContactIDs() {
   let selectedContactIDs = [];

  
   let checkboxes = document.querySelectorAll('#drop-down-content input[type="checkbox"]');
   checkboxes.forEach(checkbox => {
       if (checkbox.checked) {
           selectedContactIDs.push(parseInt(checkbox.getAttribute('data-contact-id')));
       }
   });

   return selectedContactIDs;
}









function saveTasksToLocalStorage() {

   localStorage.setItem('contactData', JSON.stringify(contactData));
}


function loadTasksFromLocalStorage() {
   
   const storedData = localStorage.getItem('contactData');
   if (storedData) {
       contactData = JSON.parse(storedData);
   }
}

loadTasksFromLocalStorage();







function addUrgentStatus() {
   document.getElementById('edit-urgent-image').src = '/assets/img/board/urgent.svg';
  document.getElementById('edit-urgent-span').classList.add('font-white')
  currentPrio = 0
  
}

function addMediumStatus() {
   document.getElementById('edit-medium-image').src = '/assets/img/board/equity_white.svg';
  document.getElementById('edit-medium-span').classList.add('font-white')
  currentPrio = 1
}

function addLowStatus() {
   document.getElementById('edit-low-image').src = '/assets/img/board/low.svg';
  document.getElementById('edit-low-span').classList.add('font-white')
  currentPrio = 2;
}


function removeUrgentStatus(){
   document.getElementById('edit-urgent-image').src = '/assets/img/board/urgent-red.svg';
   document.getElementById('edit-urgent-span').classList.remove('font-white')
   
}

function removeMediumStatus(){
   document.getElementById('edit-medium-image').src = '/assets/img/board/equity_yellow.svg';
  document.getElementById('edit-medium-span').classList.remove('font-white')
 
}

function removeLowStatus(){
   document.getElementById('edit-low-image').src = '/assets/img/board/low-green.svg';
   document.getElementById('edit-low-span').classList.remove('font-white')

}


// prio-btns



function editsubtasks(subtaskId, currentDescription, currentSupTaskID)  {


let subtaskDescription = currentDescription;
   
console.log("SubtaskID", subtaskId, "Current Description", currentDescription, "Aktueller Obertask", currentSupTaskID )

let currentSubListElement = document.getElementById(`listelement-subtaskID${subtaskId}`)

console.log("Element ist:" ,  currentSubListElement)



currentSubListElement.innerHTML = `



<input class="subtaskinput-edit" type="text" placeholder="${subtaskDescription}">
<div class="flex-edit-check-div">
<img src="/assets/img/board/close.svg" onclick="closeCurrentSubtaskEdit(${currentSupTaskID})">
<span>|</span>
<img src="/assets/img/board/check_black.svg" onclick="confirmCurrentSubtaskEdit(${currentSupTaskID})">
</div>

`
console.log("Element ist:" ,  currentSubListElement)


}



function closeCurrentSubtaskEdit(currentSupTaskID){
   let task = findTaskByID(currentSupTaskID);
   console.log("Close Funktion task istz:", task)

   let subtasksHTML = '';

   if (task.subtasks && task.subtasks.length > 0) {
       for (let i = 0; i < task.subtasks.length; i++) {
           let subtask = task.subtasks[i];
           subtasksHTML += `  
               <li  id="listelement-subtaskID${subtask.id}" onmouseover="showImages('${subtask.id}')" onmouseout="hideImages('${subtask.id}')" class="single-list-element">&#8226; ${subtask.description}
               <div class="edit-subtast-edit-delete-div d-none" id="hover-box-edit${subtask.id}" >
               <img class="edit-delete-image cp"" onclick="editsubtasks('${subtask.id}', '${subtask.description}', ${task.taskID})" id="editST('${subtask.id}')" src="/assets/img/board/edit.svg">
               <span class="slash-edit">
               |</span>
               <img onclick="deleteCurrentSubtask(${task.taskID}, ${subtask.id}, renderEditTaskView)"" class="edit-delete-image cp"" id="deleteST${subtask.id}" src="/assets/img/board/delete.svg">
               </div >
               </li>   
           `
;   
       }
   }
   document.getElementById('edit-subtask-list').innerHTML = subtasksHTML;
}



function confirmCurrentSubtaskEdit(currentSupTaskID) {
   let subtaskInput = document.querySelector('.subtaskinput-edit');
   let newSubtaskDescription = subtaskInput.value;


   let task = findTaskByID(currentSupTaskID);
   let subtaskID = getCurrentSubtaskID(); 

   if (task && task.subtasks) {
       let subtaskToUpdate = task.subtasks.find(subtask => subtask.id === subtaskID);
       
       if (subtaskToUpdate) {
           subtaskToUpdate.description = newSubtaskDescription;
       }
   }

  
   console.log("Neue Subtask-Beschreibung:", newSubtaskDescription);

  
   closeCurrentSubtaskEdit(currentSupTaskID);
}

function getCurrentSubtaskID() {
 

   const subtaskIDString = document.querySelector('.subtaskinput-edit').parentNode.id.replace('listelement-subtaskID', '');
   return parseInt(subtaskIDString);
}


function showImages(subtaskId) {
   let elementId = `hover-box-edit${subtaskId}`;
   let element = document.getElementById(elementId);

   if (element) {
       element.classList.remove("d-none");
   }
}

function hideImages(subtaskId) {
   let elementId = `hover-box-edit${subtaskId}`;
   let element = document.getElementById(elementId);

   if (element) {
       element.classList.add("d-none");
   }
}

function addSubtaskToTask(task) {

   console.log("Anzahl subtasks:", task.subtasks.length)

   if (task.subtasks.length < 2) {
   
       let newSubtaskDescription = document.getElementById('edit-subtask-input').value;

   
       if (newSubtaskDescription.trim() !== '') {
      
           let newSubtask = {
               id: generateSubtaskID(task), 
               title: newSubtaskDescription,
               status: "notDone",  
               description: newSubtaskDescription
           };

          
           task.subtasks.push(newSubtask);

         
           updateSubtaskView(task);
       } else {
           console.log('Der neue Subtask darf nicht leer sein.');
       }
   } else {
       console.log('Die maximale Anzahl von Subtasks ist bereits erreicht.');
   }
}

function generateSubtaskID(task) {
  
   if (task && task.subtasks) {
     
       return task.subtasks.length + 1;
   } else {
      console.log("Ein Fehler")
   
   }
}

function editAddSubtask(transfertaskID) {

   let taskID = transfertaskID; 

  
   let task = findTaskByID(taskID);

  
   addSubtaskToTask(task);

   editTask(taskID)
}

function deleteCurrentSubtask(taskID, subtaskID, callback) {
 
   let task = findTaskByID(taskID);

  
   let subtaskIndex = task.subtasks.findIndex(subtask => subtask.id === subtaskID);

 
   if (subtaskIndex !== -1) {
   
       task.subtasks.splice(subtaskIndex, 1);
       console.log(`Subtask mit der ID ${subtaskID} wurde aus dem Task mit der ID ${taskID} gelöscht.`);

    
       updateSubtaskView(task); 
 
       if (callback) {
           callback(taskID);
       }
   } else {
       console.log(`Subtask mit der ID ${subtaskID} wurde nicht im Task mit der ID ${taskID} gefunden.`);
   }
  
}

function focusSubtaskInput(){
   document.getElementById("edit-subtask-input").focus();
}

function focusEditDueDate(){
document.getElementById ('taskdetail-date-input').focus();
}


function updateSubtaskView(task) {


  
   console.log('Aktualisiere Subtask-Ansicht für Task:', task);

}

function renderEditTaskView(taskID) {
   editTask(taskID);
}

function toggleDropDown() {

   document.getElementById('current-assigned-contacts').classList.add('d-none')

   if (DROP_DOWN_BOARD_OPEN == false) {

       document.getElementById('assigned-dropdown-div').innerHTML = '';
       document.getElementById('assigned-dropdown-div').innerHTML = `

<input onkeyup="filterContacts()" id="assign-search-input" type="text">
<img id="turned-drop-down-image" src="./assets/img/add_task/turned_arrow_drop_down.svg">
`
       renderDropDown()
       DROP_DOWN_BOARD_OPEN = true;
       document.getElementById('drop-down-content').classList.remove('d-none')

       focusInputField()
   }
   else {

       document.getElementById('assigned-dropdown-div').innerHTML = '';
       document.getElementById('assigned-dropdown-div').innerHTML = `
   <span class="add-task-font-styling">Select contacts to assign</span>
   <img class="hover-lg" id="drop-down-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
   `
       document.getElementById('drop-down-content').classList.add('d-none')

       DROP_DOWN_BOARD_OPEN = false;
   }
}

function renderDropDown() {
   document.getElementById('drop-down-content').innerHTML = '';

   for (let i = 0; i < contactData[0].contacts.length; i++) {
       let singleContact = contactData[0].contacts[i];

       document.getElementById('drop-down-content').innerHTML += `
           <label class="f-btw"  >
               <div class="dropdown-span-block">
                   <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${singleContact.avatarColor};">${singleContact.ini_first}${singleContact.ini_name}</span>
                   <span>${singleContact.first} ${singleContact.name}</span>
               </div>
               <input type="checkbox" data-contact-id="${i}">
           </label>
       `;
   }
}


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

addNameInitialToContacts(contactData);
addInitialsOfFirstNames(contactData);


function focusInputField() {
   let inputField = document.getElementById('assign-search-input');
   inputField.focus();
   inputField.select()
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


//  open add task form


function openAddTaskForm(){

   showOverlay()
document.getElementById('add-task-id-overlay').classList.add('showAddTask')


let addTaskBody = document.getElementById('add-task-id-overlay');

addTaskBody.innerHTML = '';

addTaskBody.innerHTML = `

<div>
   <div id="add-task-board-context">

       <div class="flex-space-between add-board-first-line">
           <h2 class="add-board-heading">Add Task</h2>
           <img class="cp scale-view-up" onclick="closeAddTaskView()" src="/assets/img/board/close.svg">
       </div> 
       <div class="add-board-second-line flex-row">

           <div class="add-board-left-column">
               <div id="title-board-overlay-div">
                   <div id="title-title-board-overlay-div">
                       <span class="add-task-font-styling">Title</span>
                       <span class="red-star-styling">*</span>
                   </div>
                   <input required id="add-task-title-board-overlay-input" class="add-task-placeholder-font-styling"
                                placeholder="Enter a title">
               </div>
               <div id="description-board-overlay-div">
                   <span class="add-task-font-styling">Description</span>
                   <textarea id="add-task-description-board-overlay-textarea" class="add-task-placeholder-font-styling"
                        placeholder="Enter a Description"></textarea>
               </div>
            <div id="assigned-to-board-overlay-div" class="add-task-font-styling">
               <span class="add-task-font-styling">Assigned to</span>
               <div id="assigned-dropdown-board-overlay-div" onclick="toggleBoardOverlayDropDown()">
                   <span class="add-task-font-styling">Select contacts to assign</span>
                   <img id="drop-down-board-overlay-arrow" src="./assets/img/add_task/arrow_drop_down.svg" >
               </div>
               <div id="drop-down-board-overlay-content">
               </div>
           </div>
       </div>
       <div class="add-board-dividing-column">
       </div>
       <div class="add-board-right-column">
           <div id="due-date-board-overlay-div">
               <div>
                   <span class="add-task-font-styling">Due date</span>
                   <span class="red-star-styling">*</span>
               </div>
               <div id="div-board-overlay-dateformchange">
                   <input required id="due-date-board-overlay-input" onfocus="(this.type='date')"
                                                  onblur="(this.type='text')" 
                                       placeholder="dd/mm/yyyy" required>
                   <img id="calendar-image" src="./assets/img/add_task/calendar.png">
               </div>
           </div>
           <div id="prio-board-overlay-div">
               <div id="heading-prio--boar-overlay-div">
                   <span class="add-task-font-styling">Prio</span>
               </div>

               <div class="prio-buttons-board-overlay-div">
                   <div onfocus="addUrgentOverlayStatus()" onblur="removeUrgentOverlayStatus()" class="priority-board-overlay-button toggle-prio-button" id="urgent-board-overlay-button" tabindex="4">
                       <span id="urgent-add-board-overlay-span" class="add-task-font-styling">Urgent</span>
                       
                       <img id="urgent-board-overlay-image" src="./assets/img/add_task/urgent-red.svg">
                   </div>
                   <div  onfocus="addMediumOverlayStatus()" onblur="removeMediumOverlayStatus()" class="priority-board-overlay-button toggle-prio-board-overlay-button" id="medium-board-overlay-button" tabindex="5">
                       <span id="medium-add-board-overlay-span" class="add-task-font-styling">Medium </span>
                      
                       <img id="medium-board-overlay-image" src="./assets/img/add_task/equity_yellow.svg">
                   </div>
                   <div  onfocus="addLowOverlayStatus()" onblur="removeLowOverlayStatus()"  class="priority-board-overlay-button toggle-prio-board-overlay-button" id="low-board-overlay-button" tabindex="6">
                       <span id="low-add-board-overlay-span" class="add-task-font-styling">Low</span>
                       <img id="low-board-overlay-image" src="./assets/img/add_task/low-green.svg">
                   </div>
               </div>
           </div>
       <div id="category-board-overlay-div"> 
           <label for="contacts-assignment">
               <span class="add-task-font-styling">Category</span>
               <span class="red-star-styling">*</span>
           </label>
           <div class="category-border-div">
               <select required id="task-category-board-overlay-select" name="assignment" class="category-board-overlay-flex add-task-font-styling ">
                   <option>Select Task Category</option>
                   <option value="Technical Task">Technical Task</option>
                   <option value="User Story">User Story</option>
               </select>
           </div>

       </div>
       <div id="subtasks-board-overlay-div">
           <span class="add-task-font-styling" id="subtask-title-board-overlay-span">Subtask</span>
           <div id="subtask-input-board-overlay-div">
               <input class="add-task-font-styling" id="subtask-input-board-overlay-field" placeholder="Add new Subtask">
               <img onclick="addNewOverlaySubtask()" id="subtask-add-board-overlay-button" src="./assets/img/add_task/add.png">
           </div>
           <div id="created-board-overlay-subtasks">
           </div>
       </div>
   </div>
       </div>
       <div class="add-board-thirdline">
           <div class="add-board.third-line-left">
               <span class="red-star-styling">*</span>
               <span>This field is required</span>
           </div>
           <div class="add-board-third-line-right">
               <div class="add-board-cancel-div cp" onclick=" closeAddTaskView()" onmouseover="changeCloseLightblue()" onmouseout="changeCloseToBlack()">
                   <span class="add-board-cancel-span">Cancel</span>
                   <img id="cancel-image-add-board" class="add-board-cancel-image" src="/assets/img/board/close.svg">
               </div>
               <div class="add-board-create-div cp" onclick="addTaskBoardOverlay()">
                   <span class="add-board-create-span">Create Task</span>
                   <img  class="add-board-check-image" src="/assets/img/board/check.svg">
               </div>
           </div>
       </div>

   </div>
</div>
`
}



function addTaskBoardOverlay(){

       let titleInput = document.getElementById('add-task-title-board-overlay-input');
       let title = titleInput.value;
       let descriptionTextarea = document.getElementById('add-task-description-board-overlay-textarea');
       let description = descriptionTextarea.value;

       let categorySelect = document.getElementById('task-category-board-overlay-select');
       let category = categorySelect.value;

       let selectedContacts = [];
       let checkboxInputs = document.querySelectorAll('#drop-down-board-overlay-content input[type="checkbox"]');
       checkboxInputs.forEach(input => {
           if (input.checked) {
               let contactIndex = parseInt(input.id);
               selectedContacts.push(contactData[0].contacts[contactIndex]);
           }
       });

  


console.log("Ist:", category)
       let dueDateInput = document.getElementById('due-date-board-overlay-input');
       let dueDate = dueDateInput.value;

       currentOverlayPrio = getCurrentPriority();
   
       let subtasks = getSubtasks();

       let newTask = {
           title : title,
           taskID: generateTaskID(), 
           description: description,
            assigned_contacts: selectedContacts,
           category: category, 
           dueDate: dueDate, 
           prio: currentOverlayPrio, 
           subtasks: subtasks 
       };
       contactData[0].tasks[0].toDo.push(newTask); 
       closeAddTaskView();
        saveTasksToLocalStorage();
        updateHTMLBoard();
      
}


function generateTaskID() {
   let allTasks = [];
   
   contactData[0].tasks.forEach(category => {
       Object.values(category).forEach(tasks => {
           allTasks.push(...tasks);
       });
   });

   let maxID = 0;

   allTasks.forEach(task => {
       if (task && typeof task === 'object' && 'taskID' in task) {
           if (task.taskID > maxID) {
               maxID = task.taskID;
           }
       } else {
           console.error('Invalid task object:', task); 
       }
   });

   return maxID + 1;
}





function addUrgentOverlayStatus(){
   document.getElementById('urgent-board-overlay-image').src = '/assets/img/board/urgent.svg'
   document.getElementById('urgent-add-board-overlay-span').classList.add('font-white')

   currentOverlayPrio = 0;
   console.log("Ist:", currentOverlayPrio)

}

function removeUrgentOverlayStatus(){
   document.getElementById('urgent-board-overlay-image').src = '/assets/img/board/urgent-red.svg'
   document.getElementById('urgent-add-board-overlay-span').classList.remove('font-white')
  
  
   console.log("Ist:", currentOverlayPrio)
}

function addMediumOverlayStatus(){
   document.getElementById('medium-board-overlay-image').src = '/assets/img/board/equity_white.svg'
   document.getElementById('medium-add-board-overlay-span').classList.add('font-white')

   currentOverlayPrio = 1;
   console.log("Ist:", currentOverlayPrio)
}

function removeMediumOverlayStatus(){
   document.getElementById('medium-board-overlay-image').src = '/assets/img/board/equity_yellow.svg'
   document.getElementById('medium-add-board-overlay-span').classList.remove('font-white')

  
   console.log("Ist:", currentOverlayPrio)
}

function addLowOverlayStatus(){
   document.getElementById('low-board-overlay-image').src = '/assets/img/board/low.svg'
   document.getElementById('low-add-board-overlay-span').classList.add('font-white')

   currentOverlayPrio = 2;
   console.log("Ist:", currentOverlayPrio)
}

function removeLowOverlayStatus(){
   document.getElementById('low-board-overlay-image').src = '/assets/img/board/low-green.svg'
   document.getElementById('low-add-board-overlay-span').classList.remove('font-white')

  
   console.log("Ist:", currentOverlayPrio)
}



function getCurrentPriority() {

   console.log("Ist:", currentOverlayPrio)
   
   if ( currentOverlayPrio == 0) {
       return 0;
   } else if (currentOverlayPrio == 1) {
       return 1;
   } else if (currentOverlayPrio == 2) {
       return 2;
   } else {
       // Standardpriorität, falls keine ausgewählt ist
       return 5;
   }
}




function getSelectedContactIds() {
   let checkboxes = document.querySelectorAll('#drop-down-board-overlay-content input[type="checkbox"]');
   
   let selectedIds = Array.from(checkboxes)
       .filter(checkbox => checkbox.checked)
       .map(checkbox => parseInt(checkbox.getAttribute('data-contact-id')));

   return selectedIds;
   
}







function renderBoardOverlayDropDown() {
   document.getElementById('drop-down-board-overlay-content').innerHTML = '';

   for (let i = 0; i < contactData[0].contacts.length; i++) {
       let singleContact = contactData[0].contacts[i];

       document.getElementById('drop-down-board-overlay-content').innerHTML += `
           <label class="f-btw"  >
               <div class="dropdown-span-block">
                   <span id="specificColor${i}" class="initials-dropdown-styling" style="background-color: ${singleContact.avatarColor};">${singleContact.ini_first}${singleContact.ini_name}</span>
                   <span>${singleContact.first} ${singleContact.name}</span>
               </div>
               <input type="checkbox" id="${i}">
           </label>
       `;
   }
}


function toggleBoardOverlayDropDown() {

   if (DROP_DOWN_ADD_BORD_VIEW == false) {

       document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = '';
       document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = `

<input onkeyup="filterBoardOverlayContacts()" id="assign-search-board-overlay-input" type="text">
<img id="turned-drop-down-board-overlay-image" src="./assets/img/add_task/turned_arrow_drop_down.svg">
`
       renderBoardOverlayDropDown()
       DROP_DOWN_ADD_BORD_VIEW = true;
       document.getElementById('drop-down-board-overlay-content').classList.remove('d-none');
       focusboardOverlaySearchInputField()
   }
   else {

       document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = '';
       document.getElementById('assigned-dropdown-board-overlay-div').innerHTML = `
   <span class="add-task-font-styling">Select contacts to assign</span>
   <img class="hover-lg" id="drop-down-board-overlay-arrow" src="./assets/img/add_task/arrow_drop_down.svg">
   `
       document.getElementById('drop-down-board-overlay-content').classList.add('d-none');

       DROP_DOWN_ADD_BORD_VIEW = false;
   }
}


function focusboardOverlaySearchInputField() {
   let inputField = document.getElementById('assign-search-board-overlay-input');
   inputField.focus();
   inputField.select();
}




function filterBoardOverlayContacts() {
   addNameInitialToContacts(contactData);
   addInitialsOfFirstNames(contactData);

   let search = document.getElementById('assign-search-board-overlay-input').value;
   search = search.toLowerCase();
   let searchedContactContainer = document.getElementById('drop-down-board-overlay-content');
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




function closeAddTaskView(){
   hideOverlay()   
document.getElementById('add-task-id-overlay').classList.remove('showAddTask')
}


function changeCloseLightblue(){
   document.getElementById('cancel-image-add-board').src = '/assets/img/board/close_lightblue.svg'; 
}

function changeCloseToBlack(){
   document.getElementById('cancel-image-add-board').src = '/assets/img/board/close.svg'; 
}


function addNewOverlaySubtask() {
   let subtaskInput = document.getElementById('subtask-input-board-overlay-field');
   let subtaskValue = subtaskInput.value.trim();

   if (subtaskValue !== '') {
       let createdSubtasksDiv = document.getElementById('created-board-overlay-subtasks');

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


function getSubtasks() {
   let createdSubtasksDiv = document.getElementById('created-board-overlay-subtasks');
   let subtaskElements = createdSubtasksDiv.getElementsByClassName('created-board-overlay-subtasks');
   let subtaskId = 1;
   let subtasks = Array.from(subtaskElements).map(element => {
       let subtaskDescription = element.textContent.trim();
       subtaskDescription = subtaskDescription.slice(0, -1).trim();
       let subtask = {
           "id": subtaskId,
           "title": subtaskDescription,
           "status": "notDone",
           "description": subtaskDescription
       };
       subtaskId++;
       return subtask;
   });
   return subtasks;
}


