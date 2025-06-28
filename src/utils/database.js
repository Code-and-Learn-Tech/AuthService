const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(`MongoDB connected ${process.env.MONGO_URL}`);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB conned");
       
    } catch (error) {
       
        console.log(error);
    }
}

module.exports = connectDB;