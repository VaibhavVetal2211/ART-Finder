const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Data file path
const dataFile = path.join(__dirname, 'todos.json');

// Initialize todos.json if it doesn't exist
if (!fs.existsSync(dataFile)) {
    fs.writeFileSync(dataFile, JSON.stringify([]));
}

// Routes
app.get('/api/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataFile));
    res.json(todos);
});

app.post('/api/todos', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataFile));
    const newTodo = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString()
    };
    todos.push(newTodo);
    fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
    res.json(newTodo);
});

app.put('/api/todos/:id', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataFile));
    const id = parseInt(req.params.id);
    const index = todos.findIndex(todo => todo.id === id);
    
    if (index !== -1) {
        todos[index] = { ...todos[index], ...req.body };
        fs.writeFileSync(dataFile, JSON.stringify(todos, null, 2));
        res.json(todos[index]);
    } else {
        res.status(404).json({ error: 'Todo not found' });
    }
});

app.delete('/api/todos/:id', (req, res) => {
    const todos = JSON.parse(fs.readFileSync(dataFile));
    const id = parseInt(req.params.id);
    const filteredTodos = todos.filter(todo => todo.id !== id);
    fs.writeFileSync(dataFile, JSON.stringify(filteredTodos, null, 2));
    res.json({ message: 'Todo deleted successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
}); 