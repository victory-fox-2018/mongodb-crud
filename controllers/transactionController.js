const Transaction = require('../models/transaction')
const ObjectId = require('mongodb').ObjectID

module.exports = {
    createTransaction : function(req,res) {
        Transaction.create({
            member: req.body.member,
            days: req.body.days,
            booklist: req.body.booklist
        },function(err,docs){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    data : docs
                })
            }
        })
    }
}
