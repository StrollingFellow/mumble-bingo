module.exports = async function (context, myTimer) {

    const dbName = process.env.dbName;
    const collectionName = process.env.collectionName;
    const connStr = process.env.cosmosDb;
    const numSquares = 25;
    
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

    const order = shuffle([...Array(numSquares).keys()]);
    const MongoClient = require("mongodb").MongoClient;
    const bingoDb = await (await MongoClient.connect(connStr)).db(dbName);
    const squares = bingoDb.collection(collectionName);
    await squares.updateMany({active:true}, {$set: {active: false}});

    const mumbleSquaresRepository = (await squares.find().toArray());
    const mumbleSquares = shuffle(mumbleSquaresRepository).slice(0, numSquares);

    for (let square of mumbleSquares) {
      await squares.updateOne({text: square.text}, {$set: {active: true, order: order.pop()}});
    }
};