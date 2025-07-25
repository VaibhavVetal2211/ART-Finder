const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const searchRoutes = require('./searchRoutes');

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);

module.exports = router;