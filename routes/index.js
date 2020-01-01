const express = require("express");
const router = express.Router();

/**
 * enter index page
 */
router.get("/", function (req, res) {
    res.sendfile("./dist/index.html");
});

module.exports = router;
