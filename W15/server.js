const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.static('public'));

// Read products data
const productsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'products.json')));

// API endpoint to get paginated products
app.get('/api/products', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = 15;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    const paginatedProducts = productsData.products.slice(startIndex, endIndex);
    const totalPages = Math.ceil(productsData.products.length / limit);

    res.json({
        products: paginatedProducts,
        currentPage: page,
        totalPages: totalPages,
        totalProducts: productsData.products.length
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});