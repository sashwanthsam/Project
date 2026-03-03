let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
// let taskList = [];

const inputTask = document.querySelector('.js-input-task');
const inputDate = document.querySelector('.js-input-date');
const inputButton = document.querySelector('.js-button');
const taskContainer = document.querySelector('.task-container');
let editingIndex = null;

countTask();


function countTask(){
    let taskComleted=0;
    let taskPending=0;
    taskList.forEach((task,index)=>{
            if(task.completed){
                taskComleted++;
            }else{
                taskPending++;
            }
        })
        document.querySelector('.js-count-total').innerText = taskList.length;
        document.querySelector('.js-count-completed').innerText = taskComleted;
        document.querySelector('.js-count-pending').innerText = taskPending;
        console.log(taskComleted,taskPending);
};

inputDate.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        inputTaskPush();
    }
})

inputTask.addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
        inputDate.focus();
    }
})

    function inputTaskPush(){
        const task = inputTask.value;
        const dueDate = inputDate.value;

        // if(!task ||!dueDate){
        //     alert("Please enter Task and Date");
        //     return;
        // }

        if(editingIndex !== null){
            taskList[editingIndex].text = task;
            taskList[editingIndex].dueDate = dueDate;
            editingIndex = null;
            inputButton.innerText = "Add Task";
            inputButton.classList.remove('css-button');
        }else{
        taskList.push({
            text: task,
            dueDate:dueDate,
            completed:false
        });
    }
    
        countTask();
        console.log(taskList);
        addTaskTOScreen(taskList);
        savetasks();
        // inputTask.value="";
        // inputDate.value="";

        
    }

inputButton.addEventListener('click',()=>{
   inputTaskPush();
})
function addTaskTOScreen(taskList){
    taskContainer.innerHTML ="";
    taskList.forEach((task,index)=>{
        taskContainer.innerHTML += `
        <div class="task-box ${task.completed ? 'completed-task' : ''}">
        <p>${task.text}</p>
        <p>${task.dueDate}</p>
        <button onclick="deleteTask(${index})" class="delete-button">Delete</button>
        <button onclick="toggleComplete(${index})" class="complete-button complete-button-${index}">${task.completed?'Completed':'Complete'}</button>
        <button onclick="editbutton(${index})" class="edit-button edit-button-${index} ">✏️</button>
        </div>
        `
    })
        countTask();
};


function editbutton(index){
    const task = taskList[index]
    inputTask.value = task.text;
    inputDate.value = task.dueDate;
    editingIndex = index;
    inputButton.innerText = "Update Task";
    inputButton.classList.add('css-button');
    inputTask.focus();
};

function deleteTask(index){
    taskList.splice(index,1);
    savetasks();
    addTaskTOScreen(taskList);
};

function toggleComplete(index){
    taskList[index].completed = !taskList[index].completed;
    savetasks();
    addTaskTOScreen(taskList);
};

function savetasks(){
    localStorage.setItem('tasks',JSON.stringify(taskList));
}

console.log(taskList);


addTaskTOScreen(taskList);