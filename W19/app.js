const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Set up EJS as view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    Name: String,
    Roll_No: Number,
    WAD_Marks: Number,
    CC_Marks: Number,
    DSBDA_Marks: Number,
    CNS_Marks: Number,
    AI_Marks: Number
});

const Student = mongoose.model('studentmarks', studentSchema);

// Routes
app.get('/', async (req, res) => {
    try {
        const students = await Student.find();
        res.render('index', { students });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to display total count and all documents
app.get('/all-students', async (req, res) => {
    try {
        const count = await Student.countDocuments();
        const students = await Student.find();
        res.render('all-students', { count, students });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to display students with DSBDA marks > 20
app.get('/dsbda-students', async (req, res) => {
    try {
        const students = await Student.find({ DSBDA_Marks: { $gt: 20 } });
        res.render('dsbda-students', { students });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to update marks by 10
app.post('/update-marks', async (req, res) => {
    try {
        const { rollNo } = req.body;
        await Student.updateOne(
            { Roll_No: rollNo },
            { $inc: { WAD_Marks: 10, CC_Marks: 10, DSBDA_Marks: 10, CNS_Marks: 10, AI_Marks: 10 } }
        );
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to display students with marks > 25 in all subjects
app.get('/excellent-students', async (req, res) => {
    try {
        const students = await Student.find({
            WAD_Marks: { $gt: 25 },
            CC_Marks: { $gt: 25 },
            DSBDA_Marks: { $gt: 25 },
            CNS_Marks: { $gt: 25 },
            AI_Marks: { $gt: 25 }
        });
        res.render('excellent-students', { students });
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Route to delete a student
app.post('/delete-student', async (req, res) => {
    try {
        const { rollNo } = req.body;
        await Student.deleteOne({ Roll_No: rollNo });
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// New routes for adding students
app.get('/add-student', (req, res) => {
    res.render('add-student');
});

app.post('/add-student', async (req, res) => {
    try {
        const { Name, Roll_No, WAD_Marks, CC_Marks, DSBDA_Marks, CNS_Marks, AI_Marks } = req.body;
        const newStudent = new Student({
            Name,
            Roll_No: parseInt(Roll_No),
            WAD_Marks: parseInt(WAD_Marks),
            CC_Marks: parseInt(CC_Marks),
            DSBDA_Marks: parseInt(DSBDA_Marks),
            CNS_Marks: parseInt(CNS_Marks),
            AI_Marks: parseInt(AI_Marks)
        });
        await newStudent.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});