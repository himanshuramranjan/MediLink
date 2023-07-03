const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');

dotenv.config({ path: './config.env'});

// Define DB connection URI String
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.PASSWORD
);

// Connect to DB
mongoose.connect(DB, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected with MongoDB');
}).catch(err => {
    console.log(err);
});

// Define PORT
const PORT = process.env.PORT || 8000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});