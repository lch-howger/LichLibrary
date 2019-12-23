const express = require("express");
const router = express.Router();
const fs = require("fs");

router.get("/", function (req, res) {

    const filepath = "./views/index.html";

    fs.stat(filepath, function (err, stats) {
        if (err) {
            // 发送404响应
            res.writeHead(404);
            res.end("404 Not Found.");
        } else {
            // 发送200响应
            res.writeHead(200);
            // response是一个writeStream对象，fs读取html后，可以用pipe方法直接写入
            fs.createReadStream(filepath).pipe(res);

        }
    });

});

module.exports = router;
