const asyncHandler = require("express-async-handler") ;
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");


const registerUser = asyncHandler( async (req, res) => {
   
    const {firstName ,lasttName ,  email , role ,  password , passwordConfirm } = req.body;

    //validation

    if(!firstName || !email || !password || !passwordConfirm){
        res.status(400);
        throw new Error("Please fill all the fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be at least 6 characters")
    }
    //check if user email already exists

    const userExists = await User.findOne({ email});

    if (userExists){
        res.status(400);
        throw new Error("email is already been registered   ");


    }
    //encrypt password before saving database

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);


    //create new user

    const user = await User.create({ firstName , lasttName , email, role,  password :hashedPassword ,passwordConfirm  })

    if (user){
        const{_id ,firstName ,lasttName , email, role ,  active} = user 
        res.status(201).json({
            _id ,
            firstName ,
            lasttName , 
            email, 
            role , 
            password,
            passwordConfirm,
            active,
            
        })
    }
        else{
            res.status(400);
            throw new Error("Invalid user data");
        }





});

module.exports = {
    registerUser,
}