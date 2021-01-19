const express = require('express');
const rl = require('readlines');
const app = express();
const seedrandom = require('seedrandom');
const fs = require('fs');
const sass = require('sass');

const port = 3000;
const mumbleSass = sass.renderSync({file: `${__dirname}/views/style.scss` }).css;

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`)

app.get('/', async(req, res)=> {
    const squares = JSON.parse(fs.readFileSync(`${__dirname}/MumbleSquares.json`));

    res.render("index", {squares: squares, styles: mumbleSass})
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
  })