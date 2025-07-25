const { Groq } = require('groq-sdk');

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Add greeting patterns and responses
const greetingPatterns = [
    'hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 
    'good evening', 'howdy', 'what\'s up', 'sup'
];

const getGreetingResponse = (category) => {
    const responses = {
        technology: "👋 Hello! I'm your tech news assistant. I'm here to help you with the latest in technology, from AI breakthroughs to industry updates. What tech news interests you today? 🚀",
        gaming: "Hey gamer! 🎮 Ready to dive into the latest gaming news? Whether it's new releases, esports, or industry updates, I've got you covered! What would you like to know?",
        finance: "Welcome! 📈 I'm your financial news specialist. Looking for market updates, crypto news, or business insights? How can I assist you today?",
        entertainment: "Hello there! 🎬 Ready to explore the latest in entertainment? From movies and TV to celebrity news, I'm here to keep you updated! What interests you?",
        news: "Welcome! 📰 I'm your news correspondent, ready to provide you with the latest updates and developments from around the world. What news are you interested in?"
    };
    return responses[category] || responses.news;
};

const systemPrompts = {
    technology: `You are a technology news expert providing well-structured responses in markdown format.

Focus Areas:
- Latest tech trends and innovations
- AI and machine learning developments
- Software and hardware releases
- Tech industry news and analysis
- Cybersecurity updates

Guidelines:
1. Structure responses with clear headings (## for main topics, ### for subtopics)
2. Use **bold** for key terms and important points
3. Use *italics* for technical definitions
4. Use \`code blocks\` for technical specifications
5. Include bullet points for features and key points
6. Add relevant emojis 🚀 💻 for visual engagement
7. End with a "## Summary" section
8. Conclude with key takeaways in > blockquotes

Maintain a professional yet engaging tone while explaining complex concepts clearly.`,

    gaming: `You are a gaming industry specialist providing markdown-formatted insights.

Focus Areas:
- Game releases and reviews
- Esports tournaments and events
- Gaming hardware and technology
- Industry trends and market analysis
- Gaming community news

Guidelines:
1. Use ## headings for game titles and major topics
2. **Bold** for game features and highlights
3. *Italics* for game genres and terms
4. Create tables for game comparisons
5. Use bullet points for key features
6. Add gaming-related emojis 🎮 🏆
7. Include a "## Summary" section
8. End with "## Key Takeaways" in > blockquotes

Keep the tone enthusiastic while maintaining professional insights.`,

    finance: `You are a financial news analyst providing markdown-formatted market insights.

Focus Areas:
- Market trends and analysis
- Cryptocurrency and blockchain
- Stock market updates
- Economic policies
- Business news and developments

Guidelines:
1. Use ## for market sectors
2. **Bold** for important figures and changes
3. *Italics* for financial terms
4. Create tables for market data
5. Use bullet points for key indicators
6. Add relevant emojis 📈 💹
7. Include "## Market Summary"
8. End with "## Key Insights" in > blockquotes

Maintain factual reporting with clear financial insights.`,

    entertainment: `You are an entertainment industry insider providing markdown-formatted updates.

Focus Areas:
- Movie and TV releases
- Streaming content updates
- Celebrity news and interviews
- Media industry trends
- Award shows and events

Guidelines:
1. Use ## for major entertainment categories
2. **Bold** for titles and major announcements
3. *Italics* for show names and quotes
4. Create lists for upcoming releases
5. Use bullet points for key highlights
6. Add relevant emojis 🎬 🎭
7. Include "## Entertainment Roundup"
8. End with "## Trending Now" in > blockquotes

Keep the tone engaging and informative.`,

    news: `You are a general news correspondent providing markdown-formatted coverage.

Focus Areas:
- Breaking news and updates
- Global developments
- Political and social events
- Environmental news
- Cultural developments

Guidelines:
1. Use ## for major news categories
2. **Bold** for key events and facts
3. *Italics* for quotes and sources
4. Create chronological lists
5. Use bullet points for key developments
6. Add relevant emojis 📰 🌍
7. Include "## News Summary"
8. End with "## Key Developments" in > blockquotes

Maintain journalistic objectivity with clear, factual reporting.`
};

const chat = async (req, res) => {
    try {
        const { message, category = 'news' } = req.body;

        if (!message) {
            return res.status(400).json({
                success: false,
                message: 'Message is required'
            });
        }

        // Check if the message is a greeting
        const isGreeting = greetingPatterns.some(pattern => 
            message.toLowerCase().includes(pattern)
        );

        if (isGreeting) {
            return res.json({
                success: true,
                data: {
                    response: getGreetingResponse(category.toLowerCase()),
                    type: 'chat',
                    category
                }
            });
        }

        const systemPrompt = systemPrompts[category.toLowerCase()] || systemPrompts.news;

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: 'system',
                    content: systemPrompt
                },
                {
                    role: 'user',
                    content: message
                }
            ],
            model: 'llama-3.3-70b-versatile',
            temperature: 0.7,
            max_tokens: 2048,
            top_p: 1,
            stream: false
        });

        res.json({
            success: true,
            data: {
                response: completion.choices[0].message.content,
                type: 'chat',
                category
            }
        });

    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({
            success: false,
            message: 'Error in chat completion',
            error: error.message
        });
    }
};

module.exports = {
    chat
};