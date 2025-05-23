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
    res.render('about');
})

app.get('collect_answers', (req, res) => {
    res.render('collect_answers');
})

app.get('/how_to_use', (req, res) => {
    res.render('how_to_use');
})

app.get('/', (req, res) => {
    res.render('index');
})

app.get('/index', (req, res) => {
    res.render('index');
})


app.get('new_question', (req, res) => {
    res.render('new_question');
})

app.get('quiz_setup', (req, res) => {
    res.render('quiz_setup');
})

app.get('score_board', (req, res) => {
    res.render('score_board');
})

app.use((req, res) => {
    res.status(404).render('not_found');
})