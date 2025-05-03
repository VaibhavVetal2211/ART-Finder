const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/student', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

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

// Sample data
const sampleData = [
    {
        Name: "John Doe",
        Roll_No: 1,
        WAD_Marks: 85,
        CC_Marks: 90,
        DSBDA_Marks: 88,
        CNS_Marks: 92,
        AI_Marks: 87
    },
    {
        Name: "Jane Smith",
        Roll_No: 2,
        WAD_Marks: 78,
        CC_Marks: 82,
        DSBDA_Marks: 25,
        CNS_Marks: 80,
        AI_Marks: 85
    },
    {
        Name: "Mike Johnson",
        Roll_No: 3,
        WAD_Marks: 92,
        CC_Marks: 88,
        DSBDA_Marks: 90,
        CNS_Marks: 85,
        AI_Marks: 89
    },
    {
        Name: "Sarah Williams",
        Roll_No: 4,
        WAD_Marks: 75,
        CC_Marks: 78,
        DSBDA_Marks: 15,
        CNS_Marks: 72,
        AI_Marks: 80
    },
    {
        Name: "David Brown",
        Roll_No: 5,
        WAD_Marks: 88,
        CC_Marks: 85,
        DSBDA_Marks: 92,
        CNS_Marks: 90,
        AI_Marks: 87
    }
];

// Insert data
async function insertData() {
    try {
        await Student.deleteMany({}); // Clear existing data
        await Student.insertMany(sampleData);
        console.log('Sample data inserted successfully');
        process.exit(0);
    } catch (err) {
        console.error('Error inserting data:', err);
        process.exit(1);
    }
}

insertData(); 