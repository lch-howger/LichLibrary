const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

/*
get /
enter books page
show book list
 */
router.get("/", function (req, res) {
    res.sendfile("./dist/books.html");
});

/*
get /list
return book list
if allEntities=='true' return author list of the book
 */
router.get("/list", function (req, res) {
    if (req.query.allEntities == "true") {
        db.Book.findAll({include: [db.Author]}).then(function (books) {
            ret.json(books, res);
        });
    } else {
        db.Book.findAll().then(function (books) {
            ret.json(books, res);
        });
    }
});

/**
 * get /add
 * enter add page
 * add new book
 */
router.get("/add", function (req, res) {
    res.sendfile("./dist/add.html");
});

/**
 * get /:bookID
 * return book detail
 * if allEntities=='true' return author list of the book
 */
router.get("/:bookID", function (req, res) {
    if (req.query.allEntities == "true") {
        db.Book.findByPk(req.params.bookID, {include: [db.Author]}).then(function (book) {
            if (book) {
                ret.json(book, res);
            } else {
                res.end();
            }
        });
    } else if (req.query.allEntities == "false") {
        db.Book.findByPk(req.params.bookID).then(function (book) {
            if (book) {
                ret.json(book, res);
            } else {
                res.end();
            }
        });
    } else {
        res.sendfile("./dist/detail.html");
    }
});

/**
 * get /:authorID/change
 * enter change page
 */
router.get("/:authorID/change", function (req, res) {
    res.sendfile("./dist/add.html");
});

/**
 * get /:authorID/authors
 * enter addition page
 * add author for the book
 */
router.get("/:authorID/authors", function (req, res) {
    res.sendfile("./dist/books_addition.html");
});

/**
 * post /
 * create new book
 * params:
 *      1.title
 *      2.isbn
 *      3.imgUrl
 */
router.post("/", function (req, res) {
    db.Book.create({title: req.body.title, isbn: req.body.isbn, imgUrl: req.body.imgUrl}).then(function (book) {
        ret.json(book, res);
    });
});

/**
 * post /:bookID/authors
 * add new author for the book
 * params:
 *      1.name
 */
router.post("/:bookID/authors", function (req, res) {
    db.Book.findByPk(req.params.bookID, {include: [db.Author]}).then(function (book) {
        if (book) {
            db.Author.findOrCreate({where: {name: req.body.name}}).spread(function (
                author,
                created
            ) {
                book.addAuthor(author);
                book.reload().then(function (book) {
                    ret.json(book, res);
                });
            });
        } else {
            res.end();
        }
    });
});

/**
 * post /:bookID/authors/:authorID
 * add author for the book by author ID
 */
router.post("/:bookID/authors/:authorID", function (req, res) {
    db.Book.findByPk(req.params.bookID, {include: [db.Author]}).then(function (book) {
        if (book) {
            db.Author.findByPk(req.params.authorID).then(function (author) {
                if (author) {
                    book.addAuthor(author);
                    book.reload().then(function (book) {
                        ret.json(book, res);
                    });
                }
            });
        } else {
            res.end();
        }
    });
});

/**
 * put /:bookID
 * change book by book ID
 */
router.put("/:bookID", function (req, res) {
    db.Book.findByPk(req.params.bookID).then(function (book) {
        if (book) {
            book.title = req.body.title;
            book.isbn = req.body.isbn;
            book.imgUrl = req.body.imgUrl;
            book.save().then(function (book) {
                ret.json(book, res);
            });
        } else {
            res.end();
        }
    });
});

/**
 * delete /:bookID
 * delete book by book ID
 */
router.delete("/:bookID", function (req, res) {
    db.Book.findByPk(req.params.bookID)
        .then(function (book) {
            if (book) {
                return book.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;
