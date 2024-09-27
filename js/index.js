class Tasks {
    constructor() {
        this.tasks = {}
    }
    updateTasks() {
        let checkboxes = document.querySelectorAll("input[type=checkbox]")
        checkboxes.forEach(element => {
            let task = element.parentElement
            let taskText = task.querySelector(".task-text p").textContent
            element.addEventListener("click", () => {
                element.parentElement.parentElement.classList.toggle("checked")
                this.tasks[taskText].completed = true
            })
        })
        document.querySelectorAll(".delete").forEach((element) => {
            let task = element.parentElement.parentElement
            element.addEventListener("click", () => {
                this.removeTask(task.textContent)
                task.remove()
            })
        })
        document.querySelectorAll(".edit").forEach((element) => {
            let task = element.parentElement.parentElement
            let taskText = task.querySelector(".task-text p")
            let oldTask = taskText.textContent;
            let input = task.querySelector("input[type=text]")
            element.addEventListener("click", () => {
                taskText.style.display = "none";
                input.style.display = "block";
                input.value = oldTask;
                //When the user clicks enter it saves the text
                input.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                      let newTask = input.value
                      this.editTask(oldTask, newTask)
                      input.style.display = "none";
                      taskText.style.display = "block";
                      taskText.textContent = newTask;
                    }
                })
            })
        })
    }

    removeTask(task) {
        if (this.tasks.hasOwnProperty(task)) {
            delete this.tasks[task];
        }
    }

    editTask(task, updatedTask) {
        if (this.tasks.hasOwnProperty(task)) {
            const completed = this.tasks[task].completed
            delete this.tasks[task];
            this.tasks[updatedTask] = {completed: completed}
            console.log(this.tasks)
        }
    }
    

    resetList() {
        const taskViewDiv = document.querySelector('.tasks-list');
        taskViewDiv.innerHTML = ""
    }
    updateList() {
        this.resetList()
        for(let task in this.tasks) {
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
    addTask() {
        let task = document.getElementById("task").value
        this.tasks[task] = {completed: false}
        this.updateList()
        document.getElementById("task").value = ""
        this.updateTasks()
    }
}
let tasks = new Tasks()