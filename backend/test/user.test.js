const chai = require('chai');
const should = chai.should();
const User = require('../models/user');
const userController = require('../controller/user.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/user';
chai.use(chaiHttp);
