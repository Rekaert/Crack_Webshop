const chai = require('chai');
const should = chai.should();
const Order = require('../models/order');
const orderController1 = require('../controller/order.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order';
chai.use(chaiHttp);

const theAccount = {
  username: 'helga@gmail.com',
  password: 'helga',
};

const theOrder = {
  _id: "5afc350eca8a46309017c533",
  userId: "5afd3033add1fd3b8c39b967",
  cost: "15000",
  quantity: "3"
};

var cookie;

describe('User', () => {
  describe('login()', () => {
    before((done) => {
      chai.request('http://localhost:8080/user')
        .post('/login')
        .send(theAccount)
        .end((err, res) => {
          if (err) {
            throw err;
          }
          console.log(res);
          cookie = res.headers['set-cookie'].pop().split(';')[0];
          done();
        });
    });
  });
})


// list()
describe('Order', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/all')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
  });
  // find()
  describe('find()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/all/find/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all/find/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response properties of an order by given id', (done) => {
      chai.request(baseUrl)
        .get('/all/find/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').eql('5afc350eca8a46309017c533');
          done();
        });
    });
  });

  // create()
  describe('create()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .post('/all/create')
        .send({
          userId: "5afd3033add1fd3b8c39b967",
          cost: "15000",
          quantity: "3"
        })
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .post('/all/create')
        .send({
          userId: "5afd3033add1fd3b8c39b967",
          cost: "15000",
          quantity: "3"
        })
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .post('/all/create/' + '5afc350eca8a46309017c533')
        .send({
          userId: "5afd3033add1fd3b8c39b967",
          cost: "15000",
          quantity: "3"
        })
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').eql('5afc350eca8a46309017c533');
          done();
        });
    });
  });
  // update()
  describe('update()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .put('/all/update/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .put('/all/update/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .put('/all/update/' + '5afc350eca8a46309017c533')
        .send(theOrder)
        .end((err, res) => {
          res.body.should.be.a('object');
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').eql('5afc350eca8a46309017c533');
          done();
        });
    });
  });
  // remove()
  describe('remove()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .delete('/all/delete/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .delete('/all/delete/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .delete('/all/delete/' + '5afc350eca8a46309017c533')
        .end((err, res) => {
          console.log(res.body);
          res.body.should.have.property('userId');
          res.body.should.have.property('quantity');
          res.body.should.have.property('cost');
          res.body.should.have.property('_id').eql('5afc350eca8a46309017c533');
          done();
        });
    });
  });
});
