const express = require('express');
const fs = require('fs');
const { stringify } = require('csv-stringify/sync');
const { parse } = require('csv-parse/sync');
const morgan = require('morgan');

const app = express();
app.set('view engine', 'ejs');

app.listen(3000);

app.use(morgan('dev')); // prints to console data about incoming HTTP requests

app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})

app.get('/collect_answers', (req, res) => {
    res.render('collect_answers', {title: 'Answers'});
})

app.get('/how_to_use', (req, res) => {
    res.render('how_to_use', {title: 'Manual'});
})

app.get('/', (req, res) => {
    res.render('index', {title: 'Welcome'});
})

app.get('/index', (req, res) => {
    res.render('index', {title: 'Welcome'});
})

app.get('/new_question', (req, res) => {
    res.render('new_question', {title: 'Question'});
})

app.get('/quiz_setup', (req, res) => {
    res.render('quiz_setup', {title: 'Setup'});
})

app.get('/score_board', (req, res) => {
    res.render('score_board', {title: 'Scores'});
})

app.use((req, res) => {
    res.status(404).render('not_found');
})