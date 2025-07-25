const { searchVectorDB, generateStreamResponse, AVAILABLE_NAMESPACES } = require('../utils/vectorDB');
const ChatHistory = require('../models/ChatHistory');

const search = async (req, res) => {
    try {
        const { query, namespace } = req.body;
        
        // Use a default user ID since middleware is disabled
        const userId = 1; // Default user ID for testing

        if (!query) {
            return res.status(400).json({ 
                success: false, 
                message: 'Query is required' 
            });
        }

        // Validate namespace if provided
        if (namespace && !AVAILABLE_NAMESPACES.includes(namespace)) {
            return res.status(400).json({
                success: false,
                message: `Invalid namespace. Available namespaces: ${AVAILABLE_NAMESPACES.join(', ')}`
            });
        }

        // Get last 5 messages from chat history
        let context = [];
        try {
            const chatHistory = await ChatHistory.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
                limit: 5
            });
            context = chatHistory.map(chat => chat.message).reverse();
        } catch (err) {
            console.log('Using empty context due to:', err.message);
        }

        // Pass namespace for filtered search
        const results = await searchVectorDB(query, namespace, context);
        
        // Save the new message to history with namespace info
        try {
            await ChatHistory.create({
                userId,
                message: query,
                response: results.response || JSON.stringify(results),
                namespace: namespace || 'general'
            });
        } catch (err) {
            console.log('Could not save chat history:', err.message);
        }

        res.json({
            success: true,
            data: {
                ...results,
                namespace: namespace || 'general'
            }
        });
    } catch (error) {
        console.error('Search error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error performing search',
            error: error.message 
        });
    }
};

const streamChat = async (req, res) => {
    try {
        const { query, namespace } = req.body;
        const userId = 1; // Default user ID for testing
        
        if (!query) {
            return res.status(400).json({ 
                success: false, 
                message: 'Query is required' 
            });
        }
        
        // Validate namespace if provided
        if (namespace && !AVAILABLE_NAMESPACES.includes(namespace)) {
            return res.status(400).json({
                success: false,
                message: `Invalid namespace. Available namespaces: ${AVAILABLE_NAMESPACES.join(', ')}`
            });
        }
        
        // Get last 5 messages from chat history
        let context = [];
        try {
            const chatHistory = await ChatHistory.findAll({
                where: { userId },
                order: [['createdAt', 'DESC']],
                limit: 5
            });
            context = chatHistory.map(chat => chat.message).reverse();
        } catch (err) {
            console.log('Using empty context due to:', err.message);
        }
        
        // Set up SSE headers
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        let fullResponse = '';
        
        // Stream the response
        await generateStreamResponse(query, namespace, context, (chunk) => {
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
            fullResponse += chunk;
        });
        
        // Save the complete response to history
        try {
            await ChatHistory.create({
                userId,
                message: query,
                response: fullResponse,
                namespace: namespace || 'general'
            });
        } catch (err) {
            console.log('Could not save chat history:', err.message);
        }
        
        // End the stream
        res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
        res.end();
        
    } catch (error) {
        console.error('Stream chat error:', error);
        res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
        res.end();
    }
};

module.exports = {
    search,
    streamChat
};