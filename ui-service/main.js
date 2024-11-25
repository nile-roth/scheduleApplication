// Add event listener to the form
document.getElementById('task-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent page reload

    const title = document.getElementById('title').value;
    const due_date = document.getElementById('due_date').value;
    const due_time = document.getElementById('due_time').value;

    const task = { title, due_date, due_time };

    try {
        const response = await fetch('/tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task),
        });

        if (response.ok) {
            fetchTasks();
        } else {
            console.error('Failed to create task');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Fetch and display tasks
async function fetchTasks() {
    try {
        const response = await fetch('/tasks/sorted');
        if (response.ok) {
            const tasks = await response.json();
            const taskList = document.getElementById('task-list');
            taskList.innerHTML = ''; // Clear previous tasks

            tasks.forEach((task) => {
                const div = document.createElement('div');
                div.textContent = `${task.title} - Due: ${task.due_date} ${task.due_time}`;
                taskList.appendChild(div);
            });
        } else {
            console.error('Failed to fetch tasks');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Initial task fetch
fetchTasks();
