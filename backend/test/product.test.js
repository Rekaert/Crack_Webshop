const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const productController = require('../controller/product.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const baseUrl = 'http://localhost:8080/product/';
const productId = '5afadcfc28fcf422f08c2857';
chai.use(chaiHttp);


describe('Product', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('find()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('image');
          res.body.should.have.property('manufacturer');
          res.body.should.have.property('_id').eql(productId);
          done();
        });
    });
  });
  describe('create()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('image');
          res.body.should.have.property('manufacturer');
          res.body.should.have.property('_id').eql(productId);
          done();
        });
    });
  });
  describe('update()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('image');
          res.body.should.have.property('manufacturer');
          res.body.should.have.property('_id').eql(productId);
          done();
        });
    });
  });
  describe('delete()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get(`/${productId}`)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('image');
          res.body.should.have.property('manufacturer');
          res.body.should.have.property('_id').eql(productId);
          done();
        });
    });
  });
});
