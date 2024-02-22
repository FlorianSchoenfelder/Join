let contactList = [
  {
    firstname: "Anton",
    name: "Mayer",
    avatarColor: "orange",
    phoneNumber: "491111111111",
    email: "anton@gmail.com",
  },
  {
    firstname: "Anja",
    name: "Schulz",
    avatarColor: "purple",
    phoneNumber: "493333333333",
    email: "schulz@hotmail.com",
  },
  {
    firstname: "Benedikt",
    name: "Ziegler",
    avatarColor: "blue",
    phoneNumber: "494444444444",
    email: "benedikt@gmail.com",
  },
  {
    firstname: "David",
    name: "Berg",
    avatarColor: "pink",
    phoneNumber: "495555555555",
    email: "davidberg@gmail.com",
  },
  {
    firstname: "Eva",
    name: "Fischer",
    avatarColor: "orange",
    phoneNumber: "496666666666",
    email: "eva@gmail.com",
  },
  {
    firstname: "Emmanuel",
    name: "Mauer",
    avatarColor: "green",
    phoneNumber: "497777777777",
    email: "emmanuelma@gmail.com",
  },
  {
    firstname: "Marcel",
    name: "Bauer",
    avatarColor: "purple",
    phoneNumber: "498888888888",
    email: "bauer@gmail.com",
  },
  {
    firstname: "Tatjana",
    name: "Wolf",
    avatarColor: "red",
    phoneNumber: "492222222222",
    email: "wolf@gmail.de",
  },
];

let listElementIds = [];
let currentListItem;
let currentContactId;


function stopPropagation(event) {
  event.stopPropagation();
}

function openAddContactPopup() {
  document
    .getElementById("darkBackgroundContainer")
    .classList.remove("swipeOut");
  document
    .getElementById("darkBackgroundContainer")
    .classList.add("darkBackground"); //Hintergrundfarbe grau hinzufügen
  document.getElementById("darkBackgroundContainer").classList.remove("d-none"); // Container sichtbar machen
  document.getElementById("addContactPopup").style = "transform: translateX(0)"; // Popup hereinswipen
}

function closeAddContactPopup() {
  document.getElementById("addContactPopup").style =
    "transform: translateX(100%)"; // Popup herausswipen
  document.getElementById("darkBackgroundContainer").classList.add("swipeOut");
  setTimeout(myStopFunction, 250);
}

function myStopFunction() {
  document.getElementById("darkBackgroundContainer").classList.add("d-none");
  document
    .getElementById("darkBackgroundContainer")
    .classList.remove("darkBackground");
}

async function render() {
  await includeHTML();
  // Extrahiert die Anfangsbuchstaben aus contactList-Array und speichert diese ohne Duplikate in einem neuen Array
  const initials = Array.from(
    new Set(
      contactList.map((contact) => contact.firstname.charAt(0).toUpperCase())
    )
  );
  const contactListContainer = document.getElementById("contactList");
  contactListContainer.innerHTML = "";
  for (let i = 0; i < initials.length; i++) {
    const initial = initials[i];
    // Anfangsbuchstabe hinzufügen
    const initialHeader = document.createElement("h2");
    initialHeader.textContent = initial;
    initialHeader.classList.add("initial-header");
    contactListContainer.appendChild(initialHeader);

    // Namen nach Anfangsbuchstaben filtern und in HTML einfügen
    const filteredContacts = filterContactsByFirstLetter(contactList, initial);
    const namesList = document.createElement("ul");
    namesList.classList.add("names-list");
    for (let j = 0; j < filteredContacts.length; j++) {
      const contact = filteredContacts[j];
      let userProfilInitials =
        contact["firstname"].charAt(0) + contact["name"].charAt(0);
      let avatarColor = contact["avatarColor"];
      const listItem = document.createElement("li");
      const listElementId = `contactItem_${initial}_${j}`;
      if (!listElementIds.includes(listElementId)) {
      listItem.id = listElementId;
      listElementIds.push(listElementId);
      }
      listItem.innerHTML = /*html*/ `
      <div onclick="showContactInfo(${j}, '${initials[i]}')" class="d-flex">
        <div id="svg-userProfil">
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill=${avatarColor} stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
              ${userProfilInitials}
            </text>
          </svg>
        </div>
      
        <div class="contact">
          ${contact.firstname} ${contact.name} <br>
          <a class="emailLink" href="#">${contact.email}</a>
        </div>
      </div>
    `;
      listItem.classList.add("contact-item");
      namesList.appendChild(listItem);
    }
    contactListContainer.appendChild(namesList);
  }

  // Fügt das neue Attribut 'id' hinzu
  for (let i = 0; i < contactList.length; i++) {
    contactList[i].id = i;
  }
}

function filterContactsByFirstLetter(contactList, firstLetter) {
  const filteredContacts = [];
  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i];
    if (
      contact.firstname.charAt(0).toUpperCase() === firstLetter.toUpperCase()
    ) {
      filteredContacts.push(contact);
    }
  }
  return filteredContacts;
}

