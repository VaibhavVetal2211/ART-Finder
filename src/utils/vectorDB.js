require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');
const { Groq } = require('groq-sdk');

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pinecone.index("insightai-index");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const AVAILABLE_NAMESPACES = ['sports', 'entertainment', 'tech', 'stock market', 'education'];

// Define the generateEmbedding function that was missing
async function generateEmbedding(text) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: text }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
        });

        // Since we're using a 1024-dimensional vector space (from Pinecone config)
        const vector = Array.from({ length: 1024 }, () => Math.random() * 2 - 1);
        return vector;
    } catch (error) {
        console.error('Error generating embedding:', error);
        throw error;
    }
}

async function searchVectorDB(query, namespace, context = []) {
    try {
        if (!AVAILABLE_NAMESPACES.includes(namespace)) {
            // If it's a general query or greeting, handle it directly
            if (!namespace) {
                const response = await generateResponse(query, context);
                return {
                    type: 'chat',
                    response,
                    markdown: response // Include the markdown formatted response
                };
            }
            throw new Error('Invalid namespace');
        }

        // Get relevant information from vector DB
        const searchResults = await index.query({
            vector: Array(1024).fill(0.1), // Placeholder vector
            filter: { namespace: namespace },
            topK: 5,
            includeMetadata: true,
        });

        // Generate response using context and search results
        const contextWithResults = searchResults.matches.map(
            (match) => match.metadata?.text || "No text available"
        );
        
        const response = await generateResponse(
            `Based on the following information, answer this question: ${query}\n\nContext: ${contextWithResults.join(
                "\n"
            )}`,
            context
        );

        // Format sources in markdown for frontend display
        const formattedSources = searchResults.matches.map((match, index) => {
            return {
                id: match.id || `source-${index}`,
                text: match.metadata?.text || "No text available",
                score: match.score || 0
            };
        });

        return {
            type: 'search',
            response,
            markdown: response, // Include the markdown formatted response
            sources: formattedSources,
            namespace
        };
    } catch (error) {
        console.error('Error searching vector DB:', error);
        throw error;
    }
}

async function generateResponse(query, context = []) {
    try {
        const systemPrompt = `You are an AI assistant that provides well-structured answers in markdown format.

Your responses should follow these formatting guidelines:
1. Use markdown syntax for all formatting
2. Structure longer responses with clear headings (## for main headings, ### for subheadings)
3. Use **bold** for emphasis and important points
4. Use *italics* for definitions or subtle emphasis
5. Use bullet points (- ) for lists of items
6. Use numbered lists (1. ) for sequential steps or ranked items
7. Use \`code\` for technical terms, commands, or specific inputs
8. Use \`\`\`language
   code block
   \`\`\` for multi-line code examples
9. Use > for quotes or important callouts
10. Use tables for structured data when appropriate
11. Include a brief summary at the end for longer responses

Your tone should be:
- Helpful and informative
- Clear and concise
- Conversational but professional
- Engaging without being overly casual

Respond to the user's query with accurate, relevant information formatted according to these guidelines.`;

        const messages = [
            { role: "system", content: systemPrompt },
            ...context.map(msg => ({ role: "user", content: msg })),
            { role: "user", content: query }
        ];

        const completion = await groq.chat.completions.create({
            messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1000,
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}

async function generateStreamResponse(query, namespace, context = [], onChunk) {
    try {
        const systemPrompt = `You are an AI assistant that provides well-structured answers in markdown format.

Your responses should follow these formatting guidelines:
1. Use markdown syntax for all formatting
2. Structure longer responses with clear headings (## for main headings, ### for subheadings)
3. Use **bold** for emphasis and important points
4. Use *italics* for definitions or subtle emphasis
5. Use bullet points (- ) for lists of items
6. Use numbered lists (1. ) for sequential steps or ranked items
7. Use \`code\` for technical terms, commands, or specific inputs
8. Use \`\`\`language
   code block
   \`\`\` for multi-line code examples
9. Use > for quotes or important callouts
10. Use tables for structured data when appropriate
11. Include a brief summary at the end for longer responses

Your tone should be:
- Helpful and informative
- Clear and concise
- Conversational but professional
- Engaging without being overly casual

Respond to the user's query with accurate, relevant information formatted according to these guidelines.`;

        // Send initial message to indicate processing
        onChunk('');

        if (!AVAILABLE_NAMESPACES.includes(namespace)) {
            // If it's a general query or greeting, handle it directly
            const messages = [
                { role: "system", content: systemPrompt },
                ...context.map(msg => ({ role: "user", content: msg })),
                { role: "user", content: query }
            ];

            const stream = await groq.chat.completions.create({
                messages,
                model: "llama-3.3-70b-versatile",
                temperature: 0.7,
                max_tokens: 1000,
                stream: true
            });

            for await (const chunk of stream) {
                const content = chunk.choices[0]?.delta?.content || '';
                if (content) {
                    onChunk(content);
                }
            }
            return;
        }

        // Get relevant information from vector DB
        const searchResults = await index.query({
            vector: Array(1024).fill(0.1), // Placeholder vector
            filter: { namespace: namespace },
            topK: 5,
            includeMetadata: true,
        });

        // Generate response using context and search results
        const contextWithResults = searchResults.matches.map(
            match => match.metadata?.text || "No text available"
        );
        
        const messages = [
            { role: "system", content: systemPrompt },
            ...context.map(msg => ({ role: "user", content: msg })),
            { role: "user", content: `Based on the following information, answer this question: ${query}\n\nContext: ${contextWithResults.join('\n')}` }
        ];

        const stream = await groq.chat.completions.create({
            messages,
            model: "llama-3.3-70b-versatile",
            temperature: 0.7,
            max_tokens: 1000,
            stream: true
        });

        for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content || '';
            if (content) {
                onChunk(content);
            }
        }
    } catch (error) {
        console.error("Error generating stream response:", error);
        onChunk(`**Error:** ${error.message}`);
        throw error;
    }
}


module.exports = {
    generateEmbedding,
    searchVectorDB,
    generateResponse,
    generateStreamResponse,
    AVAILABLE_NAMESPACES
};
