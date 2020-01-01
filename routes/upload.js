const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");
const fs = require('fs');
const multer = require("multer");

let store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        let fileformat = (file.originalname).split('.');
        cb(null, 'img-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
    }
})

let upload = multer({storage: store});

router.post("/", upload.single('file'), function (req, res) {
    ret.json({img: req.file.filename}, res);
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
