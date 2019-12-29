const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

router.get("/authorId/:authorId", function (req, res) {
    db.Author.findByPk(req.params.authorId).then(function (author) {
        if (author) {
            ret.json({check: true}, res);
        } else {
            ret.json({check: false}, res);
        }
    });
});

router.get("/bookId/:bookId", function (req, res) {
    db.Book.findByPk(req.params.bookId).then(function (book) {
        if (book) {
            ret.json({check: true}, res);
        } else {
            ret.json({check: false}, res);
        }
    });
});



module.exports = router;
