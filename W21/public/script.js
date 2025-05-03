// DOM Elements
const addBookForm = document.getElementById('addBookForm');
const bookList = document.getElementById('bookList');
const editBookModal = new bootstrap.Modal(document.getElementById('editBookModal'));
const editBookForm = document.getElementById('editBookForm');
const saveEditButton = document.getElementById('saveEdit');

// Load books when page loads
document.addEventListener('DOMContentLoaded', loadBooks);

// Add new book
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        price: parseFloat(document.getElementById('price').value),
        genre: document.getElementById('genre').value
    };

    try {
        const response = await fetch('/api/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });

        if (response.ok) {
            addBookForm.reset();
            loadBooks();
        } else {
            alert('Error adding book');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error adding book');
    }
});

// Load all books
async function loadBooks() {
    try {
        const response = await fetch('/api/books');
        const books = await response.json();
        
        bookList.innerHTML = '';
        books.forEach(book => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>$${book.price.toFixed(2)}</td>
                <td>${book.genre}</td>
                <td class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="editBook('${book._id}')">Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteBook('${book._id}')">Delete</button>
                </td>
            `;
            bookList.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading books');
    }
}

// Edit book
async function editBook(id) {
    try {
        const response = await fetch(`/api/books/${id}`);
        const book = await response.json();
        
        document.getElementById('editBookId').value = book._id;
        document.getElementById('editTitle').value = book.title;
        document.getElementById('editAuthor').value = book.author;
        document.getElementById('editPrice').value = book.price;
        document.getElementById('editGenre').value = book.genre;
        
        editBookModal.show();
    } catch (error) {
        console.error('Error:', error);
        alert('Error loading book details');
    }
}

// Save edited book
saveEditButton.addEventListener('click', async () => {
    const id = document.getElementById('editBookId').value;
    const book = {
        title: document.getElementById('editTitle').value,
        author: document.getElementById('editAuthor').value,
        price: parseFloat(document.getElementById('editPrice').value),
        genre: document.getElementById('editGenre').value
    };

    try {
        const response = await fetch(`/api/books/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });

        if (response.ok) {
            editBookModal.hide();
            loadBooks();
        } else {
            alert('Error updating book');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error updating book');
    }
});

// Delete book
async function deleteBook(id) {
    if (confirm('Are you sure you want to delete this book?')) {
        try {
            const response = await fetch(`/api/books/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                loadBooks();
            } else {
                alert('Error deleting book');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error deleting book');
        }
    }
} 