const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
    res.sendfile("./dist/error.html");
});

module.exports = router;
