const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");
const multer = require("multer");

/**
 * save uploaded images into /images directory
 * @type {DiskStorage}
 */
let store = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        let fileformat = (file.originalname).split('.');
        cb(null, 'img-' + Date.now() + '.' + fileformat[fileformat.length - 1]);
    }
})

/**
 * create multer object by storage
 * @type {Multer|undefined}
 */
let upload = multer({storage: store});

/**
 * post /
 * receive uploaded image and save
 * return filename
 */
router.post("/", upload.single('file'), function (req, res) {
    ret.json({img: req.file.filename}, res);
});

module.exports = router;
