const chai = require('chai');

const should = chai.should();
const User = require('../models/user');
const userController = require('../controller/user.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
const userId = '5afc8d128ec0691788342495';
chai.use(chaiHttp);

const theAccount = {
  username: 'testAdmin@gmail.com',
  password: '1234',
};

let cookie;

// test - user controller

// test - update a specific user - register and logged in

describe('User', () => {
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
  describe('register()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .post('/register')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res).to.have.property('username');
          expect(res).to.have.property('email');
          expect(res).to.have.property('szmlcim');
          expect(res).to.have.property('szallcim');
          expect(res).to.have.property('tel');
          expect(res).to.have.property('perm');
          expect(res).to.have.property('password');
          done();
        });
    });
  });

  // test - get user profile
  describe('profile()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          done();
        });
    });
  });

  // test - get all users

  describe('all()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).to.be.an('array');
          done();
        });
    });
  });


  describe('update()', () => {


    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)

        .post('/5afc8d128ec0691788342495')

        // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

        .set('Cookie', cookie)

        .end((err, res) => {
          expect(res).to.have.status(200);

          console.log(cookie);

          done();
        });
    });
  });

  // test - update user? logout?
  describe('update()', () => {
    it('response statusCode equal to 200 and object in res', (done) => {
      chai.request(baseUrl)

        .post('/update/5afc8d128ec069178834249')
        .end((err, res) => {
          expect(res).to.have.status(200);

          expect(res).to.be.an('object');
          expect(res).body.should.have.property('_id').eql(userId);
          done();
        });
    });
  });

  // test - delete user
  describe('delete()', () => {
    it('response statusCode equal to 200', (done) => {
      chai.request(baseUrl)

        .delete('/delete/5afc8d128ec0691788342495')

        // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res).body.should.have.property('_id').eql(userId);

          done();
        });
    });
  });
});