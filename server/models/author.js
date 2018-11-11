const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorSchema = new Schema({
    first_name: {
        type: String,
        required: [true, 'Please enter first name'],
        minlength: [2, 'First name must be longer than 2 characters'],
        trim: true
    },
    last_name: {
        type: String,
        required: [true, 'Please enter last name'],
        minlength: [2, 'Last  name must be at least 2 characters'],
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Please enter country of origin'],
        minlength: [3, 'Country name must be at least 3 characters'],
        trim: true
    },
    birth_date: {
        type: Date,
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book',
    }],
}, {timestamps: true});

module.exports = mongoose.model('Author', AuthorSchema);