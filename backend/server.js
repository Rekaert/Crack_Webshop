const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');
const path = require('path');
const rfs = require('rotating-file-stream');
const helmet = require('helmet');
const cors = require('cors');
const LocalStrategy = require('passport-local').Strategy;
const db = require('./config/database.js');
const User = require('./models/user');
const userRouter = require('./route/user.route');
const orderRouter = require('./route/order.route');
const productRouter = require('./route/product.route');
const kategoriaRouter = require('./route/kategoria.route');

/**
 * @constant logDirectory - Logging directory
 */
const logDirectory = path.join(__dirname, 'log');
/**
 * @constant port - The port where the server is running
 */
const port = process.env.PORT || 8080;
const app = express();

/**
 * Logging with morgan
 * @module morgan -Initialize logging file
 */
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const accessLogStream = rfs('access.log', {
  interval: '1d',
  path: logDirectory,
});
app.use(morgan('combined', {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
}));

/**
 * Scurity middleware with helmet
 * @module helmet
 */
app.use(helmet());

/**
 * Body Parser middleware
 * @module bodyParser
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));

/**
 * Use public folder for images
 */
app.use(express.static('public'));
app.get('/images/:img', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/img/', req.params.img));
});

/**
 * Session handling with middleware
 * @module express-session
 * @property {String} secret - Secret code
 * @property {Boolean} resave - Enable resaving session
 * @property {Object} cookie - Maximum age of cookies
 */
app.use(session({
  secret: 'secret',
  resave: true,
  httpOnly: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // seconds which equals 1 week
  },
}));

/**
 * Authentication middleware with passport
 * @module passport
 */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Connecting to MongoDB datebase
 * @module mongoose
 * @returns {String} - Success message
 */
mongoose.connect(db.uri, db.options)
  .then(() => {
    console.log('MongoDB connected.');
  })
  .catch((err) => {
    console.error(`MongoDB error.:${err}`);
  });

/**
 * Middleware for CORS Enabling
 * @module cors
 * @property {Boolean} credentials - Enable header
 * @property {String} origin - Server url
 */
app.use(cors({
  credentials: true,
  origin: 'http://localhost:4200',
}));

/**
 * Routing middlewares
 */
app.use('/user/', userRouter);
app.use('/order/', orderRouter);
app.use('/product/', productRouter);
app.use('/kategoria/', kategoriaRouter);


/**
 * Start server
 */
app.listen(port);
