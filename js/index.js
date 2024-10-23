class Tasks {
    constructor() {
        this.tasks = this.defualt()
    }
    updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(this.tasks))
    }
    getLocalStorage() {
        return JSON.parse(localStorage.getItem("tasks"))
    }
    getCurrentList() {
        return this.tasks.find((list) => list.name === localStorage.getItem("list"));
    }
    getCurrentLocalList() {
        return this.getLocalStorage().find((list) => list.name === localStorage.getItem("list"));
    }

    addTask() {
        let task = document.getElementById("task").value
        const list = this.getCurrentList()
        list.tasks.push({task: task, completed: false})
        document.getElementById("task").value = ""
        this.update()
    }

    removeTask(task) {
        const list = this.getCurrentList()
        list.tasks = list.tasks.filter(item => item.task !== task);
        this.update()
    }

    editTask(task, updatedTask) {
        const list = this.getCurrentList()
        list.tasks.forEach(oldTask => {
            if (oldTask.task == task) {
                oldTask.task = updatedTask
            }
        })
        this.update()
    }

    resetList() {
        const taskViewDiv = document.querySelector('.tasks-list');
        taskViewDiv.innerHTML = ""
    }

    updateTaskList() {
        this.resetList()
        const list = this.getCurrentLocalList()
        console.log(list)
        let tasks = list.tasks
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
            taskDetails.textContent = tasks[task].task; // Add your task text here
    
            const edit = document.createElement('input');
            edit.type = "text"
            edit.placeholder = "task name"
    
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

    updateTasks(){
        let checkboxes = document.querySelectorAll("input[type=checkbox]")
        checkboxes.forEach(element => {
            let task = element.parentElement
            let taskText = task.querySelector(".task-text p").textContent
            element.addEventListener("click", () => {
                element.parentElement.parentElement.classList.toggle("checked")
                let list = this.getCurrentList()
                list.tasks.forEach(oldTask => {
                    if (oldTask.task == taskText) {
                        if (oldTask.completed == true) {
                            oldTask.completed = false;
                        } else {
                           oldTask.completed = true; 
                        }
                        
                    }
                })
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
    resetSide(){
        const elements = document.getElementsByClassName("list-name");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }
    }
    updateLists() {
        const lists = this.getLocalStorage()
        this.resetSide()
        for (let list in lists) {
            let listHeader = document.getElementById("list-header")
            listHeader.textContent = this.getCurrentLocalList().name
            let listName = lists[list].name
            let sideList = document.querySelector(".task-list")
            let listElement = document.createElement("div")
            listElement.textContent = listName
            listElement.classList.add("list-name")
            sideList.appendChild(listElement)
            document.querySelectorAll(".list-name").forEach((element) => {
                element.addEventListener("click", () => this.viewList(element));
            });       
        }

    }
    update() {
        try {
            this.updateLocalStorage()
            this.updateLists()
            this.updateTaskList()
            this.updateTasks()
        } catch(e) {
            //console.error(e)
        }
    }

    addList() {
        let listName = document.getElementById("listName").value
        this.tasks.push({name: listName, tasks: []})
        this.update()
    }
    defualt() {
        if (this.getLocalStorage() == null) {
            let defaultList = [{name: "default", tasks: []}]
            localStorage.setItem("tasks", JSON.stringify(defaultList))
            localStorage.setItem("list", "default")
            return this.getLocalStorage()
        } else {
            return this.getLocalStorage()
        }
    }
    deleteList(element) {
        let name = this.getCurrentList().name
        console.log(name)
        this.tasks = this.tasks.filter(list => list.name !== name)
        console.log(this.tasks)
        if (this.tasks.length > 0) {
            localStorage.setItem("list", this.tasks[0].name)
        } else {
            this.tasks = [{ name: "default", tasks: [] }];
            localStorage.setItem("list", "default");
        }
        this.update()
    }

    viewList(element) {
        let listName = element.textContent
        localStorage.setItem("list", listName)
        let listHeader = document.getElementById("list-header")
        listHeader.textContent = localStorage.getItem("list")
        this.update()
        
    }

    closePopup() {
        let popup = document.querySelector(".popup")
        popup.style.display = "none";
    }

    openPopup() {
        let popup = document.querySelector(".popup")
        popup.style.display = "flex";
    }
}
let tasks = new Tasks()
tasks.defualt()
tasks.update()