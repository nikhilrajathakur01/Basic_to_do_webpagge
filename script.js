const addBtn = document.getElementById("add-task");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const toggleBtn = document.getElementById("toggle-theme");

// Load tasks from localStorage
window.addEventListener("DOMContentLoaded", () => {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToDOM(task));
});

// Add new task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText === "") return;

  addTaskToDOM(taskText);
  saveTask(taskText);
  taskInput.value = "";
});

// Save task to localStorage
function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task from localStorage
function deleteTaskFromStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((t) => t !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task to DOM
function addTaskToDOM(taskText) {
  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">X</button>
  `;
  li.querySelector("button").addEventListener("click", () => {
    li.remove();
    deleteTaskFromStorage(taskText);
  });
  taskList.appendChild(li);
}

// Toggle theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleBtn.textContent = document.body.classList.contains("dark")
    ? "☀️ Light Mode"
    : "🌙 Dark Mode";
});
