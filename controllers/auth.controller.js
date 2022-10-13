/**
 * Controller for authentication : signup and login
 */
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSecret = require("../configs/auth.config");
const constants = require("../utils/constants");

/**
 * User registration/signup
*/
exports.signup = async (req, res) => {
    //Read user signup request body
    const userObj = {
        // id: await User.find().count() + 1,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: bcrypt.hashSync(req.body.password, 10),
        phoneNumber: req.body.phoneNumber,
        role: req.body.role,
        userName: req.body.userName ?? constants.roles.userName
    }

    try {
        //Store user in DB
        const user = await User.create(userObj);

        //Return response 
        const userResp = {
            _id: user._id,
            firstName: user.firstName,
            lastName: req.body.lastName,
            email: user.email,
        }
        res.status(201).send(userResp);
    } catch (err) {
        console.log("Error while creating new user", err.message);
        res.status(500).send({
            message: "Some internal error happened while inserting new user"
        })
    }
}

/**
     * User login
     */

exports.signin = async (req, res) => {
    try {
        //Check if the user exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.status(400).send({
                message: "This email has not been registered!"
            })
        }

        //Check if the password is correct 
        const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({
                message: "Invalid Credentials!"
            })
        }

        //Generate the token 
        const token = jwt.sign({
            userName: user.userName,
            role: user.role,
            createdAt: Date.now()
        }, authSecret.secret, { expiresIn: 600 })

        /**
         *  //Set token into cookies
            let options = {
                sameSite: true,
                maxAge: 1000 * 60 * 60 * 24, 
                    // would expire after 24 hours
                httpOnly: true,        
                    // The cookie only accessible by the web server
            }
            res.cookie('x-access-token', token, options)
            */

        res.header('x-auth-token', token);
        //Return response
        return res.status(200).send({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.userName,
            role: user.role,
            userName: user.userName,
            accessToken: token
        })
    } catch (err) {
        console.log("Error while signing in", err.message);
        return res.status(500).send({
            message: "Some internal server error occured while signing in"
        })
    }
}

