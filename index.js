const express = require('express');
const dotenv = require('dotenv');

const singupRouter = require('./src/routes/singup');

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./src/utils/database');


app.use(express.json());

app.use('/auth/signup', singupRouter);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

