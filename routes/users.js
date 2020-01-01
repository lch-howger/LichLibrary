const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    res.sendfile("./dist/users.html");
});

router.get("/list", function (req, res) {
    db.User.findAll().then(function (users) {
        ret.json(users, res);
    });
});

router.get("/add", function (req, res) {
    res.sendfile("./dist/add.html");
});

router.get("/:userID", function (req, res) {
    if (req.query.allEntities == "true") {
        db.User.findByPk(req.params.userID).then(function (user) {
            if (user) {
                ret.json(user, res);
            } else {
                res.end();
            }
        });
    } else {
        res.sendfile("./dist/detail.html");
    }
});

router.get("/:authorID/change", function (req, res) {
    res.sendfile("./dist/add.html");
});

router.get("/:userID/loans/list", function (req, res) {
    db.Loan.findAll({where: {userId: req.params.userID}}).then(function (loans) {
        ret.json(loans, res);
    });
});

router.get("/:userID/loans", function (req, res) {
    res.sendfile("./dist/users_addition.html");
});

router.post("/:userID/loans/:bookID", function (req, res) {
    db.User.findByPk(req.params.userID).then(function (user) {
        if (user) {
            db.Book.findByPk(req.params.bookID).then(function (book) {
                if (book) {
                    db.Loan.findOrCreate({
                        where: {UserId: req.params.userID, BookId: req.params.bookID}
                    }).spread(function (loan, created) {
                        loan.dueDate = new Date(req.body.dueDate);
                        loan.save().then(function (loan) {
                            ret.json(loan, res);
                        });
                    });
                }
            });
        } else {
            res.end();
        }
    });
});

router.post("/", function (req, res) {
    db.User.create({
        name: req.body.name,
        barcode: req.body.barcode,
        memberType: req.body.memberType,
        imgUrl: req.body.imgUrl
    }).then(function (user) {
        ret.json(user, res);
    });
});

router.put("/:userID", function (req, res) {
    db.User.findByPk(req.params.userID).then(function (user) {
        if (user) {
            user.name = req.body.name;
            user.barcode = req.body.barcode;
            user.memberType = req.body.memberType;
            user.imgUrl = req.body.imgUrl;
            user.save().then(function (user) {
                ret.json(user, res);
            });
        } else {
            res.end();
        }
    });
});

router.delete("/:userID", function (req, res) {
    db.User.findByPk(req.params.userID)
        .then(function (user) {
            if (user) {
                return user.destroy();
            } else {
                res.end();
            }
        })
        .then(function () {
            res.end();
        });
});

module.exports = router;
