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
    avatarColor: "yellow",
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
    avatarColor: "darkpurple",
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
      const listItem = document.createElement("li");
      listItem.innerHTML = /*html*/ `
      <div class="d-flex">
        <div>
          <img src="/assets/img/ellipse.svg" alt="">
        
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
