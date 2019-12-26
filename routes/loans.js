const express = require("express");
const router = express.Router();

const db = require("../data");
const ret = require("../lib/return");

router.get("/", function (req, res) {
    res.sendfile("./dist/loans.html");
});

router.get("/list", function(req, res) {
    db.Loan.findAll().then(function(loans) {
        ret.json(loans, res);
    });
});

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
