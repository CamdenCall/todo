let tasks = {
}
function updateTasks(){
    let checkboxes = document.querySelectorAll("input[type=checkbox]")
    console.log(tasks)
    checkboxes.forEach(element => {
        let task = element.parentElement
        let taskText = task.querySelector(".task-text p").textContent
        console.log(taskText)
        element.addEventListener("click", () => {
            element.parentElement.parentElement.classList.toggle("checked")
            tasks[taskText].completed = true
            console.log(tasks)
        })
    })
    document.querySelectorAll(".delete").forEach((element) => {
        let task = element.parentElement.parentElement
        element.addEventListener("click", () => {
            removeTask(task.textContent)
            task.remove()
        })
    })
    document.querySelectorAll(".edit").forEach((element) => {
        let task = element.parentElement.parentElement
        let taskText = task.querySelector(".task-text p")
        let editInput = task.querySelector("input[type=text]")
        element.addEventListener("click", () => {
            taskText.textContent = ""
            let input = task.querySelectorAll("input")
        })
    })
}
function removeTask(task) {
    const index = tasks.indexOf(task);
    if (index > -1) {
        tasks.splice(index, 1);
    }
}
function resetList() {
    const taskViewDiv = document.querySelector('.tasks-list');
    taskViewDiv.innerHTML = ""
}
function updateList() {
    resetList()
    for(let task in tasks) {
        const taskViewDiv = document.querySelector('.tasks-list');

        // Create the outer div with class "task"
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // Create the inner div
        const innerDiv = document.createElement('div');
        innerDiv.classList.add("task-text")

        // Create the checkbox input element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create the paragraph element for task details
        const taskDetails = document.createElement('p');
        taskDetails.classList.add('task-details');
        taskDetails.textContent = task; // Add your task text here

        const edit = document.createElement('input');
        edit.type = "text"
        edit.placeholder = task
        edit.classList.add('edit'); // Add your task text here

        // Append checkbox and taskDetails to the inner div
        innerDiv.appendChild(checkbox);
        innerDiv.appendChild(taskDetails);
        innerDiv.appendChild(edit)

        // Create the tools div
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('tools');

        // Create the edit icon
        const editIcon = document.createElement('img');
        editIcon.src = 'images/edit.svg';
        editIcon.height = 30; // Set height to 30
        editIcon.classList.add('edit');

        // Create the delete icon
        const deleteIcon = document.createElement('img');
        deleteIcon.src = 'images/delete.svg';
        deleteIcon.classList.add('delete');

        // Append the edit and delete icons to the tools div
        toolsDiv.appendChild(editIcon);
        toolsDiv.appendChild(deleteIcon);

        // Append the inner div and tools div to the task div
        taskDiv.appendChild(innerDiv);
        taskDiv.appendChild(toolsDiv);

        // Now append the taskDiv to the task-view div
        if (taskViewDiv) {
            taskViewDiv.appendChild(taskDiv);
        } else {
            console.error('Div with class "task-view" not found');
        } // Or any other container instead of body

    }
}


function addTask() {
    let task = document.getElementById("task").value
    tasks[task] = {completed: false}
    updateList()
    document.getElementById("task").value = ""
    updateTasks()
}