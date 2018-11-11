const Author = require('mongoose').model('Author');
const Book = require('mongoose').model('Book');

module.exports = {
    index(request,response) { 
        Author.find({})
            .populate('books')
            .then(authors =>  {
                console.log('successfully found authors');
                // const jsonResponse = response.json(authors);
                // console.log(jsonResponse);
                // response.json(authors);
                response.render('authors/index', { authors, title: 'Author Home page'});
            })
            .catch(error => {
                console.log(`something went wrong with the index route`);
            })
    },
    new(request, response){
        Author.find({})
            .then(authors => {
                response.render('authors/new', { authors, title: 'Create New Author' });
            })
            .catch(error => {
                console.log(`something went wrong with the add new author route`);
            })
    },
    create(request, response) {
        Author.create(request.body)
            .then(author => {
                console.log('created book', author);
                console.log('successfully created author', request.body);
                // response.json(author);
                response.redirect('/authors');
            })
            // .catch(error => {
            //     const errors = Object.keys(error.errors).map(key => error.errors[key].message);
            //     response.status(402).json(errors);
            // })
            .catch(error => {
                console.log(`something went wrong with the update`);
                for(let key in error.errors){
                    console.log(error.errors[key].message)
                    request.flash('add_author_error', error.errors[key].message)
                }
                response.render('authors/new', { errors, title: 'Add Author page' });
            });

    },
    show(request, response) {
        console.log('successfully found an author');
        Author.findById(request.params._id)
            .populate('books')
            .then(author => {
                // response.json(author);
                response.render('authors/show', { author, title: 'Show User page'});
            })
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    edit(request, response){
        console.log('got to the edit (put - post) route');
        Author.findById(request.params._id)
            .populate('books')
            .then(author => {
                response.render('authors/edit', { author, title: 'Edit Author page'})
            })
            .catch(error => {
                console.log(`something went wrong with show request`);
            });
    },
    update(request, response) {
        console.log('controller got the request to update author', request.params._id, request.body)
        Author.findByIdAndUpdate(request.params._id, request.body, { new: true })
            .then(() => {
                // response.json(author);
                response.redirect('/authors');
            })
            .catch(error => {
                console.log(`something went wrong with the update`);
                for(let key in error.errors){
                    console.log(error.errors[key].message)
                    request.flash('author_update_error', error.errors[key].message)
                }
                response.render('author/edit', { errors, title: 'Edit Author page' });
            });
    },
    destroy(request, response) {
        console.log('controller got a request to delete author id', request.params._id);
        Author.findByIdAndDelete(request.params._id)
        // Author.findByIdAndRemove(request.params._id)
            .then(author => {
                // response.json(author);
                console.log(`delete request was successful`);
            })
            .catch(error => {
                console.log(`something went wrong with the delete request`);
            });
    }
};