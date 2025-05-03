const products = [
    {
        image: 'https://placehold.co/400x400?text=Wireless+Headphones',
        name: 'Wireless Headphones',
        price: 7999,
        description: 'Noise-cancelling over-ear headphones with premium sound quality.'
    },
    {
        image: 'https://placehold.co/400x400?text=Smartwatch',
        name: 'Smartwatch',
        price: 12999,
        description: 'Advanced fitness tracking smartwatch with heart rate monitoring.'
    },
    {
        image: 'https://placehold.co/400x400?text=Gaming+Mouse',
        name: 'Gaming Mouse',
        price: 2499,
        description: 'Ergonomic gaming mouse with RGB lighting.'
    },
    {
        image: 'https://placehold.co/400x400?text=Laptop+Stand',
        name: 'Laptop Stand',
        price: 1999,
        description: 'Adjustable aluminum laptop stand for better ergonomics.'
    },
    {
        image: 'https://placehold.co/400x400?text=Mechanical+Keyboard',
        name: 'Mechanical Keyboard',
        price: 5999,
        description: 'RGB mechanical keyboard with blue switches.'
    },
    {
        image: 'https://placehold.co/400x400?text=4K+Monitor',
        name: '4K Monitor',
        price: 29999,
        description: '27-inch 4K LED monitor with HDR support.'
    },
    {
        image: 'https://placehold.co/400x400?text=Wireless+Speaker',
        name: 'Wireless Speaker',
        price: 4999,
        description: 'Portable Bluetooth speaker with 20W output.'
    },
    {
        image: 'https://placehold.co/400x400?text=Webcam',
        name: 'Webcam',
        price: 3499,
        description: '1080p HD webcam with built-in microphone.'
    },
    {
        image: 'https://placehold.co/400x400?text=External+SSD',
        name: 'External SSD',
        price: 8999,
        description: '1TB portable SSD with USB-C connection.'
    },
    {
        image: 'https://placehold.co/400x400?text=Gaming+Headset',
        name: 'Gaming Headset',
        price: 6499,
        description: '7.1 surround sound gaming headset with mic.'
    },
    {
        image: 'https://placehold.co/400x400?text=Wireless+Mouse',
        name: 'Wireless Mouse',
        price: 1999,
        description: 'Ergonomic wireless mouse with long battery life.'
    },
    {
        image: 'https://placehold.co/400x400?text=USB+Hub',
        name: 'USB Hub',
        price: 2499,
        description: '7-port USB 3.0 hub with power delivery.'
    }
];

const itemsPerPage = 10;
let currentPage = 1;

function displayProducts(page) {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const tableBody = document.getElementById('productTableBody');
    tableBody.innerHTML = '';

    paginatedProducts.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${product.image}" alt="${product.name}" class="product-image"></td>
            <td>${product.name}</td>
            <td>₹${product.price}</td>
            <td>${product.description}</td>
        `;
        tableBody.appendChild(row);
    });

    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

function previousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayProducts(currentPage);
    }
}

function nextPage() {
    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        displayProducts(currentPage);
    }
}

// Initial display
displayProducts(currentPage);