const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const singupRouter = require('./src/routes/singup');
const signinRouter = require('./src/routes/signin');



const app = express();
const port = process.env.PORT || 3000;
const connectDB = require('./src/utils/database');


app.use(express.json());

app.use('/auth/signup', singupRouter);
app.use('/auth/signin', signinRouter);


connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});

