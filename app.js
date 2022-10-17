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
const Counter = require('./models/counter.model');
const counter = require('./middlewares/counterIncrement');
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
async function init() {
    //check if counters are initiated
    try {
        const isUserCounterInitated = await Counter.findOne({ category: 'userId' });
        if (!isUserCounterInitated) {
            const userCounter = await Counter.create({
                category: 'userId',
                count: 1
            });
        }
        const isAddressCounterInitated = await Counter.findOne({ category: 'addressId' });
        if (!isAddressCounterInitated) {
            const addressCounter = await Counter.create({
                category: 'addressId',
                count: 1
            });
        }
        const isProductCounterInitated = await Counter.findOne({ category: 'productId' });
        if (!isProductCounterInitated) {
            const productCounter = await Counter.create({
                category: 'productId',
                count: 1
            });
        }
        const isOrderCounterInitated = await Counter.findOne({ category: 'orderId' });
        if (!isOrderCounterInitated) {
            const orderCounter = await Counter.create({
                category: 'orderId',
                count: 1
            });
        }
    } catch (err) {
        console.log("Error while creating the counters", err.message);
    }

    //Check if admin is present
    try {
        const adminUser = await User.findOne({ role: constants.roles.admin });

        if (adminUser) {
            console.log("Admin user already exists");
            return;
        }
    } catch (err) {
        console.log("Error while fetching user", err.message);
    }
    //Create admin
    try {
        const adminObj = {
            _id: await counter.incrementUserCounter(1),
            email: "admin@upgrad.com",
            firstName: "upGrad",
            lastName: "Admin",
            password: bcrypt.hashSync("password", 10),
            contactNumber: "12345678",
            role: constants.roles.admin,
            userName: "admin_upgrad"
        }
        const admin = await User.create(adminObj);
        console.log(admin);
    } catch (err) {
        await counter.incrementUserCounter(-1),
            console.log("Error while storing the admin", err.message);
    }
}

/**
 * Plug in routes
 */

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/address.routes")(app);
require("./routes/product.routes")(app);
require("./routes/order.routes")(app);
/**
 * Start the server
 */
app.listen(serverConfig.PORT, () => {
    console.log(`Server started at PORT : ${serverConfig.PORT}`);

})