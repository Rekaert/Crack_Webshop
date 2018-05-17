const chai = require('chai');
const should = chai.should();
const Order = require('../models/order');
const orderController1 = require('../controller/order.controller.1');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order';
chai.use(chaiHttp);

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
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all/find/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response properties of an order by given id', (done) => {
      chai.request(baseUrl)
        .get('/all/find/' + '5afc350eca8a46309017c533')
        //.send()
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
        .get('/all/create')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all/create')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get('/all/create/' + '5afc350eca8a46309017c533')
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
        .get('/all/update/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all/update/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get('/all/update/' + '5afc350eca8a46309017c533')
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
        .get('/all/delete/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response type equal to object', (done) => {
      chai.request(baseUrl)
        .get('/all/delete/' + '5afc350eca8a46309017c533')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('request should have parameter id', (done) => {
      chai.request(baseUrl)
        .get('/all/delete/' + '5afc350eca8a46309017c533')
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







/*

// list() - Get all the orders
describe('Order', () => {
  describe('list()', () => {
    it('it should GET all the orders', (done) => {
      chai.request(baseUrl)
        .get('/all')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

// find() - Get one order by it's id
describe('Order', () => {
  describe('find()', () => {
    it('it should GET an order by the given id', (done) => {
      let order1 = new Order({
        userId: 'valami',
        quantity: 'valami',
        cost: 'valami'
      });
      post.save((err, post) => {
        chai.request(baseUrl)
          .get('/all/find/' + post.id)
          .send(order1)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('userId');
            res.body.should.have.property('quantity');
            res.body.should.have.property('cost');
            res.body.should.have.property('_id').eql(post.id);
            done();
          });
      });
    });
  });
});

// create() - create a new order without userId property
describe('Order', () => {
  describe('create()', () => {
    it('it should not POST a new order without userid property', (done) => {
      let order1 = {
        quantity: "1",
        cost: "5000"
      }
      chai.request(baseUrl)
        .post('/all/create')
        .send(order1)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('userId');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});

// create() - create a new order with all required properties
describe('Order', () => {
  describe('create()', () => {
    it('it should POST a new order', (done) => {
      let order1 = {
        quantity: "1",
        cost: "5000",
        userId: "5afaec96e9b3ad11a0b460c9"
      }
      chai.request(baseUrl)
        .post('/all/create')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Order successfully added!');
          res.body.book.should.have.property('quantity');
          res.body.book.should.have.property('cost');
          res.body.book.should.have.property('userId');
          done();
        });
    });
  });
});

// update() - update an order by a given id
describe('Order', () => {
  describe('create()', () => {
    it('it should UPDATE an order given the id', (done) => {
      let order1 = new Order({
        quanity: "1",
        cost: "5000",
        userid: "5afaec96e9b3ad11a0b460c9"
      });
      post.save((err, order1) => {
        chai.request(baseUrl)
          .put('/' + order1.id)
          .send({
            quantity: "2",
            cost: "10000",
            userid: "5afaec96e9b3ad11a0b460c9"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Order updated!');
            res.body.book.should.have.property('quantity').eql('2');
            res.body.book.should.have.property('cost').eql('10000');
            done();
          });
      });
    });
  });
});*/