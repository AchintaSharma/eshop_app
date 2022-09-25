/**
 * Controller for authentication : signup and login
 */
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");

/**
 * User registration
*/
exports.signup = async (req, res) => {
    //Read user signup request body
    console.log(req.body);
    const userObj = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        userName: req.body.userName
    }
    
    try {
        //Store user in DB
        const user = await User.create(userObj);
    
        //Return response 
        const userResp = {
            email: user.email,
            firstName: user.firstName,
            lastName: req.body.lastName,
            phoneNumber: user.phoneNumber,
            role: user.role,
            userName: req.body.userName
        }

        res.status(201).send(userResp);
    } catch (err) {
        console.log("Error while creating new user", err.message);
        res.status(500).send({
            message: "Some internal error happened while inserting new user"
        })
    }
    
}



