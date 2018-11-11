const Book = require('mongoose').model('Book');
const Author = require('mongoose').model('Author');

module.exports = {
    index(request, response) { 
        Book.find({})
            .populate('author')
            .then(books => {
                // const jsonResponse = response.json(books);
                // console.log(jsonResponse);
                // response.json(books);
                response.render('books/index', { books, title: 'Home page' });
            })
            .catch(error => {
                console.log(`something went wrong with the index route`);
            });
    },
    new(request, response){
        Author.find({})
            .populate('author')
            .then(authors => {
                response.render('books/new', { authors, title: 'Create New Book'});
            })
            .catch(error => {
                console.log(`something went wrong with the add new book route`);
            })
    },
    create(request, response) { 
        console.log('inside the create book controller', request.body);
        Book.create(request.body)
            .then(book => {
                console.log('created book', book);
                return Author.findById(book.author)
                    .then(author => {
                        console.log('author found', author);
                        author.books.push(book._id);
                        return author.save()   // doing multiple returns to use same catch
                            .then(() => {
                                console.log('creating author', request.body);
                                // response.json(book);
                                response.redirect('/books');
                            })
            })
        })
        .catch(error => {
            console.log(`something went wrong adding book to database`);
            for(let key in error.errors){
                console.log(error.errors[key].message)
                request.flash('add_book_error', error.errors[key].message)
            }
            response.render('books/new', { errors, title: 'Add Book page' });
        });
        // this catch is only good for validation errors, so if expecting other kind of errors 
        // simply console log while we learn how to handle others
        // .catch(error => {
        //     console.log('got an error', error);
        //     // collect the errors into an errors array
        //     const errors = Object.keys(error.errors)
        //         // map every field that failed to a message
        //         .map(key => error.errors[key].message);
        //         console.log(errors);
        //         // change the response status to unprocessable entity. if we don't change status, 
        //         // it will go out ot client as having no errors
        //         response.status(402).json(errors);
        // })
    },
    show(request, response) { 
        Book.findById(request.params._id)
            .populate('author')
            .then(book => {
                // .catch(console.log);
                // response.json(book);
                response.render('books/show', { book, title: 'Home page'});
            })
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    edit(request, response){
        console.log('got to the edit (view) route');
        Book.findById(request.params._id)
            .populate('author')
            .then(book => {
                response.render('books/edit', { book, title: 'Edit Book page'})
            })
            .catch(error => {
                console.log(`something went wrong with view edit page request`);
            });
    },
    update(request, response) {
        console.log('controller got a request to update', request.params._id, request.body);
        Book.findByIdAndUpdate(request.params._id, request.body, { new: true })
            .then(book => {
                // response.json(book);
                response.redirect('/books')
            })
            .catch(error => {
                console.log(`something went wrong with the update`);
                for(let key in error.errors){
                    console.log(error.errors[key].message)
                    request.flash('book_update_error', error.errors[key].message)
                }
                response.render('books/new', { errors, title: 'Edit User page' });
            });
    },
    destroy(request, response) { 
        console.log('received a request to delete a book id', request.params._id)
        Book.findByIdAndDelete(request.params._id)
        // Book.findByIdAndRemove(request.params._id)
            .then(book => {
                // response.json(book);
                response.redirect('/');
            })
            .catch(error => {
                console.log(`something went wrong with the delete request`);
            });
    }
};