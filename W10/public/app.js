document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    let currentFilter = 'all';
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
                body: JSON.stringify({ text, completed: false }),
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

    // Render todos based on current filter
    const renderTodos = () => {
        const filteredTodos = todos.filter(todo => {
            if (currentFilter === 'active') return !todo.completed;
            if (currentFilter === 'completed') return todo.completed;
            return true;
        });

        todoList.innerHTML = filteredTodos.map(todo => `
            <tr>
                <td>
                    <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                </td>
                <td>
                    <span class="status ${todo.completed ? 'completed' : 'active'}">
                        ${todo.completed ? 'Completed' : 'Active'}
                    </span>
                </td>
                <td>${new Date(todo.createdAt).toLocaleDateString()}</td>
                <td>
                    <button class="action-btn complete-btn" onclick="toggleComplete(${todo.id}, ${!todo.completed})">
                        <i class="fas ${todo.completed ? 'fa-undo' : 'fa-check'}"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editTodo(${todo.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTodo(${todo.id})">
                        <i class="fas fa-trash"></i>
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

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });

    // Make functions available globally
    window.toggleComplete = (id, completed) => updateTodo(id, { completed });
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