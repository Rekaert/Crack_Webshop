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
const rateRouter = require('./route/rate.route');
const nodemailer = require('nodemailer');

/**
 * @constant logDirectory
 * @desc  - Logging directory
 */
const logDirectory = path.join(__dirname, 'log');
/**
 * @constant port
 * @desc - The port where the server is running
 */
const port = process.env.PORT || 8080;
/**
 * @module Express
 */
const app = express();

/**
 * Logging with morgan
 * @method morgan -Initialize logging file
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
 * Security middleware with helmet
 * @method helmet
 */
app.use(helmet());

/**
 * Body Parser middleware
 * @method bodyParser
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
 * @method express-session
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
 * @method passport
 */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * Connecting to MongoDB datebase
 * @method mongoose
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
 * @method cors
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
app.use('/rate/', rateRouter);


// Nodemailer

app.post('/sendemail', (req, res) => {
  const mailadr = req.body;
  console.log(mailadr);

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'crcklegowebstore@gmail.com',
      pass: 'Lego12345',
    },
  });
  const mailOptions = {
    from: mailadr.from,
    to: 'crcklegowebstore@gmail.com',
    subject: mailadr.subject,
    html: `<p>${mailadr.html}
    <br>
    <strong>From: ${mailadr.from}</strong>
    </p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    res.render('index');
  });
});

/**
 * Start server
 */
app.listen(port);