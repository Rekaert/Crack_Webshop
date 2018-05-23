const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const productController = require('../controller/order.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const baseUrl = 'http://localhost:8080/order/';
const productId = '5b05263ff7e871245c9b60fd';
let productId1;
let productId2;
let productId3;
chai.use(chaiHttp);

let cookie;
const theAccount = {
  username: 'email@cim.com',
  password: 'qwer1234',
};
const createProduct1 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '3',
  cost: '10000',
};
const createProduct2 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '5',
  cost: '15000',
};
const createProduct3 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '6',
  cost: '18000',
};

const updateProduct1 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '5',
  cost: '15000',
};
const updateProduct2 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '6',
  cost: '18000',
};
const updateProduct3 = {
  userId: '5b054c3606ea1a37685e36b0',
  quantity: '3',
  cost: '10000',
};

describe('Order', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/all/')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get('/all')
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  describe('find()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get(`/all/find/${productId}`)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get(`/all/find/${productId}`)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response should have all properties', (done) => {
      chai.request(baseUrl)
        .get(`/all/find/${productId}`)
        .end((err, res) => {
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          done();
        });
    });
  });
  describe('create()', () => {
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/all/create')
        .send(createProduct1)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          productId1 = res.body._id;
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .post('/all/create')
        .send(createProduct2)
        .set('Cookie', cookie)
        .end((err, res) => {
          productId2 = res.body._id;
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response should have all properties', (done) => {
      chai.request(baseUrl)
        .post('/all/create')
        .send(createProduct3)
        .set('Cookie', cookie)
        .end((err, res) => {
          productId3 = res.body._id;
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          done();
        });
    });
  });
  describe('update()', () => {
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put(`/all/update/${productId1}`)
        .send(updateProduct1)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .put(`/all/update/${productId2}`)
        .send(updateProduct2)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response should have all parameters', (done) => {
      chai.request(baseUrl)
        .put(`/all/update/${productId3}`)
        .set('Cookie', cookie)
        .send(updateProduct3)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('userId');
          res.body.should.have.property('cost');
          res.body.should.have.property('quantity');
          done();
        });
    });
  });
  describe('delete()', () => {
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .delete(`/all/delete/${productId1}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .delete(`/all/delete/${productId2}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('response should have all parameters', (done) => {
      chai.request(baseUrl)
        .delete(`/all/delete/${productId3}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          done();
        });
    });
  });
});
