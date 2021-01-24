module.exports = async function (context, req) {
    const sass = require("sass");
    const pug = require("pug");

    const dbName = process.env.dbName;
    const collectionName = process.env.collectionName;
    const connStr = process.env.cosmosDb;

    const MongoClient = require("mongodb").MongoClient;
    const bingoDb = await (await MongoClient.connect(connStr)).db(dbName);
    const squares = bingoDb.collection(collectionName);
    const mumbleSquares = (await squares.find({active: true}).toArray()).map(square => square.text);
    
    const mumbleSass = sass.renderSync({file: `${__dirname}/views/style.scss` }).css;


    context.res = {
        // status: 200, /* Defaults to 200 */
        body: pug.renderFile(`${__dirname}/views/index.pug`, {squares: mumbleSquares, styles: mumbleSass} ),
        headers: {
            "Content-Type": "text/html"
        }
    };
}