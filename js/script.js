let todos = []

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn)');
    const tasksBody = document.getElementById('tasks-body');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const filterBtn = document.getElementById('filter-btn');
    const filterSelect = document.getElementById('filter-select');

    function renderTasks() {
        tasksBody.innerHTML = '';

        if (tasks.length === 0) {
            const row = document.createElement('tr');
            row.className = 'no-task-row';
            let td = document.createElement('td');
            td.colSpan = 4;
            td.textContent = 'No taks found';
            row.appendChild(td);
            tasksBody.appendChild(row);
            return;
        }
    }

})