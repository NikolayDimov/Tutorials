const mongoose = require('mongoose');


// TODO change database according to assignments
// scaffoldDb --> must be change to our database
const CONNECTION_STRING = 'mongodb://127.0.0.1:27017/tutorials';


module.exports = async (app) => {
    try {
        await mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Database connection established')

    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};