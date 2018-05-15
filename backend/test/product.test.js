const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const pruductController = require('../controller/product.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const baseUrl = 'http://localhost:8080/pruduct/';
chai.use(chaiHttp);


describe('Product', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });
});
