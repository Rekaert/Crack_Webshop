const chai = require('chai');
const Product = require('../models/product');
const expect = require('chai').expect;
const assert = require('chai').assert;
const productController = require('../controller/user.controller');
const chaiHttp = require('chai-http');

const should = chai.should();
const baseUrl = 'http://localhost:8080/user/';
const productId = '5b054c3606ea1a37685e36b0';
// let productId1;
// let productId2;
// let productId3;
chai.use(chaiHttp);

let cookie;
const theAccount = {
  username: 'email@cim.com',
  password: 'qwer1234',
};
// const createProduct1 = {
//   username: 'sanyi',
//   password: 'sanyi',
//   email: 'sanyi@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666666',
//   perm: '1',
// };
// const createProduct2 = {
//   username: 'sanyi2',
//   password: 'sanyi2',
//   email: 'sanyi2@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666665',
//   perm: '1',
// };
// const createProduct3 = {
//   username: 'sanyi3',
//   password: 'sanyi3',
//   email: 'sanyi3@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666565',
//   perm: '1',
// };

// const updateProduct1 = {
//   username: 'sanyi2',
//   email: 'sanyi2@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666665',
//   perm: '1',
// };
// const updateProduct2 = {
//   username: 'sanyi3',
//   email: 'sanyi3@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666565',
//   perm: '1',
// };
// const updateProduct3 = {
//   username: 'sanyi',
//   email: 'sanyi@gmail.com',
//   szmlcim: 'Budapest',
//   szallcim: 'Debrecen',
//   tel: '066666666',
//   perm: '1',
// };

describe('User', () => {
  describe('all()', () => {
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
  describe('profile()', () => {
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
        .get('/profile')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          done();
        });
    });
    it('response should be an object', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .set('Cookie', cookie)
        .end((err, res) => {
          expect(res).to.be.an('object');
          done();
        });
    });
    it('response should have all properties', (done) => {
      chai.request(baseUrl)
        .get('/profile')
        .set('Cookie', cookie)
        .end((err, res) => {
          res.body.should.have.property('user');
          done();
        });
    });
  });
});
//   describe('register()', () => {
//     before((done) => {
//       chai.request('http://localhost:8080/user')
//         .post('/login')
//         .send(theAccount)
//         .end((err, res) => {
//           if (err) {
//             throw err;
//           }
//           cookie = res.headers['set-cookie'].pop().split(';')[0];
//           done();
//         });
//     });
//     it('response statusCode equal to 200', (done) => {
//       chai.request(baseUrl)
//         .post('/register')
//         .send(createProduct1)
//         .set('Cookie', cookie)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           productId1 = res.body._id;
//           console.log(res.body);
//           done();
//         });
//     });
//     it('response should be an object', (done) => {
//       chai.request(baseUrl)
//         .post('/register')
//         .send(createProduct2)
//         .set('Cookie', cookie)
//         .end((err, res) => {
//           productId2 = res.body._id;
//           expect(res).to.be.an('object');
//           done();
//         });
//     });
//     it('response should have all properties', (done) => {
//       chai.request(baseUrl)
//         .post('/register')
//         .send(createProduct3)
//         .set('Cookie', cookie)
//         .end((err, res) => {
//           productId3 = res.body._id;
//           res.body.user.should.have.property('username');
//           res.body.user.should.have.property('email');
//           res.body.user.should.have.property('szmlcim');
//           res.body.user.should.have.property('szallcim');
//           res.body.user.should.have.property('tel');
//           res.body.user.should.have.property('perm');
//           done();
//         });
//     });
//   });
// });
// describe('update()', () => {
//   before((done) => {
//     chai.request('http://localhost:8080/user')
//       .post('/login')
//       .send(theAccount)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         cookie = res.headers['set-cookie'].pop().split(';')[0];
//         done();
//       });
//   });
//   it('response statusCode equal to 200', (done) => {
//     chai.request(baseUrl)
//       .put(`/update/${productId1}`)
//       .send(updateProduct1)
//       .set('Cookie', cookie)
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         console.log(res.body);
//         done();
//       });
//   });
//   it('response should be an object', (done) => {
//     chai.request(baseUrl)
//       .put(`/update/${productId2}`)
//       .send(updateProduct2)
//       .set('Cookie', cookie)
//       .end((err, res) => {
//         expect(res).to.be.an('object');
//         done();
//       });
//   });
//   it('response should have all parameters', (done) => {
//     chai.request(baseUrl)
//       .put(`/update/${productId3}`)
//       .set('Cookie', cookie)
//       .send(updateProduct3)
//       .end((err, res) => {
//         res.body.should.have.property('username');
//         res.body.should.have.property('email');
//         res.body.should.have.property('szmlcim');
//         res.body.should.have.property('szallcim');
//         res.body.should.have.property('tel');
//         res.body.should.have.property('perm');
//         done();
//       });
//   });
// });
// describe('delete()', () => {
//   before((done) => {
//     chai.request('http://localhost:8080/user')
//       .post('/login')
//       .send(theAccount)
//       .end((err, res) => {
//         if (err) {
//           throw err;
//         }
//         cookie = res.headers['set-cookie'].pop().split(';')[0];
//         done();
//       });
//   });
//   it('response statusCode equal to 200', (done) => {
//     chai.request(baseUrl)
//       .delete(`/delete/${productId1}`)
//       .set('Cookie', cookie)
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
//   it('response should be an object', (done) => {
//     chai.request(baseUrl)
//       .delete(`/delete/${productId2}`)
//       .set('Cookie', cookie)
//       .end((err, res) => {
//         expect(res.body).to.be.an('object');
//         console.log(res.body);
//         done();
//       });
//   });
//   it('response should have all parameters', (done) => {
//     chai.request(baseUrl)
//       .delete(`/delete/${productId3}`)
//       .set('Cookie', cookie)
//       .end((err, res) => {
//         res.body.should.have.property('username');
//         res.body.should.have.property('email');
//         res.body.should.have.property('szmlcim');
//         res.body.should.have.property('szallcim');
//         res.body.should.have.property('tel');
//         res.body.should.have.property('perm');
//         done();
//       });
// });
// });
