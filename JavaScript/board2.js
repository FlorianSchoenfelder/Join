tasks = [

    {
        "id": 1,
        "category": "user_story",
        "title": "User",
        "assignedTo": [0, 5, 6],
        "prio": "mid",
        "status": "in_progress"
    },

    {
        "id": 2,
        "category": "tecnical_task",
        "title": "User",
        "assignedTo": [0, 5, 6],
        "prio": "mid",
        "status": "technical_tassk"
    }


];


function init() {
    renderBoardTasks()
}



function renderBoardTasks() {

    let progressCat = tasks.filter(t => t['status'] == 'in_progress');
    document.getElementById('in-progress-column').innerHTML = '';

    for (let index = 0; index < progressCat.length; index++) {
        const element = progressCat[index];
        document.getElementById('in-progress-column').innerHTML += `
        
        <div>Hallo</div>
        
        
        `

    }





}