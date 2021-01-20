const express = require('express');
const fs = require('fs');
const sass = require('sass');

const port = 3000;
const mumbleSass = sass.renderSync({file: `${__dirname}/views/style.scss` }).css;

const squares = JSON.parse(fs.readFileSync(`${__dirname}/MumbleSquares.json`));

const app = express();
app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

app.get('/', async(req, res)=> {
    res.render("index", {squares: squares, styles: mumbleSass})
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })