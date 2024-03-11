const asyncHandler = require("express-async-handler") ;
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Token = require("../models/tokenModel"); 
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmails");


// Genarate Token

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d",
    })
}

const registerUser = asyncHandler( async (req, res) => {
   
    const {firstName ,lasttName ,  email , role , username, password , passwordConfirm } = req.body;

    //validation

    if(!firstName || !email || !role || !username|| !password || !passwordConfirm){
        res.status(400);
        throw new Error("Please fill all the fields")
    }
    if(password.length < 6){
        res.status(400)
        throw new Error("Password must be at least 6 characters")
    }
    //check if user email already exists

    const emailExists = await User.findOne({ email});
   

    if (emailExists){
        res.status(400);
        throw new Error("email is already been registered   ");


    }
    const userExist = await User.findOne({ username });
    if (userExist) {
        res.status(400);
        throw new Error("User already exists");
    }

    
    //encrypt password before saving database


    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const hashedpasswordConfirm = await bcrypt.hash(passwordConfirm, salt);

    // check whether password are matches

    const passwordCorrect = await bcrypt.compare(password, hashedpasswordConfirm);
    
    if(!passwordCorrect){
        res.status(400);
        throw new Error("Password does not match");
    }

    


    //create new user

    const user = await User.create({ username ,firstName , lasttName , email, role,  password :hashedPassword ,passwordConfirm  });

     //Genarete token

     const token = generateToken(user._id );

     //send HTTP-only token cookie
     res.cookie("token", token ,{
         path: "/",
         httpOnly: true,
         expires: new Date(Date.now() +1000*86400),//one day
         sameSite: "none",
         secure: true
     });
 

    if (user){
        const{_id ,username, firstName ,lasttName , email, role ,  active} = user 
        res.status(201).json({
            _id ,
            username,
            firstName ,
            lasttName , 
            email, 
            role , 
            active,
        
            
        })
    }
        else{
            res.status(400);
            throw new Error("Invalid user data");
        }

    });
        // login user

    const loginUser = asyncHandler(async (req, res) => {
        const {username, password } = req.body;

    // validation
        if (!username || !password) {
            res.status(400);
            throw new Error("Please add userName and the password");
        }

    // check if user exists
        const user = await User.findOne({ username });
        if (!user) {
            res.status(400);
            throw new Error("User not found!!,please signup");
        }

    // user exit then check if password matches
        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        
    const token = generateToken(user._id );

    //send HTTP-only token cookie
    res.cookie("token", token ,{
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() +1000*86400),//one day
        sameSite: "none",
        secure: true
    });
    
        
        if (user && passwordIsCorrect) {
            const{_id ,firstName ,lasttName , email, role ,  active} = user ;
            res.status(200).json({
                _id ,
                username,
            firstName ,
            lasttName , 
            email, 
            role , 
            active,
           
            });
        }else{
            res.status(400);
            throw new Error("Invalid userName or password");
        }

        

        
    });

// logoutUser
    
        const logoutUser = asyncHandler(async (req, res) => {
            //send HTTP-only token cookie
            res.cookie("token", "" ,{
                path: "/",
                httpOnly: true,
                expires: new Date(0),
                sameSite: "none",
                secure: true
            });
            return res.status(200).json({
                message: "Logged out successfully",
            });

              
        });

// get user Data

const getUser = asyncHandler(async (req, res) => {
    

    const user = await User.findById(req.user._id)
    if (user){
        const{_id ,username,firstName ,lasttName , email, role ,  active} = user 
        res.status(201).json({
            _id ,
            username,
            firstName ,
            lasttName , 
            email, 
            role ,  
            active,
            
        })
    }
        else{
            res.status(400);
            throw new Error("User not found ");
        }





});


//get login status

const loginStatus = asyncHandler(async (req, res) => {

    const token = req.cookies.token;
    if(!token){
        return res.json(false)
    }

    //verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    if(!verified){
        return res.json(false)
    }
    return res.json(true)

});

// Update user 

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
  
    if (user) {
      const {firstName ,lasttName , email, role ,  active} = user;
      user.email = email;
      user.firstName = req.body.firstName || firstName;
      user.lasttName = req.body.lasttName || lasttName;
      user.role = req.body.role || role;
      user.active = req.body.active || active;
  
      const updatedUser = await user.save();
      res.status(200).json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lasttName: updatedUser.lasttName,
        role: updatedUser.role,
        active: updatedUser.active,
      });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  });

const changePassword = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);

    const{oldPassword, newPassword} = req.body;

    if(!user){
        res.status(400);
        throw new Error("User not found,please signUP");
    }
    //validate
    if(!oldPassword || !newPassword){
        res.status(400);
        throw new Error("Please fill all the fields");
    }

    // check if old password matches with db password

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password);
    if(!passwordIsCorrect){
        res.status(400);
        throw new Error("Old password is incorrect");
    }

    // save new password
    if(user && passwordIsCorrect){
        user.password = newPassword;
        await user.save();
        res.status(200).send(
           "Password changed successfully",
        );
    }
    else {
        res.status(400);
        throw new Error("Invalid user data");
    }



});

const forgotPassword = asyncHandler(async (req, res) => {
    
    const username = req.body.username;
    const finduser = await User.findOne(username);
    if (!finduser) {
        res.status(404);
        throw new Error("User not found");
    }
    
    
    // Delete token if it exists in DB
  let token = await Token.findOne({ userId: user._id });

  if (token) 
  {
    await token.deleteOne();
  }

    // create reset token
    let resetToken = crypto.randomBytes(32).toString("hex") + user._id ;
    console.log(resetToken);


    // Hash token before saving to DB
  const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken) 
  .digest("hex");

// Save Token to DB
await new Token({
  userId: user._id,
  token: hashedToken,
  createdAt: Date.now(),
  expiresAt: Date.now() + 30 * (60 * 1000), // Thirty minutes
}).save();

// Construct Reset Url
const resetUrl = `${process.env.FRONTEND_URL}/resetpassword/${resetToken}`;

// Reset Email
const message = `
    <h2>Hello ${user.name}</h2>
    <p>Please use the url below to reset your password</p>  
    <p>This reset link is valid for only 30minutes.</p>

    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>

    <p>Regards...</p>
    <p>Pinvent Team</p>
  `;
const subject = "Password Reset Request";
const send_to = user.email;
const sent_from = process.env.EMAIL_USER;

try {
  await sendEmail(subject, message, send_to, sent_from);
  return res.status(200).json({ success: true, message: "Reset Email Sent" });
} catch (error) {
  res.status(500);
  throw new Error("Email not sent, please try again");
}
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
const { password } = req.body;
const { resetToken } = req.params;

// Hash token, then compare to Token in DB
const hashedToken = crypto
  .createHash("sha256")
  .update(resetToken)
  .digest("hex");

// fIND tOKEN in DB
const userToken = await Token.findOne({
  token: hashedToken,
  expiresAt: { $gt: Date.now() },
});

if (!userToken) {
   res.status(404);
  throw new Error("Invalid or Expired Token");
}

// Find user
const user = await User.findOne({ _id: userToken.userId });
user.password = password;
await user.save();
return res.status(200).json({
  message: "Password Reset Successful, Please Login",
});





});


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getUser,
    loginStatus,
    updateUser,
    changePassword,
    forgotPassword,
    resetPassword,
};