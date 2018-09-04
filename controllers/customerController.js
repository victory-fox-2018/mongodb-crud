const Customer = require('../models/customer')
const ObjectId = require('mongodb').ObjectID


module.exports = {
    getAllCustomers : function(req,res) {
        Customer.find(function(err,docs){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    Customers : docs
                })
            }
        })
    },

    createCustomer : function(req,res) {
        Customer.create({
            name: req.body.name,
            memberid: req.body.memberid,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone
        },function(err,docs){
            if (err) {
                res.status(500).json({
                    message: err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    data : docs
                })
            }
        })
    },

    updateCustomer : function(req,res) {
        Customer.update({_id:new ObjectId(req.params.id)},{
            name: req.body.name,
            memberid: req.body.memberid,
            address: req.body.address,
            zipcode: req.body.zipcode,
            phone: req.body.phone
        },function(err,docs){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success',
                    data: docs
                })
            }
        })
    },

    deleteCustomer : function(req,res) {
        Customer.remove({_id:new ObjectId(req.params.id)},function(err){
            if (err) {
                res.status(500).json({
                    message : err.message
                })
            } else {
                res.status(200).json({
                    message: 'success'
                })
            }
        })
    }
}
