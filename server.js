const createError = require("http-errors");
const express = require("express");
const cors = require("cors");
const db = require("./data");
const path = require("path");
const fs = require("fs");

let authorsRouter = require("./routes/authors");
let booksRouter = require("./routes/books");
let usersRouter = require("./routes/users");
let loansRouter = require("./routes/loans");
let searchRouter = require("./routes/search");
let indexRouter = require("./routes/index");
let errorRouter = require("./routes/error");

let server = express();

// interpret JSON body of requests
server.use(express.json());

// interpret url-encoded queries
server.use(express.urlencoded({extended: false}));

// allow CORS
server.use(cors());

// allow CORS preflight for all routes
server.options("*", cors());

// set routers
server.use("/authors", authorsRouter);
server.use("/books", booksRouter);
server.use("/users", usersRouter);
server.use("/loans", loansRouter);
server.use("/search", searchRouter);
server.use("/", indexRouter);
// server.use("*", errorRouter);

// server.use(function (req, res) {
//     res.sendfile("./dist/error.html");
// });

// set static views
server.use('/views', express.static('views'));

// handle errors last
server.use(function (err, req, res, next) {
    res.status = err.status || 500;
    res.send(err);
});

// connect to the database and start the server running
db.initialiseDatabase(false, null);

// listen 3000
server.listen(3000, function () {
    console.log("server listening");
});
