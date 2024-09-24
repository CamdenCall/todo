var checkboxes = document.querySelectorAll("input[type=checkbox]")
var tasks = []
checkboxes.forEach(element => {
    element.addEventListener("click", function() {
        element.parentElement.parentElement.classList.toggle("checked")
    })
})
function resetList() {
    const taskViewDiv = document.querySelector('.tasks-list');
    taskViewDiv.innerHTML = ""
}
function updateList() {
    resetList()
    for (let i = 0; i < tasks.length; i++) {
        const taskViewDiv = document.querySelector('.tasks-list');

        // Create the outer div with class "task"
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        // Create the inner div
        const innerDiv = document.createElement('div');

        // Create the checkbox input element
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';

        // Create the paragraph element for task details
        const taskDetails = document.createElement('p');
        taskDetails.classList.add('task-details');
        taskDetails.textContent = tasks[i]; // Add your task text here

        // Append checkbox and taskDetails to the inner div
        innerDiv.appendChild(checkbox);
        innerDiv.appendChild(taskDetails);

        // Create the tools div
        const toolsDiv = document.createElement('div');
        toolsDiv.classList.add('tools');

        // Create the edit icon
        const editIcon = document.createElement('img');
        editIcon.src = 'images/edit.svg';
        editIcon.height = 30; // Set height to 30

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
    var task = document.getElementById("task").value
    tasks.push(task)
    updateList()
    document.getElementById("task").value = ""
    console.log(tasks)
}