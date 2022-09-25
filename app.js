/**
 * This is the main application file
 */
const express = require('express');
const app = express();
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");


/**
 * Connect to the DB
 */
mongoose.connect(dbConfig.DB_URL);

const db = mongoose.connection;

db.on("error", () => {
    console.log("Error while connecting to the DB");
});

db.once("open", () => {
    console.log("Connected to the MongoDB");
})



/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT : ${serverConfig.PORT}`);

})