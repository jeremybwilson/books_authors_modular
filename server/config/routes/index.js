const book_router = require('./book.routes');
const author_router = require('./author.routes');
const router = require('express').Router();

module.exports = router
  .use('/books', book_router)
  .use('/authors', author_router);