function stopPropagation(event) {
    event.stopPropagation();
}

// function openAddContactPopup() {
//     document.getElementById('darkBackgroundContainer').classList.remove('swipeOut');
//     document.getElementById('darkBackgroundContainer').classList.add('darkBackground'); //Hintergrundfarbe grau hinzufügen
//     document.getElementById('darkBackgroundContainer').classList.remove('d-none'); // Container sichtbar machen
//     document.getElementById('addContactPopup').style = 'transform: translateX(0)'; // Popup hereinswipen
// }

// function closeAddContactPopup() {
//     document.getElementById('addContactPopup').style = 'transform: translateX(100%)'; // Popup herausswipen
//     document.getElementById('darkBackgroundContainer').classList.add('swipeOut');
//     setTimeout(myStopFunction, 250);
// }



// function myStopFunction() {
//     document.getElementById('darkBackgroundContainer').classList.add('d-none');
//     document.getElementById('darkBackgroundContainer').classList.remove('darkBackground');
// }