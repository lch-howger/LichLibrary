const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

/*
get /
enter authors pagedz
 */
router.get("/", function (req, res) {
    res.sendfile("./dist/authors.html");
});

/*
get /list
return author list in json
if allEntities=='true' return book list
 */
router.get("/list", function (req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findAll({include: [db.Book]}).then(function (authors) {
            ret.json(authors, res);
        });
    } else {
        db.Author.findAll().then(function (authors) {
            ret.json(authors, res);
        });
    }
});

/*
get /add
enter add page
 */
router.get("/add", function (req, res) {
    res.sendfile("./dist/add.html");
});

/*
get /:authorID
return detail information according to author ID
 */
router.get("/:authorID", function (req, res) {
    if (req.query.allEntities == "true") {
        db.Author.findByPk(req.params.authorID, {include: [db.Book]}).then(function (author) {
            if (author) {
                ret.json(author, res);
            } else {
                res.end();
            }
        });
    } else if (req.query.allEntities == "false") {
        db.Author.findByPk(req.params.authorID).then(function (author) {
            if (author) {
                ret.json(author, res);
            } else {
                res.end();
            }
        });
    } else {
        res.sendfile("./dist/detail.html");
    }
});

/*
/:authorID/change
enter add author page
 */
router.get("/:authorID/change", function (req, res) {
    res.sendfile("./dist/add.html");
});

/*
/:authorID/books
enter addition page
add books for author
 */
router.get("/:authorID/books", function (req, res) {
    res.sendfile("./dist/authors_addition.html");
});

/*
post /
create new author
params:
    1.name
    2.imgUrl
 */
router.post("/", function (req, res) {
    db.Author.create({name: req.body.name, imgUrl: req.body.imgUrl}).then(function (author) {
        ret.json(author, res);
    });
});

/*
post /:authorID/books
add new book for author
params:
    1.bookTitle
    2.bookISBN
 */
router.post("/:authorID/books", function (req, res) {
    db.Author.findByPk(req.params.authorID, {include: [db.Book]}).then(function (author) {
        if (author) {
            db.Book.findOrCreate({
                where: {title: req.body.bookTitle, isbn: req.body.bookISBN}
            }).spread(function (book, created) {
                author.addBook(book);
                author.reload().then(function (author) {
                    ret.json(author, res);
                });
            });
        } else {
            res.end();
        }
    });
});

/*
post /:authorID/books/:bookID
add book for author by book ID
 */
router.post("/:authorID/books/:bookID", function (req, res) {
    db.Author.findByPk(req.params.authorID, {include: [db.Book]}).then(function (author) {
        if (author) {
            db.Book.findByPk(req.params.bookID).then(function (book) {
                if (book) {
                    author.addBook(book);
                    author.reload().then(function (author) {
                        ret.json(author, res);
                    });
                }
            });
        } else {
            res.end();
        }
    });
});

/*
put /:authorID
change author by author ID
params:
    1.name
    2.imgUrl
 */
router.put("/:authorID", function (req, res) {
    db.Author.findByPk(req.params.authorID).then(function (author) {
        if (author) {
            author.name = req.body.name;
            author.imgUrl = req.body.imgUrl;
            author.save().then(function (author) {
                ret.json(author, res);
            });
        } else {
            res.end();
        }
    });
});

/*
delete /:authorID
delete author by author ID
 */
router.delete("/:authorID", function (req, res) {
    db.Author.findByPk(req.params.authorID)
        .then(function (author) {
            if (author) {
                return author.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});
module.exports = router;
