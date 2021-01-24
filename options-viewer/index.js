module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const dbName = process.env.dbName;
    const collectionName = process.env.collectionName;
    const connStr = process.env.cosmosDb;
    
    const MongoClient = require("mongodb").MongoClient;
    const bingoDb = await (await MongoClient.connect(connStr)).db(dbName);
    const squares = bingoDb.collection(collectionName);

    const mumbleSquaresRepository = (await squares.find().toArray());

    context.res = {
        body: mumbleSquaresRepository
    };
}