const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$', 'i');

//path to models
const models_path = path.resolve('server/models');

//connect to DB
mongoose.connect('mongodb://localhost:27017/books_authors_api_modular', { useNewUrlParser:true });
mongoose.connection.on('connected', () => console.log(`MongoDB connected to the Books and Authors API!`));

fs.readdirSync(models_path).forEach(file => {
    if (reg.test(file)) {
        require(path.join(models_path, file));
    }
});