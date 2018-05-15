const Product = require('../models/product');
const fs = require('fs');
const request = require('request');

const filePath = '/';

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
    const nev = req.body.name;
    req.body.image = `public/img/${nev}.jpg`;
    Product.create(req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      request(cim).pipe(fs.createWriteStream(`public/img/${nev}.jpg`));
      res.json(post);
    });
  },

  update: (req, res) => {
    const cim = req.body.image;
    const nev = req.body.name;
    req.body.image = `public/img/${nev}.jpg`;
    Product.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      request(cim).pipe(fs.createWriteStream(`public/img/${nev}.jpg`));
      res.json(post);
      deleteFile(post.image);
    });
  },

  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
      deleteFile(post.image);
    });
  },
};
