// const BookController = require('../../controllers/book.controller');
const BookController = require('../../controllers').BookController;
const router = require('express').Router();

module.exports = router 
    //routes and controllers
    router.get('/', BookController.index)
    // add new book (form page) route
    router.get('/new', BookController.new)
    // create book route
    router.post('/', BookController.create)
    // show all books route
    router.get('/:_id', BookController.show)
    // edit individual book route
    router.get('/:_id/edit', BookController.edit)
    // update individual book route
    router.put('/:_id/update', BookController.update)
    // delete book route
    router.delete('/:_id/delete', BookController.destroy)

    // catch 404 and forward to error handler
    // router.use((request, response, next) => {
    //     const err = new Error('Not Found');
    //     err.status = 404;
    //     next(err);
    // })
    
    // error handler
    // router.use((err, request, response, next) => {
    //     // set locals, only providing error in development
    //     response.locals.message = err.message;
    //     response.locals.error = request.router.get('env') === 'development' ? err : {};
    //     response.status(err.status || 500);
    //     // render the error page
    //     response.render('error', {title: 'Error page'});
    // })