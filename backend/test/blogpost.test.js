const chai = require('chai');
const should = chai.should();
const Blogpost = require('../models/blogpost');
const blogpostController = require('../controller/blogpost.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/blogpost';
chai.use(chaiHttp);

// Simple Base Examples
describe('Blogpost', () => {
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
});

// list() - Get all the posts
describe('Blogpost', () => {
  describe('list()', () => {
    it('it should GET all the posts', (done) => {
      chai.request(baseUrl)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
  });
});

// find() - Get one post by it's id
describe('Blogpost', () => {
  describe('find()', () => {
    it('it should GET a post by the given id', (done) => {
      let post = new Blogpost({
        title: 'valami',
        content: 'valami',
        userid: 'valami'
      });
      post.save((err, post) => {
        chai.request(baseUrl)
          .get('/' + post.id)
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('content');
            res.body.should.have.property('userid');
            res.body.should.have.property('_id').eql(post.id);
            done();
          });
      });
    });
  });
});

// create() - create a new post without userid property
describe('Blogpost', () => {
  describe('create()', () => {
    it('it should not POST a new post without userid property', (done) => {
      let post = {
        title: "valami",
        content: "valami"
      }
      chai.request(baseUrl)
        .post('/')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('errors');
          res.body.errors.should.have.property('userid');
          res.body.errors.pages.should.have.property('kind').eql('required');
          done();
        });
    });
  });
});

// create() - create a new post with all required properties
describe('Blogpost', () => {
  describe('create()', () => {
    it('it should POST a new post', (done) => {
      let post = {
        title: "valami",
        content: "valami",
        userid: "kimásolni egy userid-t"
      }
      chai.request(baseUrl)
        .post('/')
        .send(post)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Blogpost successfully added!');
          res.body.book.should.have.property('title');
          res.body.book.should.have.property('content');
          res.body.book.should.have.property('userid');
          //res.body.book.should.have.property('timestamps');
          done();
        });
    });
  });
});

// update() - update a post by a given id
describe('Blogpost', () => {
  describe('create()', () => {
    it('it should UPDATE a post given the id', (done) => {
      let post = new Blogpost({
        title: "valami",
        content: "valami",
        userid: "kimásolni egy userid-t"
      });
      post.save((err, post) => {
        chai.request(baseUrl)
          .put('/' + post.id)
          .send({
            title: "new title",
            content: "valami",
            userid: "kimásolni egy userid-t"
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Blogpost updated!');
            res.body.book.should.have.property('title').eql('new title');
            done();
          });
      });
    });
  });
});

// remove() - delete a post by given id
describe('Blogpost', () => {
  describe('remove()', () => {
    it('it should DELETE a post given the id', (done) => {
      let post = new Blogpost({
        title: "valami",
        content: "valami",
        userid: "kimásolni egy userid-t"
      });
      post.save((err, post) => {
        chai.request(baseUrl)
          .delete('/' + post.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Blogpost successfully deleted!');
            res.body.result.should.have.property('ok').eql(1);
            res.body.result.should.have.property('n').eql(1);
            done();
          });
      });
    });
  });
});