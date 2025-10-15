const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');

addTaskButton.addEventListener('click', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        taskList.appendChild(listItem);
        taskInput.value = '';
    }
});

const completedTask = (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');
    }
};

taskList.addEventListener('click', completedTask);