const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

/**
 * get /
 * enter users page
 * show user list
 */
router.get("/", function (req, res) {
    res.sendfile("./dist/users.html");
});

/**
 * get /list
 * return user list
 */
router.get("/list", function (req, res) {
    db.User.findAll().then(function (users) {
        ret.json(users, res);
    });
});

/**
 * get /add
 * enter add page
 * add new user
 */
router.get("/add", function (req, res) {
    res.sendfile("./dist/add.html");
});

/**
 * get /:userID
 * get user detail by user ID
 */
router.get("/:userID", function (req, res) {
    if (req.query.allEntities) {
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

/**
 * get /:authorID/change
 * enter change page
 */
router.get("/:authorID/change", function (req, res) {
    res.sendfile("./dist/add.html");
});

/**
 * get /:userID/loans/list
 * return loan list of the user by user ID
 */
router.get("/:userID/loans/list", function (req, res) {
    db.Loan.findAll({where: {userId: req.params.userID}}).then(function (loans) {
        ret.json(loans, res);
    });
});

/**
 * get /:userID/loans
 * enter addition page
 * add loan for the user
 */
router.get("/:userID/loans", function (req, res) {
    res.sendfile("./dist/users_addition.html");
});

/**
 * post /:userID/loans/:bookID
 * add new loan for the user
 * params:
 *      1.userID
 *      2.bookID
 */
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

/**
 * post /
 * create new user
 * params:
 *      1.name
 *      2.barcode
 *      3.memberType
 *      4.imgUrl
 */
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

/**
 * put /:userID
 * change user detail by user ID
 */
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

/**
 * delete /:userID
 * delete user by user ID
 */
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
