const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const productController = require('../controller/order.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const baseUrl = 'http://localhost:8080/order/';
const productId = '5b05257c4d668223ec95348f';
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
  name: 'valami1',
  url: 'valami1',
  image: 'http://m.blog.hu/ro/rovidvelemenyek/image/aaaaaa_1.jpg',
  manufacturer: 'lego1',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 50000,
};
const createProduct2 = {
  name: 'valami2',
  url: 'valami2',
  manufacturer: 'lego2',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 50000,
  image: 'http://m.blog.hu/ro/rovidvelemenyek/image/aaaaaa_1.jpg',
};
const createProduct3 = {
  name: 'valami3',
  url: 'valami3',
  manufacturer: 'lego3',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 50000,
  image: 'http://m.blog.hu/ro/rovidvelemenyek/image/aaaaaa_1.jpg',
};

const updateProduct1 = {
  name: 'valami1Up',
  url: 'valami1Up',
  manufacturer: 'legoUp',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 200,
};
const updateProduct2 = {
  name: 'valami2Up',
  url: 'valami2Up',
  manufacturer: 'lego2Up',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 200,
};
const updateProduct3 = {
  name: 'valami3Up',
  url: 'valami3Up',
  manufacturer: 'legoUp',
  catId: '5b0523d7c5a48e14c0789707',
  cost: 200,
};

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
    it('response should have all properties', (done) => {
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
        .post('/')
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
        .post('/')
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
        .post('/')
        .send(createProduct3)
        .set('Cookie', cookie)
        .end((err, res) => {
          productId3 = res.body._id;
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('manufacturer');
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
        .put(`/${productId1}`)
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
        .put(`/${productId2}`)
        .send(updateProduct2)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response should have all parameters', (done) => {
      chai.request(baseUrl)
        .put(`/${productId3}`)
        .set('Cookie', cookie)
        .send(updateProduct3)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('manufacturer');
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
        .delete(`/${productId1}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .delete(`/${productId2}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('response should have all parameters', (done) => {
      chai.request(baseUrl)
        .delete(`/${productId3}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('manufacturer');
          done();
        });
    });
  });
});
