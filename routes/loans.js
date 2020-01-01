const express = require("express");
const router = express.Router();
const db = require("../data");
const ret = require("../lib/return");

/**
 * get /
 * enter loans page
 * show loan list
 */
router.get("/", function (req, res) {
    res.sendfile("./dist/loans.html");
});

/**
 * get /list
 * return loan list
 */
router.get("/list", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});

/**
 * get /:loanID
 * return loan detail by loan ID
 */
router.get("/:loanID", function(req, res) {
    if (req.query.allEntities == "true") {
        db.Loan.findByPk(req.params.loanID).then(function (loan) {
            if (loan) {
                ret.json(loan, res);
            } else {
                res.end();
            }
        });
    } else {
        res.sendfile("./dist/detail.html");
    }
});

/**
 * get /:loanID/change
 * enter change page
 */
router.get("/:loanID/change", function (req, res) {
    res.sendfile("./dist/add.html");
});

/**
 * put /:loanID
 * change loan by loan ID
 */
router.put("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID).then(function(loan) {
        if (loan) {
            loan.dueDate = new Date(req.body.dueDate);
            loan.save().then(function(loan) {
                ret.json(loan, res);
            });
        } else {
            res.end();
        }
    });
});

/**
 * delete /:loanID
 * delete loan by loan ID
 */
router.delete("/:loanID", function(req, res) {
    db.Loan.findByPk(req.params.loanID)
        .then(function(loan) {
            if (loan) {
                return loan.destroy();
            } else {
                res.end();
            }
        })
        .then(function() {
            res.end();
        });
});

module.exports = router;
