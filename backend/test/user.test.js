const chai = require('chai');
const should = chai.should();
const User = require('../models/user');
const userController = require('../controller/user.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);

// list() - Get all users - test
// test for status code and for type

describe('User', () => {
  describe('list()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('list()', () => {
    it('request should be an object', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
  });

});

// register() - register a new user
// test for status code, for type and for property existence

describe('User', () => {
  describe('register()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)
        .get('/register')
        .end(function (err, res) {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe('register()', () => {
    it('request should be an object', (done) => {
      chai.request(baseUrl)
        .get('/register')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  describe('register()', () => {
    it('request should be an object', (done) => {
      chai.request(baseUrl)
        .get('/register')
        .end(function (err, res) {
          expect(res).to.be.an('object');
          done();
        });
    });
  });

});