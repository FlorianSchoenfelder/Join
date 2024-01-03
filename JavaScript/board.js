let todos = [{
    'id': 0,
    'title': 'Putzen',
    'category': 'open'
}, {
    'id': 1,
    'title': 'Kochen',
    'category': 'open'
}, {
    'id': 2,
    'title': 'Backen',
    'category': 'closed'
}, {
    'id': 3,
    'title': 'Gießen',
    'category': 'reviewed'
}];


let currentDraggedElement;

function updateHTML() {
    let open = todos.filter(t => t['category'] == 'open');

    document.getElementById('open').innerHTML = '';
    document.getElementById('open').innerHTML = `<h2 class="underline">Open</h2>`;

    for (let index = 0; index < open.length; index++) {
        const element = open[index];
        document.getElementById('open').innerHTML += generateTodoHTML(element);
    }

    let closed = todos.filter(t => t['category'] == 'closed');

    document.getElementById('closed').innerHTML = '';
    document.getElementById('closed').innerHTML = `<h2 class="underline">Closed</h2>`;

    for (let index = 0; index < closed.length; index++) {
        const element = closed[index];
        document.getElementById('closed').innerHTML += generateTodoHTML(element);
    }

    let reviewed = todos.filter(t => t['category'] == 'reviewed');

    document.getElementById('reviewed').innerHTML = '';
    document.getElementById('reviewed').innerHTML = `<h2 class=""underline">Reviewed</h2>`;

    for (let index = 0; index < reviewed.length; index++) {
        const element = reviewed[index];
        document.getElementById('reviewed').innerHTML += generateTodoHTML(element);
    }

}

function startdragging(id) {
    currentDraggedElement = id;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(category) {
    todos[currentDraggedElement]['category'] = category;
    updateHTML();
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startdragging(${element['id']})" ondrop="moveTo(category)" ondragover="allowdrop(ev)" class="todo">${element['title']}</div>`;

}