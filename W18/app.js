const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/music', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Define Song Schema
const songSchema = new mongoose.Schema({
    songname: String,
    film: String,
    music_director: String,
    singer: String,
    actor: String,
    actress: String
});

const Song = mongoose.model('songdetails', songSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.get('/', async (req, res) => {
    try {
        const songs = await Song.find();
        res.render('index', { songs });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List all songs
app.get('/songs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Get song count
app.get('/count', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.json({ count });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List songs by music director
app.get('/songs/director/:director', async (req, res) => {
    try {
        const songs = await Song.find({ music_director: req.params.director });
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List songs by music director and singer
app.get('/songs/director/:director/singer/:singer', async (req, res) => {
    try {
        const songs = await Song.find({
            music_director: req.params.director,
            singer: req.params.singer
        });
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a song
app.delete('/songs/:id', async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.params.id);
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new song
app.post('/songs', async (req, res) => {
    try {
        const song = new Song(req.body);
        await song.save();
        res.json(song);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// List songs by singer and film
app.get('/songs/singer/:singer/film/:film', async (req, res) => {
    try {
        const songs = await Song.find({
            singer: req.params.singer,
            film: req.params.film
        });
        res.json(songs);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update song with actor and actress
app.put('/songs/:id', async (req, res) => {
    try {
        const song = await Song.findByIdAndUpdate(
            req.params.id,
            { actor: req.body.actor, actress: req.body.actress },
            { new: true }
        );
        res.json(song);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Initialize database with sample songs
async function initializeDatabase() {
    try {
        const sampleSongs = [
            {
                songname: "Tum Hi Ho",
                film: "Aashiqui 2",
                music_director: "Mithoon",
                singer: "Arijit Singh"
            },
            {
                songname: "Chaiyya Chaiyya",
                film: "Dil Se",
                music_director: "A.R. Rahman",
                singer: "Sukhwinder Singh"
            },
            {
                songname: "Tere Bina",
                film: "Guru",
                music_director: "A.R. Rahman",
                singer: "A.R. Rahman"
            },
            {
                songname: "Kal Ho Naa Ho",
                film: "Kal Ho Naa Ho",
                music_director: "Shankar-Ehsaan-Loy",
                singer: "Sonu Nigam"
            },
            {
                songname: "Gerua",
                film: "Dilwale",
                music_director: "Pritam",
                singer: "Arijit Singh"
            }
        ];

        await Song.insertMany(sampleSongs);
        console.log('Database initialized with sample songs');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initializeDatabase();
}); 