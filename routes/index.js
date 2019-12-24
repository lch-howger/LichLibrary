const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {
    res.sendfile("./views/index.html");
});

module.exports = router;
