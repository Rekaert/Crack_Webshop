const Product = require('../models/product');


module.exports = {

    list: (req, res) => {
        Product.find({}, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post);
        })
    },

    find: (req, res) => {
        Product.findById(req.params._id, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.send(post)
        })
    },



    create: (req, res) => {
        Product.create(req.body, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post)
        })
    },

    update: (req, res) => {
        Product.findByIdAndUpdate(req.params._id, req.body, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(req.body)
        })
    },

    remove: (req, res) => {
        Product.findByIdAndRemove(req.params._id, (err, post) => {
            if (err) {
                res.send(err)
            }
            res.json(post)
        })
    },
}