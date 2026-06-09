const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const themeBtn = document.getElementById("themeBtn");
const searchInput = document.getElementById("searchInput");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
localStorage.setItem("tasks",JSON.stringify(tasks));
}

function updateStats(){

let total = tasks.length;

let completed = tasks.filter(
task => task.completed
).length;

document.getElementById("taskCount").innerText =
`Total Tasks: ${total}`;

document.getElementById("completedCount").innerText =
`Completed: ${completed}`;

let progress =
total === 0 ? 0 :
(completed/total)*100;

document.getElementById("progressBar").style.width =
progress + "%";
}

function renderTasks(){

taskList.innerHTML="";

tasks.forEach((task,index)=>{

const li=document.createElement("li");

li.innerHTML=`
<span class="task-text ${task.completed ? 'completed':''}"
onclick="toggleTask(${index})">
${task.completed ? '✅ ' : ''}${task.text}
</span>

<button class="delete-btn"
onclick="deleteTask(${index})">
🗑️
</button>
`;

taskList.appendChild(li);

});

updateStats();
}

function addTask(){

let text=taskInput.value.trim();

if(text===""){
alert("Enter a task");
return;
}

tasks.push({
text:text,
completed:false
});

saveTasks();
renderTasks();

taskInput.value="";
}

function toggleTask(index){

tasks[index].completed=
!tasks[index].completed;

saveTasks();
renderTasks();
}

function deleteTask(index){

tasks.splice(index,1);

saveTasks();
renderTasks();
}

themeBtn.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){
localStorage.setItem("theme","dark");
themeBtn.innerText="☀️";
}
else{
localStorage.setItem("theme","light");
themeBtn.innerText="🌙";
}

});

if(localStorage.getItem("theme")==="dark"){
document.body.classList.add("dark");
themeBtn.innerText="☀️";
}

searchInput.addEventListener("keyup",function(){

let value=this.value.toLowerCase();

document.querySelectorAll("li").forEach(item=>{

let text=item.querySelector(".task-text")
.innerText.toLowerCase();

item.style.display=
text.includes(value)
? "flex"
: "none";

});

});

renderTasks();