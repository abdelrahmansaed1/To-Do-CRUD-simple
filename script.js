    let tasks = [
        // {
        //     "task" : "read a book",
        //     "date" : "19/6/2002",
        //     "isDone" : false
        // },
        // {
        //     "task" : "read book",
        //     "date" : "19/6/2002",
        //     "isDone" : false
        // },
        // {
        //     "task" : "read ",
        //     "date" : "19/6/2002",
        //     "isDone" : true
        // }
    ]
    // ==========Storage Functions===========
    function getTasksFromStorage() {
        let retrievedTasks = JSON.parse(localStorage.getItem('tasks'))
        tasks = retrievedTasks ?? []
    }
    function storeTasks() {
        let tasksString = JSON.stringify(tasks)
        localStorage.setItem("tasks", tasksString)
    }
    // /==========Storage Functions===========/
    getTasksFromStorage()
    storeTasks()
    function fillInTable(){
        document.getElementsByClassName("tasks")[0].innerHTML = " "
        
        let index = 0
        tasks.forEach(ele => {
        document.getElementsByClassName("tasks")[0].innerHTML +=
        `
            <div class="task ${ele.isDone ? "done" : ''}">
                <div class="info">
                    <p>${ele.task}</p>
                    <span>${ele.date}</span>
                </div>
                <div class="action">
                    <button onclick="deleteTask(${index})" class="circular delete white"><span class="material-symbols-outlined">
                        delete
                        </span></button>
                    ${ ele.isDone ? 
                        `<button onclick="toggleTaskCompletion(${index})" class="circular cancel white"><span class="material-symbols-outlined">
                        cancel
                        </span></button>`
                        : 
                    `<button onclick="toggleTaskCompletion(${index})" class="circular done white"><span class="material-symbols-outlined">
                        check
                        </span></button>`
                    }
                    <button onclick="editTask(${index})" class="circular update white"><span class="material-symbols-outlined">
                    edit
                    </span></button>
                </div>
            </div>  

            `
            index++
    });
    }
    fillInTable()

    document.getElementById("add").addEventListener("click",() =>{
        let taskName = prompt("Add Task")
        let now = new Date()
        let date = (now.getDay() + 1) + '/' + (now.getMonth() + 1) + '/' + now.getFullYear() + " | " + now.getHours() + ":" + now.getMinutes()
        let taskObj = {

                "task" : taskName,
                "date" : date,
                "isDone" : false,
            }
        
        tasks.push(taskObj)
        storeTasks()
        fillInTable()
    })
    function deleteTask(index){
        let task = tasks[index]
        let isConfirmed = confirm("Are You Sure To Delete: " + task.task)
        
        if(isConfirmed){
            tasks.splice(index,1)
            storeTasks()
            fillInTable()
        }

    }
    function editTask(index){
        let task = tasks[index]
        let newTask = prompt("Enter The New Task", task.task)
        task.task = newTask
        storeTasks()
        fillInTable()
    }
    function toggleTaskCompletion(index) {
        let task = tasks[index]
        task.isDone = !task.isDone
        storeTasks()
        fillInTable()
        
    }
    