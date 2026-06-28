let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let currentFilter = "all";

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = tasks.filter(task => {

        if(currentFilter === "active")
            return !task.completed;

        if(currentFilter === "completed")
            return task.completed;

        return true;

    });

    filtered.forEach((task,index)=>{

        let li=document.createElement("li");

        if(task.completed)
            li.classList.add("completed");

        li.innerHTML=`
        <span>${task.text}</span>

        <div class="actions">

        <button class="complete">${task.completed?"Undo":"Done"}</button>

        <button class="edit">Edit</button>

        <button class="delete">Delete</button>

        </div>
        `;

        li.querySelector(".complete").addEventListener("click",()=>{

            let realIndex=tasks.indexOf(task);

            tasks[realIndex].completed=!tasks[realIndex].completed;

            saveTasks();

            renderTasks();

        });

        li.querySelector(".edit").addEventListener("click",()=>{

            let newTask=prompt("Edit Task",task.text);

            if(newTask!==null && newTask.trim()!==""){

                let realIndex=tasks.indexOf(task);

                tasks[realIndex].text=newTask;

                saveTasks();

                renderTasks();

            }

        });

        li.querySelector(".delete").addEventListener("click",()=>{

            let realIndex=tasks.indexOf(task);

            tasks.splice(realIndex,1);

            saveTasks();

            renderTasks();

        });

        taskList.appendChild(li);

    });

}

addBtn.addEventListener("click",()=>{

    let text=taskInput.value.trim();

    if(text==="") return;

    tasks.push({

        text:text,

        completed:false

    });

    taskInput.value="";

    saveTasks();

    renderTasks();

});

document.querySelectorAll(".filters button").forEach(button=>{

    button.addEventListener("click",()=>{

        currentFilter=button.dataset.filter;

        renderTasks();

    });

});

renderTasks();