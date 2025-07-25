require('dotenv').config();
const { Pinecone } = require('@pinecone-database/pinecone');
const { Groq } = require('groq-sdk');

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
});

const index = pinecone.index("art-finder");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

const dummyData = {
    sports: [
        {
            id: "sport1",
            text: "The FIFA World Cup 2022 was held in Qatar, marking the first time the tournament was hosted in the Middle East. Argentina emerged victorious, led by Lionel Messi, defeating France in a thrilling final that went to penalties.",
            metadata: {
                category: "football",
                date: "2022-12-18"
            }
        },
        {
            id: "sport2",
            text: "The NBA 2023 Finals saw the Denver Nuggets win their first championship, with Nikola Jokić being named Finals MVP after an outstanding performance throughout the series.",
            metadata: {
                category: "basketball",
                date: "2023-06-12"
            }
        }
    ],
    entertainment: [
        {
            id: "ent1",
            text: "The film 'Oppenheimer' directed by Christopher Nolan explores the story of J. Robert Oppenheimer and the development of the atomic bomb. The film received critical acclaim for its historical accuracy and compelling storytelling.",
            metadata: {
                category: "movies",
                date: "2023-07-21"
            }
        },
        {
            id: "ent2",
            text: "Taylor Swift's 'Eras Tour' became one of the highest-grossing concert tours of all time, showcasing music from all of her albums and breaking multiple attendance records.",
            metadata: {
                category: "music",
                date: "2023-08-15"
            }
        }
    ],
    tech: [
        {
            id: "tech1",
            text: "OpenAI released GPT-4, marking a significant advancement in artificial intelligence capabilities. The model demonstrated improved reasoning and creative abilities compared to its predecessors.",
            metadata: {
                category: "AI",
                date: "2023-03-14"
            }
        },
        {
            id: "tech2",
            text: "Apple unveiled its Vision Pro mixed reality headset, representing the company's first major new product category since the Apple Watch. The device combines virtual and augmented reality technologies.",
            metadata: {
                category: "hardware",
                date: "2023-06-05"
            }
        }
    ],
    "stock market": [
        {
            id: "stock1",
            text: "The S&P 500 reached new all-time highs in 2023, driven by strong performance in technology stocks and optimism about AI developments. Companies like NVIDIA saw substantial growth.",
            metadata: {
                category: "market index",
                date: "2023-12-15"
            }
        },
        {
            id: "stock2",
            text: "The Federal Reserve's monetary policy decisions throughout 2023 significantly impacted market movements, with interest rates reaching their highest levels in over a decade.",
            metadata: {
                category: "economic policy",
                date: "2023-11-01"
            }
        }
    ],
    education: [
        {
            id: "edu1",
            text: "Universities worldwide are incorporating AI tools into their curricula, preparing students for an AI-driven future while establishing guidelines for responsible AI use in academic work.",
            metadata: {
                category: "higher education",
                date: "2023-09-01"
            }
        },
        {
            id: "edu2",
            text: "The rise of micro-credentials and digital badges is transforming professional education, offering more flexible and targeted learning paths for career advancement.",
            metadata: {
                category: "professional development",
                date: "2023-10-15"
            }
        }
    ]
};

async function generateEmbedding(text) {
    try {
        const completion = await groq.chat.completions.create({
            messages: [{ role: "user", content: text }],
            model: "mixtral-8x7b-32768",  // Changed from llama-text-embed-v2 to mixtral-8x7b-32768
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

async function uploadData() {
    try {
        // Proceed directly with data upload for each namespace
        for (const [namespace, data] of Object.entries(dummyData)) {
            const formattedNamespace = namespace.toLowerCase().replace(/\s+/g, '-');
            console.log(`Processing namespace: ${formattedNamespace}`);

            const vectors = await Promise.all(
                data.map(async (item) => {
                    const vector = await generateEmbedding(item.text);
                    return {
                        id: item.id,
                        values: vector,
                        metadata: {
                            ...item.metadata,
                            text: item.text
                        }
                    };
                })
            );

            // Upsert will automatically create the namespace if it doesn't exist
            await index.upsert(vectors, {
                namespace: formattedNamespace
            });

            console.log(`Uploaded ${vectors.length} records to namespace: ${formattedNamespace}`);
        }

        console.log('Data upload completed successfully!');
    } catch (error) {
        console.error('Error uploading data:', error);
    }
}

uploadData();