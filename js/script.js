const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
const clearCompletedButton = document.querySelector('#clearCompletedButton');

addTaskButton.addEventListener('click', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        taskList.appendChild(listItem);
        taskInput.value = '';

        saveTasks();
    }
});

const completedTask = (event) => {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('completed');

        saveTasks();
    }
};

taskList.addEventListener('click', completedTask);

clearCompletedButton.addEventListener('click', () => {
    taskList.querySelectorAll('.completed').forEach(li => li.remove());
    saveTasks();
});

const saveTasks = () => {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        tasks.push({
            text: li.textContent,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

    storedTasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.textContent = task.text;
        if (task.completed) {
            listItem.classList.add('completed');
        }
        taskList.appendChild(listItem);
    });
}

loadTasks();