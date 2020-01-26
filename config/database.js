const mongoose = require('mongoose');
const { db } = require('./config');
module.exports = async () => {
    try {
        await mongoose.connect(`mongodb://${db.user}:${db.password}@ds113442.mlab.com:${db.host}/${db.database}`, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
    }
}