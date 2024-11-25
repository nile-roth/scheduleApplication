const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();

app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./tasks.db', (err) => {
    if (err) console.error('Error opening database:', err.message);
    else {
        db.run(`
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                due_date TEXT NOT NULL,
                due_time TEXT NOT NULL
            )
        `);
    }
});

// Create a new task
app.post('/tasks', (req, res) => {
    console.log(req.body)
    const { title, due_date, due_time } = req.body;

    if (!title || !due_date || !due_time) {
        return res.status(400).json({ message: 'Invalid task data' });
    }

    const sql = `INSERT INTO tasks (title, due_date, due_time) VALUES (?, ?, ?)`;
    db.run(sql, [title, due_date, due_time], function (err) {
        if (err) {
            console.error('Error inserting task:', err.message);
            return res.status(500).json({ message: 'Failed to create task' });
        }
        res.status(201).json({ id: this.lastID });
    });
});

// Get all tasks sorted by due date and time
app.get('/tasks/sorted', (req, res) => {
    const sql = `SELECT * FROM tasks ORDER BY due_date, due_time`;
    db.all(sql, [], (err, rows) => {
        if (err) {
            console.error('Error fetching tasks:', err.message);
            return res.status(500).json({ message: 'Failed to fetch tasks' });
        }
        res.json(rows);
    });
});

app.listen(3001, () => console.log('Task Service running on port 3001'));
