const express = require('express');
const router = express.Router();
const { fetchNews } = require('../controllers/newsController');

router.get('/search', fetchNews);

module.exports = router;