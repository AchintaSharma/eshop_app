/**
 * This is the main application file
 */
const express = require('express');
const app = express();
const serverConfig = require("./configs/server.config");
const mongoose = require("mongoose");
const dbConfig = require("./configs/db.config");
const User = require("./models/user.model");
const constants = require("./utils/constants")
const bcrypt = require("bcryptjs");
const cookieParser = require('cookie-parser');


/**
 * Read JSON request body
 */
app.use(express.json());
app.use(cookieParser());

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
    /**
     * Initialize
     */
    init();
})

/**
 * Initialize : Check for and create ADMIN creds
 */
async function init () {
    //Check if admin is present
    try {
        const adminUser = await User.findOne({role : constants.roles.admin});

        if(adminUser) {
            console.log("Admin user already exists");
            return;
        } 
    } catch (err) {
        console.log("Error while fetching user", err.message);
    }

    try {
        const user = await User.create({
            _id : await User.find().count() + 1,
            email : "admin@upgrad.com",
            firstName : "upGrad",
            lastName : "Admin",
            password : bcrypt.hashSync("password", 10),
            phoneNumber : "12345678",
            role : constants.roles.admin,
            userName : "admin_upgrad"
        })

        console.log(user);
    } catch (err) {
        console.log("Error while storing the user", err.message);
    }
}

/**
 * Plug in routes
 */

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT : ${serverConfig.PORT}`);

})