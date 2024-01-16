let checkbox = false;

// function inti() {
//     changeOpacity();
    
// }

// function changeOpacity() {
//     document.getElementById('loginFrame').classList.add('opacityAnimation');
//     document.getElementById('loginFrame').classList.remove('opacity');
// }

function changeCheckbox() {
    if (!checkbox == true) {
        checkbox = true;
    }else {
        checkbox = false;
    }
    switchCheckboxImage();
}

function switchCheckboxImage(){
    if (!checkbox == false) {
        document.getElementById('notChecked').classList.add('d-none');
        document.getElementById('notChecked').classList.remove('d-block');
        document.getElementById('checked').classList.add('d-block');
        document.getElementById('checked').classList.remove('d-none');
    }else {
        document.getElementById('notChecked').classList.add('d-block');
        document.getElementById('notChecked').classList.remove('d-none');
        document.getElementById('checked').classList.add('d-none');
        document.getElementById('checked').classList.remove('d-block');
    }
}

