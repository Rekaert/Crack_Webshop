const Product = require('../models/product');
const fs = require('fs-extra');
const request = require('request');
const path = require('path');

const formidable = require('formidable');
const util = require('util');

// function upload(req, res) {
//   let form = new formidable.IncomingForm();
//   form.parse(req, (err, fields, files) => {
//     const tempPath = files.upload.path;
//     const fileName = files.upload.name;
//     const newLocation = path.join(__dirname, 'public/img', fileName);

//     fs.copy(tempPath, newLocation, (err) => {
//       if (err) {
//         console.error(err);
//       } else {
//         res.writeHead(200, {
//           'content-type': 'text/plain'
//         });
//         res.write('received upload:\n\n');
//         res.end(`File uploaded to  ${newLocation}`);
//       }
//     });
//   });
// }

module.exports = {

  list: (req, res) => {
    Product.find({}, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    })
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
    Product.findByIdAndUpdate(req.params.id, req.body, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

  remove: (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, post) => {
      if (err) {
        res.send(err);
      }
      res.json(post);
    });
  },

};
