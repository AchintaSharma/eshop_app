const User = require("../models/user.model");

/**
 * Find all users : admin
 */

exports.findAllUsers = async (req, res) => {
    //Fetch data from DB
    try {
        const users = await User.find().lean();

        if (!users) {
            return res.status(400).send({
                message: "No records found"
            })
        }
        console.log(users);
        // Remove private data 
    
        users.forEach(object => {
            delete (object["password"]);
        });

        console.log(users);

        //Return all users 
        res.status(200).send(users);
    } catch (err) {
        console.log("Error while fetching all the users", err.message)
    }
}