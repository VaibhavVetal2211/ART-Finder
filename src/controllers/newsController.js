const axios = require('axios');

const fetchNews = async (req, res) => {
    try {
        const { query, category, lang = 'en', country = 'us', max = 10 } = req.query;
        
        const apiKey = process.env.GNEWS_API_KEY;
        let url = `https://gnews.io/api/v4/search?apikey=${apiKey}&lang=${lang}&country=${country}&max=${max}`;
        
        if (query) {
            url += `&q=${encodeURIComponent(query)}`;
        }
        
        if (category) {
            url += `&category=${category}`;
        }

        const response = await axios.get(url);
        
        // Format the response to match your system's format
        const formattedResponse = {
            success: true,
            data: {
                type: 'news',
                articles: response.data.articles.map(article => ({
                    ...article,
                    content: article.content.replace(/\[\d+ chars\]$/, '').trim() // Remove character count
                })),
                totalArticles: response.data.totalArticles
            }
        };

        res.json(formattedResponse);
    } catch (error) {
        console.error('News API error:', error.response?.data || error.message);
        res.status(500).json({
            success: false,
            message: 'Error fetching news',
            error: error.response?.data?.errors || error.message
        });
    }
};

module.exports = {
    fetchNews
};