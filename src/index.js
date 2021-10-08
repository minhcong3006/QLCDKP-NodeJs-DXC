const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const { types } = require('node-sass');
const route = require('./routers');
const port = 3000;
const db = require('./config/db');
const methodOverride = require('method-override');
const User = require('./app/models/user');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;
const SortMiddleware = require('./app/middleware/sortMiddleware');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

db.connect();
app.use(express.json());

// app.use(passport.initialize());
// app.use(passport.session());

app.use(methodOverride('_method'));

route(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(SortMiddleware);

// Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'resources', 'views'));

//HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.render('login');
});

app.get('/home', (req, res) => {
    res.render('home');
});

app.get('/register', (req, res) => {
    res.render('register');
});
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/register', (req, res) => {
    User.create(
        {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        },
        (err, result) => {
            console.log('insert success');
            res.redirect('login');
        },
    );
});

app.post('/', (req, res) => {
    User.findOne(
        {
            username: req.body.username,
        },
        (err, result) => {
            if (result.password == req.body.password) {
                console.log('login success');
                res.redirect('home');
            } else {
                console.log('login false');
                res.redirect('login');
            }
        },
    );
});

app.post('/login', (req, res) => {
    User.findOne(
        {
            username: req.body.username,
        },
        (err, result) => {
            if (result.password == req.body.password) {
                console.log('login success');
                res.redirect('home');
            } else {
                console.log('login false');
                res.redirect('login');
            }
        },
    );
});

// app.post(passport.authenticate('local', { failureRedirect: '/login' }))

// passport.use(new localStrategy(
//     (username, password, done) => {
//         User.find(user => user.usr == username)
//         if()
//     }
// ))

app.use(function (req, res, next) {
    var err = new Error('Page not Found');
    err.status = 404;
    next(err);
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});
