document.addEventListener('DOMContentLoaded', () => {
    let currentPage = 1;
    let totalPages = 1;

    const productsContainer = document.getElementById('products-container');
    const prevPageBtn = document.getElementById('prev-page');
    const nextPageBtn = document.getElementById('next-page');
    const currentPageSpan = document.getElementById('current-page');
    const totalPagesSpan = document.getElementById('total-pages');

    // Format price with currency symbol
    const formatPrice = (price) => `$${price.toFixed(2)}`;

    // Create product card HTML
    const createProductCard = (product) => {
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" class="product-image">
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-price">${formatPrice(product.price)}</p>
                    <p class="product-description">${product.description}</p>
                </div>
            </div>
        `;
    };

    // Fetch and display products
    const fetchProducts = async (page) => {
        try {
            const response = await fetch(`/api/products?page=${page}`);
            const data = await response.json();
            
            // Update pagination info
            currentPage = data.currentPage;
            totalPages = data.totalPages;
            
            // Update UI
            productsContainer.innerHTML = data.products
                .map(product => createProductCard(product))
                .join('');
            
            currentPageSpan.textContent = currentPage;
            totalPagesSpan.textContent = totalPages;
            
            // Update button states
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages;

            // Smooth scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (error) {
            console.error('Error fetching products:', error);
            productsContainer.innerHTML = '<p>Error loading products. Please try again later.</p>';
        }
    };

    // Event listeners for pagination
    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            fetchProducts(currentPage - 1);
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            fetchProducts(currentPage + 1);
        }
    });

    // Initial load
    fetchProducts(1);
});