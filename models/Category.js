const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    name: {
        type: String
    }
});



module.exports = mongoose.model('Categories', CategorySchema);