document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');
    const addTaskBtn = document.getElementById('add-task-btn)');
    const tasksBody = document.getElementById('tasks-body');
    const deleteAllBtn = document.getElementById('delete-all-btn');
    const filterBtn = document.getElementById('filter-btn');
    const filterSelect = document.getElementById('filter-select');

    let tasks = []

    function renderTasks() {
        tasksBody.innerHTML = '';

        if (tasks.length === 0) {
            const row = document.createElement('tr');
            row.className = 'no-task-row';
            let td = document.createElement('td');
            td.colSpan = 4;
            td.textContent = 'No task found';
            row.appendChild(td);
            tasksBody.appendChild(row);
            return;
        }

        tasks.foreach((task,idx) => {
            const row = document.createElement('tr');

            // Task description
            const taskTd = document.createElement('td');
            taskTd.textContent = task.name;
            row.appendChild(taskTd);

            // Due date formatted
            const dueDateTd = document.createElement('td');
            dueDateTd.textContent = task.dueDate;
            row.appendChild(dueDateTd);

            // Status with select
            const statusTd = document.createElement('td');
            const statusSelect = document.createElement('select');
            statusSelect.className = 'status-select';
            ['Not yet', 'In progress', 'Done'].forEach(statusOption => {
                const option = document.createElement('option');
                option.value = statusOption.toLowerCase().replace(' ', '-');
                option.textContent = statusOption;
                if (task.status === option.value) {
                    option.selected = true;
                }
                statusSelect.appendChild(option);
            });
            statusTd.appendChild(statusSelect);
            row.appendChild(statusTd);

            statusSelect.addEventListener('change', () => {
                task.status = statusSelect.value;
            });

            // Actions contain change and delete
            const actionsTd = document.createElement('td');

            // Edit button
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.className = 'action-btn';
            actionsTd.appendChild(editBtn);

            // Delete button
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'actions-btn';
            actionsTd.appendChild(deleteBtn);

            row.appendChild(actionsTd);

            // Edit mode variable
            let isEditing = false;

            editBtn.addEventListener('click', () => {
                if (!isEditing) {
                    // Change to editing mode
                    isEditing = true;
                    editBtn.textContent = 'Save';

                    // Replace task text with input
                    const taskInputEdit = document.createElement ('input');
                    taskInputEdit.type = 'text';
                    taskInputEdit.value = task.name;
                    taskTd.textContent = '';
                    taskTd.appendChild(taskInputEdit);

                    //Replace due date text with data input
                    const dueDateInputEdit = document.createElement('input');
                    dueDateInputEdit.type = 'date';
                    dueDateInputEdit.value = task.dueDate;
                    dueDateTd.textContent = '';
                    dueDateTd.appendChild(dueDateInputEdit);

                } else {
                    // save new values
                    const newTaskName = taskTd.querySelector('input').value.trim();
                    const newDueDate = dueDateTd.querySelector('input').value;

                    if (newTaskName === '' || newDueDate === '') {
                        alert('Task name and due date cannot be empty.');
                        return;
                }

                task.name = newTaskName;
                task.dueDate = newDueDate;

                isEditing = false;
                editBtn.textContent = 'Edit';

                renderTasks();

            } 
        });

        deleteBtn.addEventListener('click', () => {
            tasks.splice(idx,1);
            renderTasks();
        });

        tasksBody.appendChild(row);
    });
}

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const taskName= taskInput.value.trim();
        const dueDate = dueDateInput.value;

        if (!taskName || !dueDate) {
            alert('Please enter a task and due date.');
            return;
        }

        tasks.push ({
            name: taskName,
            dueDate: dueDate,
            status: 'not-yet'
        });

        taskInput.value = '';
        dueDateInput.value = '';

        // If filter select visible, reset filter select to first option
        if (!filterSelect.classList.contains('hidden')) {
            filterSelect.value = 'nearest';
        }

        renderTasks();
    });

    // Delete all tasks
    deleteAllBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to delete all tasks?')) {
            tasks = [];
            renderTasks();
        }
    });

    // Toggle filter select visibility
    filterBtn.addEventListener('click', () => {
        filterSelect.classList.toggle('hidden');
    });

    // Filter and sort tasks
    filterSelect.addEventListener('change', () => {
        if (filterSelect.value === 'nearest') {
            tasks.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
      } else if (filterSelect.value === 'letter') {
        tasks.sort((a,b) => a.name.localeCompare(b.name));
      }
      renderTasks();
    });

    // Initial render
    renderTasks();
});