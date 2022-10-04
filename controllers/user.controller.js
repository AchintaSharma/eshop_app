const User = require("../models/user.model");

/**
 * Find all users : admin
 */

exports.findAllUsers = async (req, res) => {
    //Fetch data from DB
    try {
        const users = await User.find().lean();

        if (!users) {
            return res.status(200).send([])
        }
        // Remove private data 
    
        users.forEach(object => {
            delete (object["password"]);
        });

        console.log(users);

        //Return all users 
        return res.status(200).send(users);
    } catch (err) {
        console.log("Error while fetching all the users", err.message)
    }
}