function showContactInfo(contactIndex, initial) {
  const contact = filterContactsByFirstLetter(contactList, initial)[
    contactIndex
  ];
  currentContactId = contact.id;
  let contactInfo = document.getElementById("current-contact");
  contactInfo.innerHTML = "";
  contactInfo.innerHTML += /*html*/ `
      <div class="current-contact">
        <div class="userprofil-top d-flex">
          <div>
          <svg width="120" height="120" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="21" cy="21" r="20" fill=${
              contact.avatarColor
            } stroke="white" stroke-width="2"/>
            <text x="50%" y="50%" text-anchor="middle" alignment-baseline="middle" font-size="12" font-family="Inter, sans-serif" font-weight="400" fill="white">
              ${contact["firstname"].charAt(0) + contact["name"].charAt(0)}
            </text>
          </svg>
          </div>

          <div class="userprofil-top-right-side">
            <div class="current-name">${contact["firstname"]} ${contact["name"]}</div>
            <div class="edit-and-delete d-flex">
              <div onclick="editCurrentContact(${contact.id})" class="edit"><img id="editIcon" src="/assets/img/edit.svg" alt=""> <span>Edit</span></div>
              <div onclick="deleteCurrentContact(${contact.id})" class="delete"><img id="deleteIcon" src="/assets/img/delete.svg" alt=""> <span>Delete</span></div>
            </div>
          </div>
        </div>

        <div class="contact-info"><span>Contact Information</span></div>

        <div class="email-and-phone">
          <span><b>Email</b></span>
          <a class="emailLink" href="#">${contact.email}</a>
          <span><b>Phone</b></span>
          <div>${contact.phoneNumber}</div>
        </div>
      </div>
  `;


  ListElementBackground();

}

function ListElementBackground() {
  // Durch jedes Listenelement iterieren
  for (let i = 0; i < listElementIds.length; i++) {
    const id = listElementIds[i];
    const listItem = document.getElementById(id);
    
    // Wenn das Listenelement gefunden wurde
    if (listItem) {
      // Eventlistener hinzufügen
      listItem.onclick = function() {
        // Zurücksetzen der vorherigen Auswahl
        if (currentListItem) {
          currentListItem.style.backgroundColor = ""; // Zurück zur Standardfarbe
          currentListItem.style.color = "";
        }

        // Aktualisierung des aktuellen Listenelements
        setTimeout(() => {
          this.style.backgroundColor = "#2A3647"; // Ändert die Eigenschaften des list-Elements
          this.style.borderRadius = "10px";
          this.style.color = "#FFFFFF";
        }, 200);
        currentListItem = this;
      };
    }
  }
} 

function createNewContact() {
  let fullname = document.getElementById("newContactName").value;
  let spaceIndex = fullname.indexOf(" ");
  let firstname = fullname.substring(0, spaceIndex);
  let name = fullname.substring(spaceIndex + 1);
  let email = document.getElementById("newContactEmail").value;
  let phone = document.getElementById("newContactPhone").value;

  firstname = firstname.charAt(0).toUpperCase() + firstname.slice(1);
  name = name.charAt(0).toUpperCase() + name.slice(1);

  const newContact = {
    firstname: firstname,
    name: name,
    avatarColor: getRandomAvatarColor(),
    email: email,
    phoneNumber: phone,
  };

  contactList.push(newContact);

  render();
}

function getRandomAvatarColor() {
  const colors = [
    "blue",
    "green",
    "orange",
    "pink",
    "purple",
    "red",
    "turquoise",
  ];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function editCurrentContact(contactID) {
  openEditCurrentContactPopUp();
  
  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].id === contactID) {
      document.getElementById('editContactName').value = contactList[i].firstname + " " + contactList[i].name;
      document.getElementById('editContactEmail').value = contactList[i].email;
      document.getElementById('editContactPhone').value = contactList[i].phoneNumber;
      break;
    }
  }
}

function openEditCurrentContactPopUp() {
document
  .getElementById("darkBackgroundContainer")
  .classList.remove("swipeOut");
document
  .getElementById("darkBackgroundContainer")
  .classList.add("darkBackground"); //Hintergrundfarbe grau hinzufügen
document.getElementById("darkBackgroundContainer").classList.remove("d-none"); // Container sichtbar machen
document.getElementById("editContactPopup").style = "transform: translateX(0)"; // Popup hereinswipen

}

function closeEditContactPopup() {
  document.getElementById("editContactPopup").style =
    "transform: translateX(100%)"; // Popup herausswipen
  document.getElementById("darkBackgroundContainer").classList.add("swipeOut");
  setTimeout(myStopFunction, 250);
}

function deleteCurrentContact(contactID) {

  for (let i = 0; i < contactList.length; i++) {
    if (contactList[i].id === contactID) {
      contactList.splice(contactID, 1);
      listElementIds.splice(contactID, 1);
      break;
    }
  }

  let currentContactContainer = document.getElementById("current-contact");
  currentContactContainer.innerHTML = "";
  
  render();
}

function saveCurrentContact() {
  
  for (let i = 0; i < contactList.length; i++) {
    let contactID = currentContactId;

    let newFullName = document.getElementById('editContactName').value;
    let spaceIndex = newFullName.indexOf(" ");
    let newFirstname = newFullName.substring(0, spaceIndex);
    let newName = newFullName.substring(spaceIndex + 1);

    let newEmail = document.getElementById('editContactEmail').value;
    let newPhone = document.getElementById('editContactPhone').value;
    if (contactList[i].id === contactID) {
      contactList[contactID].firstname = newFirstname;
      contactList[contactID].name = newName;
      contactList[contactID].email = newEmail;
      contactList[contactID].phoneNumber = newPhone;
      break;
    }
  }

  closeEditContactPopup()
  render();
}
