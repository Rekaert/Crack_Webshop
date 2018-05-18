const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const productController = require('../controller/product.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const baseUrl = 'http://localhost:8080/product/';
const productId = '5afdb8dfb6d8660cb000ff22';
chai.use(chaiHttp);

let cookie;
const theAccount = {
  username: 'dani@gmail.com',
  password: 'dani',
};
const createProduct = {
  name: 'dani@gmail.com',
  url: 'dani',
  image: 'https://www.google.hu/search?q=k%C3%A9p&source=lnms&tbm=isch&sa=X&ved=0ahUKEwikmMncn43bAhVHkywKHdEUDOEQ_AUICigB&biw=1536&bih=759#imgrc=-Aq6sdWT13lBUM:',
  manufacturer: 'dani',
  cost: 5000,
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
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          console.log(cookie);
          done();
        });
    });
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/')
        .set('Cookie', cookie)
        .end((err, res) => {
          console.log(res.body);
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .post('/')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have all properties', (done) => {
      chai.request(baseUrl)
        .post('/')
        .set('Cookie', cookie)
        .send(createProduct)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('name');
          res.body.should.have.property('url');
          res.body.should.have.property('image');
          res.body.should.have.property('manufacturer');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').eql(productId);
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
        .put(`/${productId}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .put(`/${productId}`)
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .put(`/${productId}`)
        .set('Cookie', cookie)
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
  // describe('delete()', () => {
  //   it('response statusCode equal to 200', (done) => {
  //     chai.request(baseUrl)
  //       .delete(`/${productId}`)
  //       .end((err, res) => {
  //         expect(err).to.be.null;
  //         expect(res).to.have.status(200);
  //         done();
  //       });
  //   });
  //   it('response should be an object', (done) => {
  //     chai.request(baseUrl)
  //       .delete(`/${productId}`)
  //       .end((err, res) => {
  //         expect(res).to.be.an('object');
  //         done();
  //       });
  //   });
  //   it('request should have parameter id', (done) => {
  //     chai.request(baseUrl)
  //       .delete(`/${productId}`)
  //       .end((err, res) => {
  //         res.body.should.be.a('object');
  //         res.body.should.have.property('name');
  //         res.body.should.have.property('url');
  //         res.body.should.have.property('image');
  //         res.body.should.have.property('manufacturer');
  //         res.body.should.have.property('_id').eql(productId);
  //         done();
  //       });
  //   });
  // });
});
