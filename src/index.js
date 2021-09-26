const express = require('express');
const path = require('path');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

// Template engine
app.engine('hbs', handlebars({
    extname: '.hbs'
}));

app.set('views', path.join(__dirname, 'resources','views'));

app.set('view engine', 'hbs');

//HTTP logger
app.use(morgan('combined'));

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});