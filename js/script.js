const taskInput = document.querySelector('#taskInput');
const addTaskButton = document.querySelector('#addTaskButton');
const taskList = document.querySelector('#taskList');
const clearCompletedButton = document.querySelector('#clearCompletedButton');

const createTaskElement = (taskText, completed = false) => {
    const listItem = document.createElement('li');
    listItem.textContent = taskText;

    if (completed) {
        listItem.classList.add('completed');
    }

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'X';
    deleteButton.classList.add('delete-btn');

    deleteButton.addEventListener('click', (event) => {
        event.stopPropagation(); // hindra att klicket markerar todo:n
        listItem.remove();
        saveTasks();
    });

    listItem.appendChild(deleteButton);
    return listItem;
};

addTaskButton.addEventListener('click', function(event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const listItem = createTaskElement(taskText);
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
        const text = li.firstChild.textContent.trim(); // första textnoden
        tasks.push({
            text,
            completed: li.classList.contains('completed')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasks = () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    storedTasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.completed);
        taskList.appendChild(listItem);
    });
};

loadTasks();