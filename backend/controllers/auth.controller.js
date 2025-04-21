import User from "../models/user.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "../emails/emailHandlers.js"
export const signup = async( req, res) => {
   try {
    const {name,username, email, password} = req.body
    if(!name || !username, !email, !password ){
        return res.status(400).json({message: "All fields are required"})
    }


    const existingEmail = await User.findOne({email})
    if(existingEmail) {
        return res.status(400).json({message: "email alreay exists"})
    }
        
    const existingUsername = await User.findOne({username})
    if (existingUsername){
        return res.status(400).json({message: "Username already exists"})
    }

    if (password.length < 6){
        return res.status(400).json({message:" password must be at least 6 characters"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const user = new User({
        name,
        email,
        password: hashPassword,
        username
    })

    await user.save()

    const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET,{expiresIn: "3d"})

    res.cookie("jwt-linkedin", token,{
        httpOnly: true,  // prevent XSS attack
        maxAge: 3 * 24 * 60 * 60 * 1000,
        sameSite:"strict", // prevent CSRF attacks
        secure: process.env.NODE_ENV === "production", // prevents man in the middle attacks. 
    })

    res.status(201).json({message: "User registered successfully"})
    const profileUrl = process.env.CLIENT_URL + "/profile/" + user.username
try {
    await sendWelcomeEmail(user.email, user.name, profileUrl)
} catch (emailError) {
    console.log("Error sending welcome Email", emailError)
}

   } catch (error) {
    console.log("Error in signup:", error.message)
    res.status(500).json({message:" internal server error"})
   }
}
export const login = async( req, res) => {
    try {
        const {username, password} = req.body
        // check if the user exists
        const user = await User.findOne({username})




    } catch (error) {
        
    }
}
export const logout = ( req, res) => {
    res.clearCookie("jwt-token")
    res.json({message: "logged out successfully"})}