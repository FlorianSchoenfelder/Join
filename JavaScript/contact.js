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

function render() {
  // Extrahiert die Anfangsbuchstaben aus contactList-Array und speichert diese ohne Duplikate in einem neuen Array
  const initials = Array.from(
    new Set(
      contactList.map((contact) => contact.firstname.charAt(0).toUpperCase())
    )
  );
  const contactListContainer = document.getElementById("contactList");
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
      let userProfilInitials = contact["firstname"].charAt(0) + contact["name"].charAt(0);
      let avatarColor = contact["avatarColor"];
      const listItem = document.createElement("li");
      listItem.innerHTML = /*html*/ `
      <div class="d-flex">
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
