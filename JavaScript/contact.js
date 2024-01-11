function stopPropagation(event) {
    event.stopPropagation();
}

function openAddContactPopup() {
    document.getElementById('addContactPopupContainer').style = 'transform: translateX(0)';
    document.body.style = 'background-color: rgba(0, 0, 0, 0.3)';
    
}


function closeAddContactPopup() {
    document.getElementById('addContactPopupContainer').style = 'transform: translateX(100%)';
    document.body.style = 'background-color: transparent';
}