const mongoose = require('mongoose');

// MongoDB connection URI
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/auctionApp';

// Function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
