/**
 * Controller for authentication : signup and login
 */
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSecret = require("../configs/auth.config");

/**
 * User registration/signup
*/
exports.signup = async (req, res) => {
    //Read user signup request body
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

/**
     * User login
     */

 exports.signin = async (req, res) => {
    //Check if the user exists
    const user = await User.findOne({ userName : req.body.userName});
    
    if(!user) {
        return res.status(400).send({
            message : "User does not exist"
        })
    }

    //Check if the password is correct 
   
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
    if(!isPasswordValid) {
        return res.status(400).send({
            message : "Password is incorrect"
        })
    }

    //Generate the token 

    const token = jwt.sign({
        userName : user.userName,
        role : user.role,
        createdAt : Date.now()
    }, authSecret.secret, {expiresIn : 120})

    //Return response

    return res.status(200).send({
        email : user.email,
        firstName : user.firstName,
        lastName : user.lastName,
        phoneNumber : user.userName,
        role : user.role,
        userName : user.userName,
        accessToken : token
    })
}

