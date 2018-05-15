const chai = require('chai');
const should = chai.should();
const Product = require('../models/product');
const pruductController = require('../controller/pruduct.controller');
const expect = require('chai').expect;
const chaiHttp = require('chai-http');

const baseUrl = 'http://localhost:8080/pruduct';
chai.use(chaiHttp);
