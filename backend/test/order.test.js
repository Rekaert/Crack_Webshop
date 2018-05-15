const chai = require('chai');
const should = chai.should();
const Order = require('../models/order');
const orderController = require('../controller/order.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/order';
chai.use(chaiHttp);
