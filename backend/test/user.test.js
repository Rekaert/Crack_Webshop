const chai = require('chai');
const should = chai.should();
const User = require('../models/user');
const userController = require('../controller/user.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);

const theAccount = {

  username: 'testAdmin@gmail.com',

  password: '1234',

};

let cookie;

/**

* useradmin.controller összevont unit teszt

* @todo debug test of editUser, removeUser

*/

describe('user.controller functions', () => {
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
        // Login során kapunk egy sütit a http headerbe, ezt lementjük a süti változóba

        // Ez azért kell mert minden kérésnél, amihez szükséges a belépett user,

        // el kell küldeni a kapott sütit is. Hiszen ez azonosítja a usert

        // Itt nincs böngésző ami lementse, így manuálisan kell

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

            .put('/5afb52e7d17dc124d4783668')

            // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

            .set('Cookie', cookie)

            .end((err, res) => {

              expect(res).to.have.status(200);

              console.log(cookie);

              done();

            });

        });

      });

      describe('delete()', () => {

        it('response statusCode equal to 200', (done) => {

          chai.request(baseUrl)

            .delete('/5afc36d874f57e1a5ca9dd3f')

            // A sütit visszaküldjük minden kérésnél, ahol kell a user azonosítása

            .set('Cookie', cookie)

            .end((err, res) => {

              expect(res).to.have.status(200);
              expect(res).body.should.have.property('_id').eql(post._id);

              done();

            });

        });

      });

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

      describe('update()', () => {
        it('response statusCode equal to 200 and object in res', (done) => {
          chai.request(baseUrl)

            .post('/update/5afc080725e7b621b4ea4dea')

            .end((err, res) => {

              expect(res).to.have.status(200);

              expect(res).to.be.an('object');
              expect(res).body.should.have.property('_id').eql(post._id);
              done();

            });

        });


      });