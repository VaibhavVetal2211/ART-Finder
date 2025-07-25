const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { search, streamChat } = require('../controllers/searchController');

// Regular search endpoint
router.post('/search', search);

// Streaming chat endpoint
router.post('/stream', streamChat);

module.exports = router;