const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        console.log(`MongoDB url ${process.env.MONGO_URL}`);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("MongoDB connected");
       
    } catch (error) {
       
        console.log(error);
    }
}

module.exports = connectDB;