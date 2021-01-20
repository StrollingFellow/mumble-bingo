const fs = require("fs");

const numSquares = 25;

/** 
 * @param {Array} array A method to annouce the person's name.
 * @returns {Array}
 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
  

fs.writeFileSync(`${__dirname}/MumbleSquares.json`, JSON.stringify(shuffle(JSON.parse(fs.readFileSync(`${__dirname}/MumbleSquaresRepository.json`))).slice(0, numSquares)));