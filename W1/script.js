const products = [
    {
        image: './images/wireless_headphones.jpg',
        name: 'Wireless Headphones',
        price: 7999,
        description: 'Noise-cancelling over-ear headphones with premium sound quality.'
    },
    {
        image: './images/smartwatch.jpg',
        name: 'Smartwatch',
        price: 12999,
        description: 'Advanced fitness tracking smartwatch with heart rate monitoring.'
    },
    {
        image: './images/gaming_mouse.jpg',
        name: 'Gaming Mouse',
        price: 2499,
        description: 'Ergonomic gaming mouse with RGB lighting.'
    },
    {
        image: './images/laptop_stand.jpg',
        name: 'Laptop Stand',
        price: 1999,
        description: 'Adjustable aluminum laptop stand for better ergonomics.'
    },
    {
        image: './images/mechanical_keyboard.jpg',
        name: 'Mechanical Keyboard',
        price: 5999,
        description: 'RGB mechanical keyboard with blue switches.'
    },
    {
        image: './images/4k_monitor.jpg',
        name: '4K Monitor',
        price: 29999,
        description: '27-inch 4K LED monitor with HDR support.'
    },
    {
        image: './images/wireless_speaker.jpg',
        name: 'Wireless Speaker',
        price: 4999,
        description: 'Portable Bluetooth speaker with 20W output.'
    },
    {
        image: './images/webcam.jpg',
        name: 'Webcam',
        price: 3499,
        description: '1080p HD webcam with built-in microphone.'
    },
    {
        image: './images/external_ssd.jpg',
        name: 'External SSD',
        price: 8999,
        description: '1TB portable SSD with USB-C connection.'
    },
    {
        image: './images/gaming_headset.jpg',
        name: 'Gaming Headset',
        price: 6499,
        description: '7.1 surround sound gaming headset with mic.'
    },
    {
        image: './images/wireless_mouse.jpg',
        name: 'Wireless Mouse',
        price: 1999,
        description: 'Ergonomic wireless mouse with long battery life.'
    },
    {
        image: './images/usb_hub.jpg',
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