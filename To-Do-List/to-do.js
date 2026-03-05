let taskList = JSON.parse(localStorage.getItem('tasks')) || [];
// let taskList = [];

const inputTask = document.querySelector('.js-input-task');
const inputDate = document.querySelector('.js-input-date');
const inputButton = document.querySelector('.js-button');
const taskContainer = document.querySelector('.task-container');
const filterSelect = document.getElementById("filter");
let editingIndex = null;


// const Todaydate = new Date("2026-03-04");
// console.log(dayjs().format('YYYY-MM-DD') === "2026-03-04");

// console.log(dayjs().format('YYYY-MM-DD')) 


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

filterSelect.addEventListener("change",()=>{
    addTaskTOScreen(taskList);
})

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
        console.log(dueDate >= dayjs().format('YYYY-MM-DD'));
        if(!task.trim() ||!dueDate){
            alert("Please enter Task and Date");
            return;
        }

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
        inputTask.value="";
        inputDate.value="";
       inputTask.focus();
        
    }

inputButton.addEventListener('click',()=>{
   inputTaskPush();
})


function addTaskTOScreen(taskList){
    const filterOption = getFilterOption();
    taskContainer.innerHTML ="";

    let filteredTask = taskList;

    if(filterOption === "completed"){
        filteredTask = taskList.filter(task => task.completed);
    }
    else if(filterOption === "pending"){
        filteredTask = taskList.filter(task => !task.completed);
    }

     filteredTask.forEach((task)=>{
        const index = taskList.indexOf(task);

        const isOverdue = dayjs(task.dueDate).isBefore(dayjs(), 'day') && !task.completed;
        
        taskContainer.innerHTML += `
        <div class="task-box ${task.completed ? 'completed-task' : ''} overdue-con-${isOverdue ? 'yes':''}">
        <p>${task.text}</p>
        <p class="overdue-${isOverdue ? 'yes':''}">${task.dueDate}</p>
        <button data-index="${index}" class="delete-button">Delete</button>
        <button data-index="${index}" class="complete-button complete-button-${index}">${task.completed?'Completed':'Complete'}</button>
        <button data-index="${index}" class="edit-button edit-button-${index} ">✏️</button>
        </div>
        `;
    })   
    countTask();
};

taskContainer.addEventListener("click", (event) => {

  const index = event.target.dataset.index;

  if(event.target.classList.contains("delete-button")){
      deleteTask(index);
  }

  if(event.target.classList.contains("complete-button")){
      toggleComplete(index);
  }

  if(event.target.classList.contains("edit-button")){
      editbutton(index);
  }

});

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

function getFilterOption(){
    return document.getElementById("filter").value;
}

console.log(taskList);
addTaskTOScreen(taskList);