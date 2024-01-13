function stopPropagation(event) {
    event.stopPropagation();
}

function openAddContactPopup() {
    document.getElementById('addContactPopupContainer').classList.add('darkBackground');
    document.getElementById('addContactPopupContainer').classList.remove('d-none');
    document.getElementById('addContactPopup').style = 'transform: translateX(0)';
}


function closeAddContactPopup() {
    document.getElementById('addContactPopupContainer').classList.remove('darkBackground');
    // dela(myStopFunction(), 5000);
    setTimeout(() => myStopFunction(), 2000)
    document.getElementById('addContactPopup').style = 'transform: translateX(100%)';
}



function myStopFunction() {
    document.getElementById('addContactPopupContainer').classList.add('d-none');
//   clearTimeout(myTimeout);
}