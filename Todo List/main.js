// Define UI Vars
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const filter = document.querySelector('#filter');
const taskList = document.querySelector('.list-group');
const clearBtn = document.querySelector('.clear-tasks');
// Load all event listeners
loadEventListeners();
// Load all event listeners
function loadEventListeners() {
    // DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);
    // Add task event
    form.addEventListener('submit', addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Filter task
    filter.addEventListener('keyup', filterTask);
}
// Get Tasks from LS
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task) {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'list-group-item d-flex align-items-center';
        // Create text node and append to li
        li.appendChild(document.createTextNode(task));
        // Create i element
        const i = document.createElement('i');
        // Add class
        i.className = 'fa fa-trash text-start text-danger delete-item';
        // Append the i to li
        li.appendChild(i);
        // Append li to ul
        taskList.appendChild(li);
    });
}
function addTask(e) {
    e.preventDefault();
    if (taskInput.value === '') {
        alert('Enter the task first');
    }
    else {
        // Create li element
        const li = document.createElement('li');
        // Add class
        li.className = 'list-group-item d-flex align-items-center';
        // Create text node and append to li
        li.appendChild(document.createTextNode(taskInput.value));
        // Create i element
        const i = document.createElement('i');
        // Add class
        i.className = 'fas fa-times text-danger text-end mr-auto delete-item';
        // Append the i to li
        li.appendChild(i);
        // Append li to ul
        taskList.appendChild(li);
        // Store in LS
        storeTaskInLocalStorage(taskInput.value);
        // Clear input
        taskInput.value = '';
    }
}
// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Remove task
function removeTask(e) {
    var _a;
    if (e.target) {
        const element = e.target;
        if (element.classList.contains('delete-item')) {
            if (confirm('Are you sure you want to delete the task?')) {
                (_a = element.parentElement) === null || _a === void 0 ? void 0 : _a.remove();
                // Remove from LS
                if (element !== null) {
                    removeTaskFromLocalStorage(element.parentElement);
                }
            }
        }
    }
}
// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task, index) {
        if ((taskItem === null || taskItem === void 0 ? void 0 : taskItem.textContent) === task) {
            tasks.splice(index, 1);
        }
    });
}
function filterTask(e) {
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.list-group-item').forEach(function (task) {
        const item = task.textContent;
        if (item && item.toLowerCase().indexOf(text) !== -1) {
            task.classList.add("d-flex");
        }
        else {
            task.classList.remove("d-flex");
            task.style.display = 'none';
        }
    });
}
