function stopPropagation(event) {
    event.stopPropagation();
}

function openAddContactPopup() {
    document.getElementById('darkBackgroundContainer').classList.add('darkBackground');
    document.getElementById('darkBackgroundContainer').classList.remove('d-none');
    document.getElementById('addContactPopup').style = 'transform: translateX(0)';
}


function closeAddContactPopup() {
    setTimeout(() => myStopFunction(), 250)
    document.getElementById('addContactPopup').style = 'transform: translateX(100%)';
}



function myStopFunction() {
    document.getElementById('darkBackgroundContainer').classList.add('d-none');
    document.getElementById('darkBackgroundContainer').classList.remove('darkBackground');
}