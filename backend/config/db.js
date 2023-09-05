const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("DATABASE CONNECTED");
        })
        .catch(err => {
            console.log("COULD NOT CONNECT DATABASE");
            console.log(err);
        })
}

module.exports = connectDB;