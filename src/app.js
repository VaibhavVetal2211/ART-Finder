const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const searchRoutes = require('./routes/searchRoutes');
const newsRoutes = require('./routes/newsRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/search', searchRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/chat', chatRoutes);

module.exports = app;