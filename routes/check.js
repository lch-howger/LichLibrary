const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

/**
 * check if the author exists by author ID
 */
router.get("/authorId/:authorId", function (req, res) {
    db.Author.findByPk(req.params.authorId).then(function (author) {
        if (author) {
            ret.json({check: true}, res);
        } else {
            ret.json({check: false}, res);
        }
    });
});

/**
 * check if the book exists by book ID
 */
router.get("/bookId/:bookId", function (req, res) {
    db.Book.findByPk(req.params.bookId).then(function (book) {
        if (book) {
            ret.json({check: true}, res);
        } else {
            ret.json({check: false}, res);
        }
    });
});

/**
 * check if the book is already out
 */
router.get("/loans/:bookId", function (req, res) {
    db.Loan.findOne({where: {BookId: req.params.bookId}}).then(function (loan) {
        if (loan) {
            ret.json({check: true}, res);
        } else {
            ret.json({check: false}, res);
        }
    });
});


module.exports = router;
