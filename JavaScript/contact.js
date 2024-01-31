let contactList = [
  {
    firstname: "Anton",
    name: "Mayer",
    avatarColor: "orange",
    phoneNumber: "491111111111",
    email: "antom@gmail.com",
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
    email: "",
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
  let contacts = document.getElementById("contactList");
  contacts.innerHTML = "";

  for (let i = 0; i < contactList.length; i++) {
    const contact = contactList[i];
    const firstname = contact["firstname"];
    const name = contact["name"];
    const email = contact["email"];
    const firstLetterFirstname = contact["firstname"].charAt(0);
    const firstLetterName = contact["name"].charAt(0);

    contacts.innerHTML += /*html*/ `
        <div class="contacts">
            <div class="firstLetters">
                ${firstLetterFirstname}${firstLetterName} 
            </div>

            <div class="">
                ${firstname} ${name} <br>
                <a class="emailLink" href="#">${email}</a>
            </div>
        </div>
       `;
  }
}
