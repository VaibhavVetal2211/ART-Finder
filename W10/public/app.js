document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    
    let todos = [];

    // Fetch all todos
    const fetchTodos = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/todos');
            todos = await response.json();
            renderTodos();
        } catch (error) {
            console.error('Error fetching todos:', error);
        }
    };

    // Add new todo
    const addTodo = async (text) => {
        try {
            const response = await fetch('http://localhost:3000/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text }),
            });
            const newTodo = await response.json();
            todos.push(newTodo);
            renderTodos();
            todoInput.value = '';
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    // Update todo
    const updateTodo = async (id, updates) => {
        try {
            const response = await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updates),
            });
            const updatedTodo = await response.json();
            todos = todos.map(todo => todo.id === id ? updatedTodo : todo);
            renderTodos();
        } catch (error) {
            console.error('Error updating todo:', error);
        }
    };

    // Delete todo
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:3000/api/todos/${id}`, {
                method: 'DELETE',
            });
            todos = todos.filter(todo => todo.id !== id);
            renderTodos();
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    // Render todos
    const renderTodos = () => {
        todoList.innerHTML = todos.map(todo => `
            <tr>
                <td>${todo.text}</td>
                <td>${new Date(todo.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="action-btn edit-btn" onclick="editTodo(${todo.id})">
                        Edit
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `).join('');
    };

    // Event Listeners
    addTodoBtn.addEventListener('click', () => {
        const text = todoInput.value.trim();
        if (text) {
            addTodo(text);
        }
    });

    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const text = todoInput.value.trim();
            if (text) {
                addTodo(text);
            }
        }
    });

    // Make functions available globally
    window.editTodo = (id) => {
        const todo = todos.find(t => t.id === id);
        const newText = prompt('Edit task:', todo.text);
        if (newText && newText.trim()) {
            updateTodo(id, { text: newText.trim() });
        }
    };
    window.deleteTodo = deleteTodo;

    // Initial fetch
    fetchTodos();
}); 