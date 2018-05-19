const Product = require('../models/product');
const fs = require('fs');
const request = require('request');

const filePath = './public/img/';

function deleteFile(fileName) {
  fs.unlinkSync(filePath + fileName);
}

module.exports = {

  list: (req, res) => {
    Product.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },
  findByUrl: (req, res) => {
    Product.find({
      url: req.params.url,
    }, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },
  find: (req, res) => {
    Product.findById(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.send(post);
    });
  },

  create: (req, res) => {
    const cim = req.body.image;
    const url = req.body.url;
    req.body.image = `${url}.jpg`;
    request(cim).pipe(fs.createWriteStream(`public/img/${url}.jpg`));
    Product.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  update: (req, res) => {
    if (req.body.oldImage) {
      const cim = req.body.image;
      const urlcim = req.body.url;
      req.body.image = `${urlcim}.jpg`;
      request(cim).pipe(fs.createWriteStream(`public/img/${urlcim}.jpg`));
      deleteFile(req.body.oldImage);
    }
    Product.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
      }
    });
  },

  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      } else {
        res.json(post);
        deleteFile(post.image);
      }
    });
  },
};
